import dal from "./dal";

async function promote() {
    try {
        console.log("Promoting admin_test to admin...");
        const sql = "UPDATE users SET role = 'admin' WHERE username = 'admin_test'";
        const result = await dal.execute(sql);
        console.log("Result:", result);
        console.log("Promoted admin_test to admin successfully.");
    } catch (err: any) {
        console.error("Error promoting user:", err.message);
    }
    process.exit();
}

promote();
