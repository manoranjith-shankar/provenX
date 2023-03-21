const fs = require('fs');
const qrcode = require('qrcode');
const path = require('path');

// Read CSV file
const transactions = fs.readFileSync('transaction_hashes.csv', 'utf-8').trim().split('\n');

// Create qrCodes directory if it doesn't exist
const qrCodeDirectory = './qrCodes';
if (!fs.existsSync(qrCodeDirectory)) {
  fs.mkdirSync(qrCodeDirectory);
}

// Generate QR code for each transaction
transactions.forEach((transaction, index) => {
  const qrCodeFilePath = path.join(qrCodeDirectory, `transaction_${index}.png`);
  qrcode.toFile(qrCodeFilePath, transaction, {
    errorCorrectionLevel: 'H',
    width: 500,
    margin: 1
  }, (err) => {
    if (err) throw err;
    console.log(`QR code for transaction ${index} generated.`);
  });
});
