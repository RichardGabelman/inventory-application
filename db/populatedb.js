const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255) NOT NULL
);
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  name VARCHAR (255) NOT NULL,
  quantity INTEGER NOT NULL,
  CONSTRAINT quantity_not_negative CHECK (quantity >= 0)
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