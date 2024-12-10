const fs = require('fs');
const path = require('path');

const worksheetDataPath = path.join(__dirname, '../Data/data.worksheet.json');

function getTrainingSheets(req, res) {
  const sheets = JSON.parse(fs.readFileSync(worksheetDataPath, 'utf8'));
  res.json(sheets);
}

module.exports = { getTrainingSheets };