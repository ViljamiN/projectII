import { postgres } from "../deps.js";

const DATABASE_URL = "---"

if (DATABASE_URL) {
    console.log("DATABASE_URL: " + DATABASE_URL);
}
const sql = postgres(
    DATABASE_URL
);

export { sql };
