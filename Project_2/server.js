const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('הכל רץ! ברוך הבא ל־Project_2');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});