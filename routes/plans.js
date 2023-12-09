const express = require('express');
const router = express.Router();
const { getFormula } = require('../model/formulas')
const {addPlan, getPlan, getPlans, deletePlan, appendFormulaToPlan, replaceFormulaInPlan} = require('../model/plans');


// Add a new plan
router.post('/', (req, res) => {
  const { name, formulas } = req.body;

  // Validate that all formula IDs exist
  const invalidFormulaIds = formulas.filter(formulaId => !getFormula(formulaId));
  if (invalidFormulaIds.length > 0) {
    return res.status(400).send({ error: 'Invalid formula IDs in the plan, Add formula first', invalidFormulaIds });
  }
  const plan = {
    name,
    formulas,
  };
  const planId = addPlan(plan);

  res.status(201).send(`/plans/${planId}`);
});


//Get All plans
router.get('/', (req, res) => {
    res.status(200).send(getPlans())
})


//Append formula to a plan
router.post('/:planId/formula',(req, res) =>{
    const planId = req.params.planId;
    let { formulaId } = req.body; // Use 'let' instead of 'const'
    formulaId = formulaId.toString(); 
     
    if (!getPlan(planId)) {
        return res.status(404).json({ error: 'Plan not found' });
    }

    if (!getFormula(formulaId)) {
        return res.status(404).json({ error: 'Formula doesn\'t exist please create the formula before creating the plan' });
    }
    
    const updatedPlan = appendFormulaToPlan(planId, formulaId);
    
    if (updatedPlan) {
        res.status(200).send(updatedPlan);
 
    }
})


// Replace a formula anywhere in the sequence of formulas associated with a plan
router.patch('/:planId/formulas/:formulaId', (req, res) => {
    const planId = req.params.planId;
    const formulaId = req.params.formulaId;
    let { newFormulaId } = req.body;
    newFormulaId = newFormulaId.toString(); // The new formula to replace with

    const plan = getPlan(planId);
    // Check if the plan exists
    if (!plan) {
        return res.status(404).json({ error: 'Plan not found' });
    }

    // Check if the formula to replace exists
    const existingFormulaIndex = plan.formulas.indexOf(formulaId);
    if (existingFormulaIndex === -1) {
        return res.status(404).json({ error: 'Formula not found in the plan' });
    }

    // Check if the new formula exists
    if (!getFormula(newFormulaId)) {
        return res.status(404).json({ error: 'New formula not found, add first' });
    }

    // Replace the formula in the plan's sequence
    const updatedPlan = replaceFormulaInPlan(plan, existingFormulaIndex, newFormulaId);

    res.status(200).send(updatedPlan);
});



// List all formulas in a plan with formula IDs and details
router.get('/:planId/formulas', (req, res) => {
    const planId = req.params.planId;
    const plan = getPlan(planId);
  
    if (!plan) {
      return res.status(404).json({ error: 'Plan not exist' });
    }
  
    const formulaDetails = plan.formulas.map((formulaId) => {
      const formula = getFormula(formulaId);
      return { formulaId, ...formula };
    });
  
    res.status(200).json(formulaDetails);
  });
  

//Delete a Plan
router.delete('/:planId', (req, res) => {
    const planId = req.params.planId;
    if(!getPlan(planId)) {
      res.status(404).json({ error: 'Plan not found' });
    } else {
        deletePlan(planId)
        res.status(204).send()
    }
  });


module.exports = router 