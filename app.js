const express = require('express');
const app = express();
const formulasRouter = require('./routes/formulas');
const plansRouter = require('./routes/plans');

app.use(express.json());


// Mount the routes for formulas and plans
app.use('/formulas', formulasRouter);
app.use('/plans', plansRouter);


const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


module.exports = app;