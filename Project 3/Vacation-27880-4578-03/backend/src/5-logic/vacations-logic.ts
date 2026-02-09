import { OkPacket } from "mysql2";
import dal from "../2-utils/dal";
import Vacation from "../4-models/Vacation";
import { v4 as uuid } from "uuid";
import path from "path";
import fs from "fs";
import socketIoResource from "../2-utils/socketIoResource";

// Get all vacations for a specific user (showing isFollowing + followers count)
async function getAllVacations(userId: number): Promise<any[]> {
    const sql = `
        SELECT DISTINCT
            V.*,
            EXISTS(SELECT * FROM followers WHERE vacationId = V.id AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount,
            V.imageName
        FROM vacations AS V LEFT JOIN followers AS F
        ON V.id = F.vacationId
        GROUP BY V.id
        ORDER BY isFollowing DESC, V.fromDate
    `;
    const vacations = await dal.execute(sql, [userId]);
    return vacations;
}

// Get vacations report (Followers count per vacation, only those with followers)
async function getVacationsReport(): Promise<any[]> {
    const sql = `
        SELECT V.id as vacationId, V.destination, COUNT(F.userId) as followersCount
        FROM vacations AS V JOIN followers AS F
        ON V.id = F.vacationId
        GROUP BY V.id
        ORDER BY followersCount DESC
    `;
    const vacations = await dal.execute(sql);
    return vacations;
}

// Add vacation
async function addVacation(vacation: Vacation): Promise<Vacation> {
    // Note: Image is saved by Controller/Multer. 
    // Logic receives vacation with 'imageName' already populated if file was uploaded.

    const sql = "INSERT INTO vacations (destination, description, fromDate, toDate, price, imageName) VALUES(?, ?, ?, ?, ?, ?)";
    const result: OkPacket = await dal.execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.fromDate,
        vacation.toDate,
        vacation.price,
        vacation.imageName
    ]);
    vacation.id = result.insertId;

    socketIoResource.emitAddVacation(vacation);
    return vacation;
}

// Update vacation
async function updateVacation(vacation: Vacation): Promise<Vacation> {

    // If a new image was uploaded (imageName is new), delete the old one
    if (vacation.imageName) {
        // We need to know the OLD image name to delete it.
        // But optimization: Controller can handle deletion? Or logic fetches old one.
        // Let's fetch old image name first.
        const sqlImage = "SELECT imageName FROM vacations WHERE id = ?";
        const result = await dal.execute(sqlImage, [vacation.id]);
        const oldImageName = result[0]?.imageName;

        // If specific logic is needed (e.g. don't delete if same name), add here.
        // For now, if imageName is different, delete oldFile.
        if (oldImageName && oldImageName !== vacation.imageName) {
            const oldPath = path.join(__dirname, "..", "..", "..", "upload", oldImageName);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
    } else {
        // If no new image, keep old one. 
        // Logic: Controller should pass existing imageName if not updating? 
        // Or if imageName is undefined, we simply don't update that column?
        // Let's assume strict update: if defined, update.
    }

    const sql = `
        UPDATE vacations SET
            destination = ?,
            description = ?,
            fromDate = ?,
            toDate = ?,
            price = ?,
            imageName = COALESCE(?, imageName) 
        WHERE id = ?
    `;
    // COALESCE: if parameter is null, keep existing value. 
    // Note: If user wants to removed image, this logic prevents it. But requirements say "optional replacement".

    const result: OkPacket = await dal.execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.fromDate,
        vacation.toDate,
        vacation.price,
        vacation.imageName || null,
        vacation.id
    ]);

    if (result.affectedRows === 0) throw { status: 404, message: "Vacation not found" };

    // Fetch updated vacation to emit full object
    // Or just emit what we have.
    socketIoResource.emitUpdateVacation(vacation);

    return vacation;
}

// Delete vacation
async function deleteVacation(id: number): Promise<void> {
    // Get image name to delete file
    const sqlImage = "SELECT imageName FROM vacations WHERE id = ?";
    const result = await dal.execute(sqlImage, [id]);
    const imageName = result[0]?.imageName;

    if (imageName) {
        const absolutePath = path.join(__dirname, "..", "..", "..", "upload", imageName);
        if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
    }

    const sql = "DELETE FROM vacations WHERE id = ?";
    await dal.execute(sql, [id]);

    socketIoResource.emitDeleteVacation(id);
}


export default {
    getAllVacations,
    getVacationsReport,
    addVacation,
    updateVacation,
    deleteVacation
};
