const fs = require('node:fs');

const DATABASE = './src/database/db.json';

const saveToDatabase = (DB) => {
  fs.writeFileSync(DATABASE, JSON.stringify(DB, null, 2), {
    encoding: 'utf-8',
  });
};

module.exports = { saveToDatabase };
