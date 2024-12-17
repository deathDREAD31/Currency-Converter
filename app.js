const convertURL = "https://latest.currency-api.pages.dev/v1/currencies/";
let dropdown = document.querySelectorAll('.dropdown select');
let btn = document.querySelector('.btn');
let fromCurr = document.querySelector('.from select');
let toCurr = document.querySelector('.to select');
let msg = document.querySelector('.msg');

let i = 0;
for(let select of dropdown){
        for(count in countryList){
            let option = document.createElement('option')
            option.value = count;
            option.innerText = count;
            select.append(option);
            if(select.name === "from" && count === "USD"){
                option.selected = true;
            }
            else if(select.name === "to" && count === "BDT"){
                option.selected = true;
            }
        }
        select.addEventListener('change', (evt) => {
            updateFlag(evt.target);
        });
}

let updateFlag = (country) =>{
    let flag = country.value;
    let newsrc = `https://flagsapi.com/${flag}/flat/64.png`;
    let img = country.parentElement.querySelector('img');
    img.src = newsrc; 
}

btn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector('.amount input');
    let amountValue = amount.value;
    if(amountValue === "" || amountValue <= 0){
        amountValue = 1;
    }
    console.log(amountValue);
    let from = fromCurr.value.toLowerCase();
    let to = toCurr.value.toLowerCase();
    let response = await fetch(`${convertURL}${from}.json`);
    let data = await response.json();
    let rate = data[from][to];
    
    let finalAmount = amountValue * rate;
    let finalMsg = `${amountValue} ${from.toUpperCase()} = ${finalAmount} ${to.toUpperCase()}`;
    msg.innerText = finalMsg;
});

