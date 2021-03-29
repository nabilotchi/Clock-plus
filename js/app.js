 setInterval(setClock, 1000)

const hour = document.querySelector('[data-hour]')
const minute = document.querySelector('[data-minute]')
const second = document.querySelector('[data-second]')
const clock = document.querySelector('.clock')
const ul = document.querySelector('ul');

 function setClock() {
 const date = new Date()
 const seconds = date.getSeconds() / 60
 const minutes = (seconds + date.getMinutes()) / 60
 const hours = (minutes + date.getHours()) / 12
 setRotation(hour, hours)
 setRotation(minute, minutes)
 setRotation(second, seconds)
 }

 function setRotation(element, rotationRatio) {
     element.style.setProperty('--rotate', rotationRatio * 360)
 }
 setClock()

 //*time
 setInterval(showTime, 1000)
 function showTime(){
     let date = new Date();
     let h    = date.getHours();
     let m = date.getMinutes();
         
     h = (h < 10) ? "0" + h : h;
     m = (m < 10) ? "0" + m : m;

     if(h > 17 || h < 5){
         clock.classList.add('night');
     }
    
     document.getElementById("h").textContent = h;
     document.getElementById("m").textContent = m;

    setTimeout(showTime, 1000);
 }

//*add button

let indexLiUl;
const addBtn = document.querySelector('.add');
const body = document.querySelector('body');
addBtn.addEventListener("click", () => {
    document.getElementById("SID").focus();
    if(indexLiUl >= 2){
        body.classList.add('full');
    }else{
        body.classList.toggle('toggle');
    }
})

//*submit

const submit = document.querySelector('.submit');

submit.addEventListener('click', (e) =>{
    e.preventDefault();
// const
const searchInput = document.querySelector('.search-input');
const inputValue = searchInput.value
const ulClass = document.querySelector('#ul');
let creatLi = document.createElement('li');
// hide search
body.classList.remove('toggle');
document.getElementById("add").focus();
// not empty
if(inputValue != ""){
    ul.appendChild(creatLi);
}
// append in second
const indexLI = [...ul.children].indexOf(creatLi);
if(indexLI >= 3){
    ulClass.appendChild(creatLi);
}
// full
indexLiUl = [...ulClass.children].indexOf(creatLi);

function call() {
    const url = `https://api.ipgeolocation.io/timezone?apiKey=d7d8914c28504c3292c3840ec9e3f90d&location=${inputValue}`
// fetch
const controller = new AbortController();
const { signal } = controller;

fetch(url, { signal })
    .then(response => response.json())
    .then(data => {

      const { date_time_wti, time_24, date, geo, timezone, } = data;
      const country = geo['country'];
      const wti = date_time_wti
      let gmt = wti.slice(26,29);
      gmt = (gmt < 10) ?  gmt.slice(0,1) + gmt.slice(2,3) : gmt;
      let hours = time_24.substr(0,2);
      let minutes = time_24.substr(3,2);

// fetch country

        const urlCount = `https://restcountries.eu/rest/v2/name/${country}`
      
    fetch(urlCount, { signal })
  .then(response => response.json())
  .then(dat => {
      const { } = dat;
      const count1  = dat[0];
      const countryCode = count1['alpha2Code'];
      const city1 = geo['city'];
      const state1 = geo['state'];
      let city = city1;
      let state = state1;
//if
        if(state == ''){
            city = country
           }
        if(city == ''){
            city = state1  
        }
//innerHtml
           const markup = `<div class="location"><span class="city">${city}</span>, <span class="country">${countryCode}</span></div>
            <div class="time-def"><span>${gmt}</span> HRS | GMT</div>
            <div class="landmark"><img src="/img/Landmarks/${countryCode}.png" alt="" srcset=""></div>
            <div class="time" id="Clock" onload="showTime()"><div id="h">${hours}</div><div class="colon">:</div><div id="m">${minutes}</div></div>`;

            creatLi.innerHTML = markup;
    })
    }
)
creatLi.addEventListener('click', ()=>{
    call();
})
 
}
call();
searchInput.value = "";
//cancel fetch
if(indexLiUl >= 3){
    controller.abort();
}
})

 showTime();
