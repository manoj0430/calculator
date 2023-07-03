
class Calculator{
   constructor(previousOperandTextButton, currentOperandTextButton){

    this.previousOperandTextButton = previousOperandTextButton;
    this.currentOperandTextButton =currentOperandTextButton;
    this.clear();

   }

   // To clear all the content(AC)
   clear(){

    this.currentOperand = '';
    this.previousOperand ='';
    this.operation=undefined;

   }

   // Delete a number (DEL)
   delete(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
   }

   //This will add our selected number to display
   appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')){
            return;
        }
        
        this.currentOperand = (this.currentOperand ? this.currentOperand.toString() : ' ')  + number.toString();
   }

   // Selects operation
   chooseOperation(operation){
        if(this.currentOperand === ''){
            return;
        }
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
   }

   // Compute our operation

   compute(){

    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if(isNaN(prev) || isNaN(current)){
        return;
    }

    switch(this.operation){
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;

        default:
            return;
    }
      
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand =''; 
   }
    

   getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;

    if(isNaN(integerDigits)){
        integerDisplay =''
    }else{
        integerDisplay = integerDigits.toLocaleString('en',{
            maximumFractionDigits : 0
        })
    }

    if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`;
    }else{
        return integerDisplay;
    }
   }
   //This will update the display
   updateDisplay(){

     this.currentOperandTextButton.innerText = this.getDisplayNumber(this.currentOperand);
     if(this.operation != null){
        this.previousOperandTextButton.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
     }else{
        this.previousOperandTextButton.innerText ='';
     }
     
   }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextButton = document.querySelector('[data-previous-operand]');
const currentOperandTextButton = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextButton, currentOperandTextButton);

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
})