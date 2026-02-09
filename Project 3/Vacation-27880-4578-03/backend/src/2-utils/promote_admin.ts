import dal from "./dal";

async function promote() {
    try {
        console.log("Promoting testuser1 to admin...");
        const sql = "UPDATE users SET role = 'admin' WHERE username = 'testuser1'";
        const result = await dal.execute(sql);
        console.log("Result:", result);
        console.log("Promoted testuser1 to admin successfully.");
    } catch (err: any) {
        console.error("Error promoting user:", err.message);
    }
    process.exit();
}

promote();
