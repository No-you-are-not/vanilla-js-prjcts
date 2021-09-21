let seatsElems = document.querySelectorAll(".seat");
let movieOption = document.getElementById('movies');
let numberOfSeatsContainer = document.getElementById('count-of-seats');
let priceContainer = document.getElementById('price');
let priceFinal = 0;
let numberOfSeats = document.querySelectorAll('.selected').length;
console.log(numberOfSeats);

function changeNumberAndPrice(numberOfSeats) {
    numberOfSeatsContainer.innerText = `${numberOfSeats}`;
    priceFinal = numberOfSeats*findPrice(movieOption.value);
    priceContainer.innerText = `$${priceFinal}`;
}

function findPrice(string) {
    let r = /\d+/;
    return +(string.match(r)[0]);
}

function seatColorChange(element) {
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

for (let i = 0; i < seatsElems.length; i++){
    seatsElems[i].addEventListener('click',() => {
        seatColorChange(seatsElems[i]);
    })
}


movieOption.addEventListener('change', () => {
    let numberOfSeats = document.querySelectorAll('.selected').length;
    changeNumberAndPrice(numberOfSeats-1);
});