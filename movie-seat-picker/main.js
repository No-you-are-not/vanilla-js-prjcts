let seatsElems = document.querySelectorAll(".seat");
let movieOption = document.getElementById('movies');
let numberOfSeatsContainer = document.getElementById('count-of-seats');
let priceContainer = document.getElementById('price');
let numberOfSeats = document.querySelectorAll('.selected').length;
let checkoutButton = document.getElementById('checkout');


function setLocalStorage() {
    localStorage.setItem('selected', `${selectedSeatsArray}`);
    localStorage.setItem('occupied', `${occupiedSeatsArray}`);
    //localStorage.setItem('finalPrice', `${(numberOfSeats-1)*}`);
    localStorage.setItem('finalCount', `${numberOfSeats-1}`);
}


function drawTheStorage(){
    numberOfSeatsContainer.innerText = localStorage.getItem('finalCount');
    priceContainer.innerText = `$${localStorage.getItem('finalPrice')}`;
    for (let i = 0; i < seatsElems.length; i++){
        let seatsSelected = localStorage.getItem('selected').split(",");
        if (seatsSelected.includes(i+'')){
            seatsElems[i].classList.add('selected');
        }
    }
}


function changeNumberAndPrice(numberOfSeats) {
    let priceFinal = numberOfSeats*movieOption.value;
    numberOfSeatsContainer.innerText = numberOfSeats;
    priceContainer.innerText = `$${priceFinal}`;
}

function seatColorChange(element, index) {
    let numberOfSeats = document.querySelectorAll('.selected').length;
    if (element.classList.contains('occupied')){
        return true;
    }
    else if (element.classList.contains('selected')){
        element.classList.remove('selected');
        changeNumberAndPrice(numberOfSeats-2);
        return true;
    }
    else {
        element.classList.add('selected');
        changeNumberAndPrice(numberOfSeats);
        return true;
    }
}

function checkout() {
    for (let i = 0; i < seatsElems.length; i++){
        if (seatsElems[i].classList.contains('selected')){
            seatsElems[i].classList.remove('selected');
            seatsElems[i].classList.add('occupied');
            changeNumberAndPrice(0);
        }
    }
}



for (let i = 0; i < seatsElems.length; i++){
    seatsElems[i].addEventListener('click',() => {
        seatColorChange(seatsElems[i], i);
    });
}

movieOption.addEventListener('change', () => {
    let numberOfSeats = document.querySelectorAll('.selected').length;
    changeNumberAndPrice(numberOfSeats-1);
    console.log(movieOption.value);
});

checkoutButton.addEventListener('click', () => {
    checkout();
});