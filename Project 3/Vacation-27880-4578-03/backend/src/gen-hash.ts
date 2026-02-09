
import helper from "./2-utils/cyber";

async function main() {
    const hash = await helper.hash("1234");
    console.log("HASH:" + hash);
}

main();
