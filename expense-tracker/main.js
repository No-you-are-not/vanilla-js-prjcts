let totalBalance = document.getElementById('total-balance');
let moneyIncome = document.getElementById('income');
let moneyExpense = document.getElementById('expense');
let historyList = document.getElementById('history-list');
let textField = document.getElementById('text');
let amountField = document.getElementById('amount');
let addBtn = document.getElementById('add-btn');

//localStorage.clear();


function getAllStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    return values;
}

function countTheIncomeExpenseBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;
    let balanceTotal = 0;

    let items = getAllStorage();
    for (let i = 0; i < items.length; i++){
        let transaction = items[i].split(",");
        let amount = transaction[1];
        balanceTotal += +amount;
        totalBalance.innerText = '$'+balanceTotal.toFixed(2);
        if (amount > 0){
            incomeTotal += +amount;
            moneyIncome.innerText = '$'+incomeTotal.toFixed(2);
        }
        else {
            expenseTotal += +amount;
            moneyExpense.innerText = '$'+Math.abs(expenseTotal).toFixed(2);
        }
    }
    return [balanceTotal, incomeTotal, expenseTotal];
}

console.log();

function drawTheStorage() {
    let items = Object.values({...localStorage});
    let id = Object.keys({...localStorage});
    countTheIncomeExpenseBalance();
    for (let i = 0; i < items.length; i++){
        let transaction = items[i].split(",");
        addTransaction(id[i], transaction);
    }
}

function getRandomId(){
    let id = new Date().getTime();
    return id+'';
}

function setToLocalStorage(id, text, amount) {
    let transaction = [text, amount];
    localStorage.setItem(id, transaction.toString());
}

function addTransaction(id, [text, amount]){
    let transaction = document.createElement('li');
    transaction.setAttribute('class', 'history-list_elem');
    let historyAmount = document.createElement('span');
    if (+amount > 0){
    historyAmount.setAttribute('class', 'plus');
        historyAmount.innerText = `+${amount}`;
    }
    else if (+amount < 0){
        historyAmount.setAttribute('class', 'minus')
        historyAmount.innerText = amount;
    }
    let removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'remove');
    removeButton.setAttribute('id', `${id}`);
    removeButton.innerText = 'x';
    removeButton.addEventListener('click', (e) => {
        let id = removeButton.id;
        //let transactionDeleted = document.getElementById(`${id}`);
        //transactionDeleted.remove();
        localStorage.removeItem(id);
        document.location.reload();
    });
    transaction.innerText = text;
    transaction.appendChild(historyAmount);
    transaction.appendChild(removeButton);
    historyList.appendChild(transaction);
}

function validation(text, amount){
    if (!text || !amount || amount === 0){
        alert("fill in the input fields with correct information");
        return true;
    }
}

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', (e) => {
    drawTheStorage();
});

addBtn.addEventListener("click", (e) =>{
    if(validation(textField.value, amountField.value)){
        return false;
    }
    let id = getRandomId();
   setToLocalStorage(id, textField.value, amountField.value);
   addTransaction(id, localStorage.getItem(id).split(","));
    countTheIncomeExpenseBalance();
   textField.value = null;
    amountField.value = null;
});


