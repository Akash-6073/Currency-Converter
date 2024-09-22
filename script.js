const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('.btn');
const fromCurr = document.querySelector('.from select')
const fromTo = document.querySelector('.to select')
const faws = document.querySelector('.faws')

dropdowns.forEach(insrt=>{
    for(x in countryList){
        const newOption = document.createElement('option');
        newOption.innerText = x;
        if(insrt.name=="from" && x==="USD")
            newOption.selected="USD"
        if(insrt.name=="to" && x==="INR")
            newOption.selected="INR"
        insrt.append(newOption);
    }
    console.log(fromCurr.value)
    insrt.addEventListener("change",function(evt){
        updateFlag(evt.target);
    });
    
    
})

function updateFlag(x){
    const currency = x.value;
    const CountryCode = countryList[currency];
    const imgSrc = `https://flagsapi.com/${CountryCode}/flat/64.png`
    document.querySelector('.currency-symbol').innerText = currencySymbols[fromCurr.value]
    x.parentElement.querySelector('img').src=imgSrc

}

btn.addEventListener('click',calcTotal)

function calcTotal(e){
    e.preventDefault();
    const x=document.querySelector("input");
    if(x.value==="" || x.value<0)
        x.value=1
    console.log(x.value);
    console.log(fromCurr.value,fromTo.value)
    const from = (fromCurr.value).toLowerCase()
    const to = (fromTo.value).toLowerCase()
    const url = `${BASE_URL}/${from}.json`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        // const res = data.map((x)=>x.from);
        // console.log(data[from][to])
        // console.log(from,to)
        document.querySelector('.msg').innerText=`${currencySymbols[from.toUpperCase()]}${x.value}  = ${currencySymbols[to.toUpperCase()]}${(x.value*data[from][to]).toFixed(2)} `
    })
    .catch((error)=>document.querySelector('.msg').innerText=`Sorry, Ican't Convert convert from ${from.toUpperCase()} to ${to.toUpperCase()}`
)
}

faws.addEventListener('click',function(e){
    e.preventDefault();
    const tempValue = fromCurr.value;
    fromCurr.value = fromTo.value;
    fromTo.value = tempValue;
    // Update flags
    updateFlag(fromCurr);
    updateFlag(fromTo);
    btn.click();
})

window.onload = ()=>{
    const x=document.querySelector("input");
    if(x.value==="" || x.value<0)
        x.value=1
    const from = (fromCurr.value).toLowerCase()
    const to = (fromTo.value).toLowerCase()
    const url = `${BASE_URL}/${from}.json`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        document.querySelector('.msg').innerText=`${currencySymbols[from.toUpperCase()]}${x.value}  = ${currencySymbols[to.toUpperCase()]}${(x.value*data[from][to]).toFixed(2)} `
    })
    .catch((error)=>document.querySelector('.msg').innerText=`Sorry, Ican't Convert convert from ${from.toUpperCase()} to ${to.toUpperCase()}`
    )
} 