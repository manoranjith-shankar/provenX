const fs = require('fs');
const qrcode = require('qrcode');

// Read CSV file
const transactions = fs.readFileSync('transaction_hashes.csv', 'utf-8').trim().split('\n');

// Generate QR code for each transaction
transactions.forEach((transaction, index) => {
  qrcode.toFile(`transaction_${index}.png`, transaction, {
    errorCorrectionLevel: 'H',
    width: 500,
    margin: 1
  }, (err) => {
    if (err) throw err;
    console.log(`QR code for transaction ${index} generated.`);
  });
});
