import React from 'react'
import WeatherCard from './WeatherCard'

class Weather extends React.Component {
    constructor() {
        super();
        this.state = {
            forecast: null,
            loading: true
        }

        this.filterResponse = this.filterResponse.bind(this);
    }

    async filterResponse(res) {
        let { list } = res;
        let filteredResponse = {"forecastList": []};
        let setOfDay = new Set();
        for(let i=0; i<list.length; i++) {
            let date = Number(list[i].dt_txt.split(' ')[0].split('-')[2]);
            if(!setOfDay.has(date)) {
                let forecastDate = new Date(list[i].dt * 1000);
                filteredResponse.forecastList.push({"list": list[i], "date": forecastDate});
                setOfDay.add(date);
            }
        }
        this.setState({forecast: filteredResponse, loading: false});
        return Promise.resolve("Response filtered");
    }

    componentDidMount() {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=mumbai&appid=${API_KEY}&units=metric`;
        fetch(url)
        .then(res => res.json())
        .then(response => this.filterResponse(response))
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }

    // makeDayArray() {
    //     let currentDate = new Date();
    //     let currentDay = currentDate.getDay();
    //     let dayArrays = [currentDay]
    //     for(let i=currentDay + 1; i != currentDay; i = (i + 1)%7)
    //         dayArrays.push(i);
    //     console.log("Day Arrays: ", dayArrays);
    //     return dayArrays;
    // }

    render() {

        return (
            <div className="container my-4 text-center">
                <div className="row">
                    {!this.state.loading && this.state.forecast && this.state.forecast.forecastList.map((e) => {
                        return (<div key = {e.date.getDate()} className="d-flex col-sm justify-content-center my-1">
                            <WeatherCard 
                                day={e.date.getDate()}
                                month = {e.date.getMonth()}
                                year = {e.date.getFullYear()}
                                temperature = {e.list.main.temp}
                                temperatureFeelsLike = {e.list.main.feels_like}
                                weather = {e.list.weather[0].main}
                            />
                        </div>)
                    })}
                </div>
            </div>
        ); 
    }
}

// function Weather(props) {
//   let currentDate = new Date();
//   let currentDay = currentDate.getDay();
//   let dayArrays = [currentDay]
//   for(let i=currentDay + 1; i != currentDay; i = (i + 1)%7)
//     dayArrays.push(i)

//   const [forecast, changeForecast] = useState(null);

//   const callApi = async () => {
//         ``console``.log("Making API call");
//         try {
//             let results = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=mumbai&appid=5e850c73432faeb169bbfed7a0a9fcd6&units=metric");
//             let jsonData = await results.json();
//             changeForecast(jsonData);
//             console.log(forecast); 
//         } catch(err) {
//             console.log(err);
//         }
//     }

//   useEffect(() => {
//     const url = "https://api.openweathermap.org/data/2.5/forecast?q=mumbai&appid=5e850c73432faeb169bbfed7a0a9fcd6&units=metric";
    
//     fetch(url)
//     .then(res => res.json())
//     .then(jsonData => {changeForecast(jsonData); 
//                         console.log(forecast);
//                     })
//     .catch((err) => {console.log(err)});
//   }, []);
  
//   return (
//     <div className="container my-4 text-center">
//         <div className="row">
//             {dayArrays.map((e) => {
//                 return (<div key = {e} className="d-flex col-sm justify-content-center my-1">
//                     <WeatherCard day={e} />
//                 </div>)
//             })}
//         </div>
//     </div>
//   )
// }

// Weather.propTypes = {}

export default Weather
