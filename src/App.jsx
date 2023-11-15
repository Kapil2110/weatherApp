import axios from 'axios'
import {useState } from 'react'
import {WiCelsius, WiCloudy, WiDaySunnyOvercast, WiHumidity, WiRain, WiSnow, WiThermometerExterior} from 'react-icons/wi'
import {BsCloudFog2Fill} from 'react-icons/bs'
import {FiWind} from 'react-icons/fi'

function App() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'Search Now!',
    humidity: 10,
    speed: 2,
    pressure: 36,
    feel: 17.5,
    status: 'clear'
  })
  const [name, setName] = useState("")
  
  //for searching a city info
   const searchEvent = () => {
    if(name !== '') {
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=9948f8edc322fd6040dae1901efcdfbd&units=metric`
          axios.get(apiUrl)
          .then((response) => {
            console.log(response.data)
            setData({...data, 
              celcius: response.data.main.temp,
              name: response.data.name,
              humidity: response.data.main.humidity,
              speed: response.data.wind.speed,
              pressure: response.data.main.pressure,
              feel: response.data.main.feels_like,
              status: response.data.weather[0].main 
            })
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
          Weather App Kapil</h1>

          {/* input div start */}

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
              className='bg-green-700 rounded-xl shadow-xl px-2 text-white p-1 hover:bg-blue-700'
              onClick={searchEvent}
              >Search</button>

            </div>
            {/* input div ends */}


            <div className='flex justify-center mt-3'>
                {(() => {
                  if (data.status == 'Clouds') {
                    return <h1 className='text-white font-bold text-8xl'>< WiCloudy /></h1>
                  }
                  if (data.status == 'Smoke') {
                    return <h1 className='text-white font-bold text-8xl'>< BsCloudFog2Fill /></h1>
                  }
                  if (data.status == 'Clear') {
                    return <h1 className='text-white font-bold text-8xl'>< WiDaySunnyOvercast /></h1>
                  }
                  if (data.status == 'Rain') {
                    return <h1 className='text-white font-bold text-8xl'>< WiRain /></h1>
                  }
                  if (data.status == 'Snow') {
                    return <h1 className='text-white font-bold text-8xl'>< WiSnow /></h1>
                  }
                })()} 
                <p className='text-sm text-white'>{data.status}</p>
            </div>

            {console.log(data.name)}

            <div className='flex justify-center'>
            <h1 className='text- font-bold text-xl border-y-4 border-slate-800'>{data.name}</h1>
            </div>
            

            <div className=' my-1'>
                <div className='px-3'>
                <h3 className='font-bold text-2xl flex '>{data.celcius}
                <p className='text-4xl font-bold'>< WiCelsius /></p></h3>

                <span className='flex float-right mb-4'>feels: {data.feel}
                <p className='text-2xl font-bold'><WiCelsius/></p>
                </span>
                </div> 
                
             </div>

            <div className='grid'>
              <div className='grid-rows-1  flex p-2 font-semibold'><p className='text-3xl mx-1 '><WiThermometerExterior /></p>Pressure:{data.pressure}</div>
              <div className='grid-rows-2 flex p-2 font-semibold'><p className='text-2xl mx-3 '><FiWind /></p>W-speed:{data.speed}</div>
              <div className='grid-rows-1 flex p-2 font-semibold'><p className='text-3xl mx-1 '><WiHumidity /></p>Humidity:{data.humidity}</div>
              
            </div>
            
          </div>
        </div>
        </div>     
    </>
  )
}

export default App
