const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
CREATE TABLE IF NOT EXISTS product_quantity (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_name VARCHAR (75) NOT NULL,
  qty INTEGER NOT NULL,
  CONSTRAINT qty_not_negative CHECK (qty >= 0)
  );
`;

async function main() {
  const client = new Client({
    connectionString: argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();