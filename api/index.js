const express = require('express');
const cors = require('cors');
const app = express()
const port = 5000;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus:200
}));
app.get('/test', (req, res) => {
    res.send('hello world')
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });