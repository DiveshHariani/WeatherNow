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

    render() {

        const isDataReady = !this.state.loading;


        return (
            <div className="container my-4 text-center">
                    
                {
                    isDataReady &&
                    <div className='card'>
                        <div className="card-header">
                            {this.state.forecast.forecastList[0].date.getDate()/this.forecast.forecastList[0].date.getMonth()/this.forecast.forecastList[0].date.getFullYear()}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="/" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                } 

                <div className="row">
                    { isDataReady && this.state.forecast.forecastList.map((e) => {
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
export default Weather
