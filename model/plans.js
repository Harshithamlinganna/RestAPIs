const plans = {};
let nextPlanId = 0;


//Add a Plan
function addPlan(plan) {
    const planId = nextPlanId;
    nextPlanId++;
    plans[planId] = plan;
    return planId;
}


//Append formula to plan
function appendFormulaToPlan(planId, formulaId) {
    const plan = plans[planId];
    plan.formulas.push(formulaId);
    return plan; 
}


//Get plans for a formula
function getPlansContainingFormula(formulaId) {
    const plansContainingFormula = [];
  
    for (const planId in plans) {
      const plan = plans[planId];
  
      if (plan.formulas.includes(formulaId)) {
        plansContainingFormula.push(plan.name);
      }
    }
  
    return plansContainingFormula;
}


//Replace a formula in a plan's sequence
function replaceFormulaInPlan(plan, formulaIndex, newFormulaId) {
    plan.formulas[formulaIndex] = newFormulaId;
    return plan;
}


const getPlan = (planId) => plans[planId];


const getPlans = () => plans


const deletePlan = (planId) => delete plans[planId];


module.exports = {
    addPlan,
    getPlan,
    getPlans,
    deletePlan,
    appendFormulaToPlan,
    getPlansContainingFormula, 
    replaceFormulaInPlan
  };