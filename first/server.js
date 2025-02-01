const express = require('express')
const app = express()
const port = 4000

//import item ki route file

const item = require('./routes/item');
const birds = require('./routes/birds');

//load into application

app.use('/api',item);
app.use('/filler',birds);

app.listen(port, () => {
  console.log(`Faizan app listening on port ${port}`)
})