import { postgres } from "../deps.js";

let sql;

if (Deno.env.get("PGUSER")) {
    sql = postgres({
        user: Deno.env.get("PGUSER"),
        password: Deno.env.get("PGPASSWORD"),
        database: Deno.env.get("PGDATABASE"),
        host: Deno.env.get("PGHOST"),
        port: parseInt(Deno.env.get("PGPORT")),
    });
}
else {
    console.log("test");
    sql = postgres({});
}

export { sql };
