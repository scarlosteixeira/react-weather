# Weather App

## Description

React app that consumes the OpenWeather API to get the current weather for a given city. As part of General Assembly's Software Engineering Immersive course.

This is a simple weather app that uses the aforementioned API, inbuilt JavaScript Geolocation API to automaticaly get the latitude and longitude of the users position, as far as the user allow it on browser, and GeoDB Cities API on the search bar that returns city name, country name, latitude and longitude of the searched city.

## Getting Started

The project can be accessed on **[my Git Hub profile on React-weater repository.](https://github.com/scarlosteixeira/react-weather)** <br>
This project is open source and can be downloaded, used and modified by anyone, as far as credit is given.

Solo project, to be completed within 1 week, split as it follows: <br>

1. 1 day of whiteboarding and singing off.
2. 2 days for research, development and coding.
3. 2 days to get a minimum viable project.
4. 1 days for polishing, bug fixing.
5. 1 day to present the completed project.


## Technologies Used
* React
* React DOM
* react-select-async-paginate
* TypeScript
* Bootstrap
* HTML 5
* VS Code
* Google Chrome

## Brief

### Overview

The second project is to **build a React application** that consumes a **public API**.

### Technical Requirements

Your app must:

* **Consume a public API** – this could be anything but it must make sense for your project.
* **Include wireframes** - that you designed before building the app.
* Have **semantically clean HTML** - you make sure you write HTML that makes structural sense rather than thinking about how it might look, which is the job of CSS.
* **Be deployed online** and accessible to the public.

## Planning

I started by choosing the API that I wanted to use. I decided to use the **[OpenWeather API](https://openweathermap.org/api)**, from a list of public API`s provided by my instructor. I also decided to use the **[GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities)**, because it was the one that I found that had the most information about the cities, and it was the one that I could use to get the latitude and longitude of the searched city. I also decided to use the JavaScript **[Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)**, as it was the one that I found that was easy to use. 

I made a simple wireframe of the app, using **[wireframepro from mockflow.](https://wireframepro.mockflow.com/)**. The wireframe was based on the layout of the **[open weather app](https://openweathermap.org/)**, but with some modifications to make it simpler, due to the time constraints. The current weather and forecast weather has been choosen as starting point for the app.

![Wireframe](../../wire-frame.png)
![Current-Weather](../../current-weather.png) 
![Forecast-Weather](../../forecast.png)

## Technical Reference

**[OpenWeather Current Weather API](https://openweathermap.org/current)** <br>
**[OpenWeather 5 day / 3 hour Forecast API](https://openweathermap.org/forecast5)** <br>
**[GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities)** <br>
**[JavaScript Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)** <br>
**[React](https://reactjs.org/)** <br>
**[React DOM](https://reactjs.org/docs/react-dom.html)** <br>
**[react-select-async-paginate](https://www.npmjs.com/package/react-select-async-paginate)** <br>
**[react-bootstrap](https://react-bootstrap.github.io/)** <br>
**[TypeScript](https://www.typescriptlang.org/)** <br>
**[Bootstrap](https://getbootstrap.com/)** <br>
**[HTML 5](https://developer.mozilla.org/en-US/docs/Web/HTML)** <br>
**[VS Code](https://code.visualstudio.com/docs)** <br>
**[Google Chrome](https://www.google.com/chrome/)** <br>

## Build/Code Process

I used React TypeScrip to build the app. It was the first time, in a porject, that I used TypeScript, and I found it very useful, as it helped me to avoid some bugs that I would have had if I had used JavaScript. That was also the first time that I splited my code into multiple files and folders, and I found it very useful, as it helped me to keep my code organised and easy to read. I also used the **[react-select-async-paginate](https://www.npmjs.com/package/react-select-async-paginate)**, to create the search bar, and the **[react-bootstrap](https://react-bootstrap.github.io/)**, to create the layout of the app.

I fetched the data from the OpenWeather API, weatherFetch function, on App.tsx, in this way I could pass the data to the other components as props and manage the state of the app easier. I also used the JavaScript Geolocation API to get the latitude and longitude, getLocation function, in the same way.

To run these functions I used the useEffect hook, in this way I could run the getLocation function only once, when the app was loaded,
and the weatherFetch function, when the location state was updated.

```TypeScript

    // useState to store the current weather data
  const [currentWeather, setCurrentWeather] =
    React.useState<TCurrentWeather>(null)

  // useState to store the forecast weather data
  const [forecastWeather, setForecastWeather] =
    React.useState<TForecastWeather>(null)

  // useState to store the location
  const [location, setLocation] = React.useState<TLocation>(undefined)

    function getLocation() {
    // if the browser supports the geolocation
    if (navigator.geolocation) {
      // get the current position
      return navigator.geolocation.getCurrentPosition(position => {
        // setting the latitude and longitude to the state 
        const latLon = {
          lat: position.coords.latitude.toFixed(4),
          lon: position.coords.longitude.toFixed(4)
        }
        // setting the location to the state
        setLocation(latLon)
      })
    }
  }

    // function to fetch the weather data
  async function weatherFetch(location: TLocation) {
    // fetching the current weather data
    const response = await fetch(
      `${weatherApiUrl}/weather?lat=${location?.lat}&lon=${location?.lon}&appid=${weatherApiKey}&units=metric`
    )
    // fetching the forecast weather data
    const response2 = await fetch(
      `${weatherApiUrl}/forecast?lat=${location?.lat}&lon=${location?.lon}&appid=${weatherApiKey}&units=metric`
    )
    // converting the response to json
    const currentWeatherData = await response.json()
    const forecastWeatherData = await response2.json()
    // console.log(currentWeatherData);
    // console.log(forecastWeatherData);
    // setting the current weather data to the state
    setCurrentWeather({ ...currentWeatherData })
    // setting the forecast weather data to the state
    setForecastWeather({ ...forecastWeatherData })
  }

  // useEffect to get the location
  React.useEffect(() => {
    getLocation()
  }, [])// only once

  // useEffect to fetch the weather data
  React.useEffect(() => {
    // if the location is not undefined
    if (location) {
      // call the weatherFetch function
      weatherFetch(location)
    }
  }, [location])// if the location changes
```

The SearchBar component, uses the react-select-async-paginate. The search bar is used to searching for a city fetched from the GeoDB Cities API, and when a city is selected, the latitude and longitude of the city is passed to the OnSearchChange function, and the weatherFetch function is called, to fetch the weather data of the selected city.

I used some props of the async-paginate component, to get the data from the API as options and to handle user input from search bar.

* The **loadOptions** will call the API and return an object with two keys: value and label. The label has the name of the city and the country code, this label will be displayed in the search bar. The value has the latitude and longitude of the city, this value will be passed throug the handleOnChange function and assigned to the onSearchChange prop, that is a function for fetching data from OpenWeather API.

* The **onChange** will call the handleOnChange function, this function has been explained above. onChange, basically, monitors the user input for changes.

* The **value** will be assigned by the search useState, it contains both label and value of the selected city. The search useState is assigned by the handleOnChange function.

* The **debounceTimeout** will set the time for the user to stop typing before the API is called.

```TypeScript

// SearchBar component
const SearchBar = ({ onSearchChange }:SearchBarProps ) => {
  // setting the search state
  const [search, setSearch] = useState<Search>(null)

  // function to load the options "loadOptions generates the options from the API"
  const loadOptions = async (inputValue:InputValue) => {
    // fetching the data from the GeoDB Cities Api
    const response = await fetch(
      `${geoApiUrl}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const resp = await response.json();
    // console.log(resp)
    return {
      options: resp.data.map((city: ICityData) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

   // function to handle data entered in the search bar
  const handleOnChange = (searchData:Search) => {
    // console.log(searchData,'searchData')
    
    setSearch(searchData)
    onSearchChange(searchData)
  }

  return (
    <AsyncPaginate className="mx-auto my-3"
      placeholder="Search for a city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  )
}
```

The CurrentWeather component, is responsible for displaying the current weather data. It also handles the conversion of the wind speed and direction, from a numeric value, meaningless to the user to a string , which is easy to understand. 

* The wind speed is converted from m/s to a description, this conversion is based on the **[Beaufort scale](https://en.wikipedia.org/wiki/Beaufort_scale)**. That correlates the wind speed, wind description, wave height, sea condition and land condition.

* The wind direction is converted from azimuth degrees to a cardinal point abbreviation, this conversion is based on the **[Wind rose](https://uni.edu/storm/Wind%20Direction%20slide.pdf)**. 

```TypeScript
// CurrentWeather component
function CurrentWeather ({currentWeatherData}:CurrentWeatherProps) {
  // useState to store the wind condition
  const [windCondition, setWindCondition] = React.useState<string>('wind condition')
  // useState to store the wind direction
  const [windDirection, setWindDirection] = React.useState<string>('wind direction')
// console.log(currentWeatherData);

// function to get the wind condition
function windConditionFunc () {
  // filtering the wind speed from the windSpeed array
  const filteredwindSpeed = windSpeed.filter((condition)=>{
    // checking if the current wind speed is between the min and max speed
    if(currentWeatherData?.wind.speed >= condition.speedMin && currentWeatherData?.wind.speed <= condition.speedMax ) {
    return condition
    }
  })
  // returning the wind condition description
  return filteredwindSpeed.map((data)=>{
    return data.description
  })
}

// function to get the wind direction
function windDirectionFunc () {
  // filtering the wind direction from the windDirect array
  let filteredWindDirection = windDirect.filter((direction)=>{
    // checking if the current wind direction is between the min and max degree
    if(currentWeatherData?.wind.deg >= direction.degree[0] && currentWeatherData?.wind.deg <= direction.degree[1] ) {
      // console.log(currentWeatherData.wind.deg)
      // console.log(direction.degree[0])
      // console.log(direction.degree[1])

      // returning the wind direction
      return direction
      } 
  }) 
  // checking if the wind direction is between 350 and 10 degree, North
  if (currentWeatherData?.wind.deg >= 350 || currentWeatherData?.wind.deg <= 10 ){
    // returning the wind direction
    return windDirect[15].direction
  }
    // console.log(filteredWindDirection)

  // returning the wind direction
  return filteredWindDirection.map((data)=>{
    return data.direction
  })
}

// useEffect to set the wind condition and wind direction
React.useEffect(()=>{
  // calling the wind condition function and storing the result in windDescription variable
  const windDescription = windConditionFunc()
  // calling the wind direction function and storing the result in windDirection variable
  const windDirection = windDirectionFunc()
  // setting the wind condition
  setWindCondition(windDescription[0])
  // setting the wind direction
  setWindDirection(windDirection[0])
},[currentWeatherData]) // update the wind condition and wind direction when the currentWeatherData changes
```




## Challenges

## Wins

## Key Learnings/Takeaways

## Bugs

## Future Improvements