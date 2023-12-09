const formulas = {};
let nextFormulaId = 0;


//add Formula
function addFormula(formula) {
    const formulaId = nextFormulaId;
    nextFormulaId++;
    formulas[formulaId] = formula;
    return formulaId;
}


const getFormulas = () => formulas


const getFormula = (formulaId) => formulas[formulaId]


module.exports = {
    addFormula,
    getFormula,
    getFormulas
}