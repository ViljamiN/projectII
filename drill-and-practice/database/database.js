import { postgres } from "../deps.js";

const DATABASE_URL =
    "postgres://iikppphcwtwzqv:f43b563ab88e1b76b7540b4a60e94d50c5ed0876a9942b3844b62ba539565367@ec2-34-250-252-161.eu-west-1.compute.amazonaws.com:5432/dcs9liuo5t8ru1";

if (DATABASE_URL) {
    console.log("DATABASE_URL: " + DATABASE_URL);
}
const sql = postgres(DATABASE_URL);

export { sql };
