// weather class To fetch weather information and update the user interface

export default class WEATHER {

    constructor(location,root){
        this.location = location //It could be a city name or coordinates
        this.weather = {}
        this.root = root
        this.url = this.typeOfUrl(this.location) //Determine the link depending on the type of site provided
        this.fetchWoeid(this.url)
        
       
    }


    // function to determine the link depending on the type of site provided
    typeOfUrl(arg){
            if(arg == null || arg == "" || arg == undefined) return
           
            if(typeof(arg) === 'string'){ // If the name of a city
                return `https://www.metaweather.com/api/location/search/?query=${arg}`
            }else{ //If the coordinates
                return `https://www.metaweather.com/api/location/search/?lattlong=${arg[0]},${arg[1]}`
            }
        
    }

    //Get a list of available cities
    async fetchWoeid(arg){
        
            
            const response = await fetch(`${arg}`, {
                mode: 'no-cors' // 'cors' by default
              })
            const data = await response.json();
           
            this.fetchWeather(data[0].woeid) //Use the first city on the list
      


    }

    //Get weather information for a specific city
    async fetchWeather(arg){
        
            const response = await fetch(`https://www.metaweather.com/api/location/${arg}/`, {
                mode: 'no-cors' // 'cors' by default
              })
            const data = await response.json()
            this.collectData(data) //Pass data to function for processing
       
        
    }


    //function for processing data
    collectData(arg){

        
      
        this.weather.title = arg.title

        this.weather.min_temp = arg.consolidated_weather.map((ar)=>{
            return Math.floor(ar.min_temp)
        })

        this.weather.max_temp = arg.consolidated_weather.map((ar)=>{
            return Math.floor(ar.max_temp)
        })

        this.weather.the_temp = arg.consolidated_weather.map((ar)=>{
            return Math.floor(ar.the_temp)
        })

        this.weather.dates = arg.consolidated_weather.map((ar)=>{
            return new Date(ar.applicable_date).toLocaleDateString('en-US', { weekday:"short" , day:"numeric",month:"short"})
            
        })

        this.weather.humidity = arg.consolidated_weather.map((ar)=>{
            return ar.humidity
        })

        this.weather.air_pressure = arg.consolidated_weather.map((ar)=>{
            return Math.floor(ar.air_pressure)
        })

        this.weather.weather_state_name = arg.consolidated_weather.map((ar)=>{
            return ar.weather_state_name
        })

        this.weather.weather_state_abbr = arg.consolidated_weather.map((ar)=>{
            return ar.weather_state_abbr
        })

        this.weather.wind_direction_compass = arg.consolidated_weather.map((ar)=>{
            return ar.wind_direction_compass
        })

        this.weather.visibility = arg.consolidated_weather.map((ar)=>{
            return ar.visibility.toString().split('',5).join('')
        })

        this.weather.wind_speed = arg.consolidated_weather.map((ar)=>{
            return ar.wind_speed.toString().split('',4).join('')
        })


        this.updateTodayWeather(this.weather)
        this.update5dayWeather(this.weather)

  
    }

    

    updateTodayWeather(ar){

        this.root.today_img.innerHTML=`<img
        src="https://www.metaweather.com/static/img/weather/png/${ar.weather_state_abbr[0]}.png"
        alt=""
      />`

        this.root.today_temp.innerHTML=`${ar.the_temp[0]} <span>℃</span>`

        this.root.today_title.innerHTML=`<svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="20px"
        viewBox="0 0 24 24"
        width="20px"
        fill="#88869D"
      >
        <g><path d="M0,0h24v24H0V0z" fill="none" /></g>
        <g>
          <path
            d="M12,2c-4.2,0-8,3.22-8,8.2c0,3.32,2.67,7.25,8,11.8c5.33-4.55,8-8.48,8-11.8C20,5.22,16.2,2,12,2z M12,12c-1.1,0-2-0.9-2-2 c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C14,11.1,13.1,12,12,12z"
          />
        </g>
      </svg>
       ${ar.title}`

       this.root.today_date.innerHTML=`Today - <span> ${ar.dates[0]} </span>`

       this.root.today_weather.innerHTML=`${ar.weather_state_name[0]}`

       this.root.today_wind.innerHTML=`${ar.wind_speed[0]}<span>mph</span>`

       this.root.today_humidity.innerHTML=`${ar.humidity[0]}<span>%</span>`

       this.root.today_visibility.innerHTML=`${ar.visibility[0]}<span> miles</span>`

       this.root.today_pressure.innerHTML=`${ar.air_pressure[0]}<span> mb</span>`
         

       const windDir ={
           "N": 0,
           "NNE": 22.5,
           "NE": 45,
           "ENE": 67.5,
           "E": 90,
           "ESE": 112.5,
           "SE": 135,
           "SSE": 157.5,
           "S": 180,
           "SSW": 202.5,
           "SW": 225,
           "WSW": 247.5,
           "W": 270,
           "WNW": 292.5,
           "NW": 315,
           "NNW": 337.5
       }

       this.root.arrow.style.setProperty('--rotate', windDir[ar.wind_direction_compass[0]] + "deg");


       this.root.humidity__meter.style.setProperty('--width',ar.humidity[0] + '%' )
        

    }

    update5dayWeather(ar){

        this.root.days.forEach((el,index) => {
            if(index === 0){
                el.innerHTML=`
                <h3>Tomorrow</h3>
            <div class="img"><img src="https://www.metaweather.com/static/img/weather/png/${ar.weather_state_abbr[index+1]}.png" /></div>
            <div class="temp flex">
              <p class="temp__high">${ar.max_temp[index+1]}°C</p>
              <p class="temp__low">${ar.min_temp[index+1]}°C</p>
            </div>
                `
            }else{
                el.innerHTML=`
                <h3>${ar.dates[index+1]}</h3>
            <div class="img"><img src="https://www.metaweather.com/static/img/weather/png/${ar.weather_state_abbr[index+1]}.png" /></div>
            <div class="temp flex">
              <p class="temp__high">${ar.max_temp[index+1]}°C</p>
              <p class="temp__low">${ar.min_temp[index+1]}°C</p>
            </div>
                `
            }
        });
        
    }

}





