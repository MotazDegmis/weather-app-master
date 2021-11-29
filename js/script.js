import WEATHER from "./weather.js";
import city from "./city.js";



let root = {}
let myLocation = []


toggleNav()
getLocation()
getLocationOnload()
getRoot()
addCity()
searchForCity()



function getLocationOnload() {
    
    if (navigator.geolocation) {
       return navigator.geolocation.getCurrentPosition((po)=>{
           myLocation.push(po.coords.latitude)
           myLocation.push(po.coords.longitude) 
           new WEATHER(myLocation,root)
       })
     } else {
       console.log("Geolocation is not supported by this browser.")
     }
    
}

function getLocation() {
    const locationBtn =document.querySelector('.location')
    
    locationBtn.addEventListener('click',()=>{
        
            if (navigator.geolocation) {
                return navigator.geolocation.getCurrentPosition((po)=>{
                    myLocation.push(po.coords.latitude)
                    myLocation.push(po.coords.longitude) 
                    new WEATHER(myLocation,root)
                   
                })
              } else {
                console.log("Geolocation is not supported by this browser.")
              }
              
        
        
       
    })
    
}

function getRoot(){
    root.today_temp = document.querySelector('[data-today_temp]')

    root.today_img = document.querySelector('[data-today_img]')

    root.today_title = document.querySelector('[data-today_title]')

    root.today_weather = document.querySelector('[data-today_weather]')

    root.today_date = document.querySelector('[data-today_date]')
    
    root.today_wind = document.querySelector('[data-today_wind]')

    root.today_humidity = document.querySelector('[data-today_humidity]')

    root.today_visibility = document.querySelector('[data-today_visibility]')

    root.today_pressure = document.querySelector('[data-today_pressure]')

    root.days= document.querySelectorAll('[data-days]')

    root.arrow= document.querySelector('.arrow')

    root.humidity__meter= document.querySelector('.humidity__meter')
    
    

}

function addCity(){

    const listContainer = document.querySelector('[data-country_list]')

    const listCity = document.querySelector('[data-city_list]')

   const countryList = Object.entries(city).map(el=>{
        return el[0]
    })

    countryList.forEach(city=>{
        listContainer.insertAdjacentHTML("beforeend",`<option value="${city}">${city}</option>`)
    })
    listContainer.addEventListener('change',()=>{
        const cityList = city[listContainer.value]


        listCity.innerHTML=""

        cityList.forEach(el=>{
            listCity.insertAdjacentHTML('beforeend',`<li class="${el}">${el}</li>`) 
        })


    })

    listCity.addEventListener('click',ev=>{
       
        new WEATHER(ev.target.classList.value , root)
    })

}

function toggleNav(){
    const searchBtn =document.querySelector('.search-btn')
    const closeBtn =document.querySelector('.close-btn')
    const nav =document.querySelector('.weather__today-searchNav')

    searchBtn.addEventListener('click',()=>{
        nav.classList.add('active')
    })
    closeBtn.addEventListener('click',()=>{
        nav.classList.remove('active')
        document.querySelector('[data-city_list]').innerHTML=""
        document.querySelector('.search__form-input').value = ""
    })
}

function searchForCity(){

    const listCity = document.querySelector('[data-city_list]')

    const citys = Object.entries(city).map(ct=>{
        return ct[1]
    }).flat()

    document.querySelector('.search__form-input').addEventListener('input',(ev)=>{
        const result = citys.filter(ct=>{
            return ct.toLowerCase().includes(ev.target.value.toLowerCase())
        })

        

        listCity.innerHTML=""

        result.forEach(el=>{
            listCity.insertAdjacentHTML('beforeend',`<li class="${el}">${el}</li>`) 
        })

        if(ev.target.value == "" || ev.target.value == null){
            listCity.innerHTML=""
        }
        
    })
    
}