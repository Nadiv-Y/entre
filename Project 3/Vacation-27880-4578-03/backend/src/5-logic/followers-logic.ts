import dal from "../2-utils/dal";

async function follow(userId: number, vacationId: number): Promise<void> {
    const sql = "INSERT INTO followers VALUES(?, ?)";
    await dal.execute(sql, [userId, vacationId]);
}

async function unfollow(userId: number, vacationId: number): Promise<void> {
    const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
    await dal.execute(sql, [userId, vacationId]);
}

export default {
    follow,
    unfollow
};
