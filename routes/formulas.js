const express = require('express')
const router = express.Router()
const { addFormula, getFormula, getFormulas} = require('../model/formulas')
const { getPlansContainingFormula } = require('../model/plans')


//Add a new formula
router.post('/', (req, res) => {  
    const formulaId = addFormula(req.body)
    res.status(201)
    res.send(`/formulas/${formulaId}`)
})


// List all formulas
router.get('/', (req, res) => {
    res.status(200).send(getFormulas())
})


//See the inputs and outputs of a specific formula.
router.get('/:formulaId', (req, res)=>{
    const formulaId = req.params.formulaId;
    
    const formula = getFormula(formulaId)
    if (!formula) {
        res.status(404).send({ error: 'Formula not found' });
      } else {
        res.status(200).send(formula);
      }
});


// List which plans contain a specific formula.
router.get('/:formulaId/plans', (req, res) => {
    const formulaId = req.params.formulaId;
  
    const formula = getFormula(formulaId);
    if (!formula) {
      return res.status(404).json({ error: 'Formula not found' });
    }

    res.send(getPlansContainingFormula(formulaId))
    
});


module.exports = router
