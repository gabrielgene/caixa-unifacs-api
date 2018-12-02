const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose
  .connect(
    'mongodb://caixa:caixa123@ds123664.mlab.com:23664/caixa',
    { useNewUrlParser: true },
  )
  .then(() => console.log('Mongodb connected'), err => console.log(err));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', require('./routes'));

app.listen(process.env.PORT || 8080, () => console.log('Running on port 8080'));
