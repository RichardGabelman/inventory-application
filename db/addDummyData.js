const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
INSERT INTO categories (name) VALUES 
('Technology'),
('Clothing'),
('Groceries'),
('Appliances');
INSERT INTO items (name, category_id, quantity) VALUES 
('iPhone 12', 1, 10),
('Google Pixel 3', 1, 8),
('PS5', 1, 4),
('Uniqlo T-Shirt', 2, 12),
('Uniqlo Crewneck', 2, 9),
('Nike Air Jordans', 2, 2),
('Bananas', 3, 40),
('Oranges', 3, 22),
('Apples', 3, 53),
('Washing Machine', 4, 4),
('Dryer', 4, 6),
('Air Fryer', 4, 12);
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
