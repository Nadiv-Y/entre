import cyber from "./src/utils/cyber";
import { execute } from "./src/dal/dal";

async function fixData() {
    try {
        console.log("Fixing Admin Password...");
        const password = "1234";
        const hash = cyber.hashPassword(password);

        const sql = "UPDATE users SET password = ? WHERE email = 'admin@test.com'";
        await execute(sql, [hash]);

        console.log("Admin password updated successfully.");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fixData();
