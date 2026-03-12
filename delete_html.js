const fs = require('fs');
const files = fs.readdirSync('.');
files.forEach(file => {
  if (file.endsWith('.html')) {
    fs.unlinkSync(file);
    console.log('Deleted:', file);
  }
});
