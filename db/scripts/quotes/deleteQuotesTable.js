import query from "../../connection.js";

const response = await query(`DROP TABLE IF EXISTS quotes;`);

console.log(`quotes table deleted`, response);

