import axios from 'axios'
import { useEffect, useState } from 'react'
import {WiCelsius, WiCloudy, WiDayRain, WiDaySunnyOvercast, WiHumidity, WiThermometerExterior} from 'react-icons/wi'
import {BsCloudFog2Fill} from 'react-icons/bs'
import {FiWind} from 'react-icons/fi'
import bgimg from './assets/bgimg.jpg'

function App() {
  const [weather, setWeather] = useState([])
  const [name, setName] = useState('Agra')


   const searchEvent = () => {
    if(name !== '') {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=9948f8edc322fd6040dae1901efcdfbd&units=metric`)
      .then((response) => {
        setWeather(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
      setName('')
    }
        
          
   }


  return (
    <>
      <div className=' bg-gradient-to-tl from-sky-800 to-blue-950 h-screen flex justify-center items-center ' >
        <div className='bg-transparent shadow-2xl shadow-slate-900 w-9/12 h-auto 
        md:w-1/2 lg:w-1/4 rounded-2xl border-y-4 border-slate-900'
        >
          <h1 
          className='flex justify-center font-bold text-2xl mt-2 border-x-4 border-slate-800'>
          Weather App</h1>

          <div className='justify-center items-center'>

            <div className='flex justify-center gap-4 mt-5'>

              <input 
              type="search" 
              value={name}
              placeholder='Enter Country Name...' 
              className='rounded-xl px-2 outline-none '
              onChange={(e) => setName(e.target.value)}
              />

              <button 
              className='bg-green-700 rounded-xl shadow-xl px-2 text-white p-1 '
              onClick={searchEvent}
              >Search</button>

            </div>

            <div className='flex justify-center mt-3'>
                {(() => {
                  if (weather.weather[0].main == 'Clouds') {
                    return <h1 className='text-white font-bold text-8xl'>< WiCloudy /></h1>
                  }
                  if (weather.weather[0].main == 'Smoke') {
                    return <h1 className='text-white font-bold text-8xl'>< BsCloudFog2Fill /></h1>
                  }
                  if (weather.weather[0].main == 'Clear') {
                    return <h1 className='text-white font-bold text-8xl'>< WiDaySunnyOvercast /></h1>
                  }
                  if (weather.weather[0].main == 'Rain') {
                    return <h1 className='text-white font-bold text-8xl'>< WiDayRain /></h1>
                  }
                })()} 
                <p className='text-sm text-white'>{weather.weather[0].main}</p>
            </div>

            <div className='flex justify-center'>
            <h1 className='text- font-bold text-xl border-y-4 border-slate-800'>{weather.name}</h1>
            </div>


            <div className=' my-1'>
                <div className='px-3'>
                <h3 className='font-bold text-2xl flex '>{weather.main.temp}
                <p className='text-4xl font-bold'>< WiCelsius /></p></h3>

                <span className='flex float-right mb-4'>feels: {weather.main.feels_like}
                <p className='text-2xl font-bold'><WiCelsius/></p>
                </span>
                </div> 
                
             </div>

            <div className='grid'>
              <div className='grid-rows-1  flex p-2 font-semibold'><p className='text-3xl mx-1 '><WiThermometerExterior /></p>Pressure:{weather.main.pressure}</div>
              <div className='grid-rows-2 flex p-2 font-semibold'><p className='text-2xl mx-3 '><FiWind /></p>W-speed:{weather.wind.speed}</div>
              <div className='grid-rows-1 flex p-2 font-semibold'><p className='text-3xl mx-1 '><WiHumidity /></p>Humidity:{weather.main.humidity}</div>
              
            </div>
            
          </div>
        </div>
        </div>     
    </>
  )
}

export default App
