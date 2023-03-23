# Project-2 React Weather App

## Description

This is a React app that consumes the OpenWeather API to get the current weather for a given city. This project was completed as part of General Assembly's Software Engineering Immersive course.

This is a simple weather app that uses the aforementioned API, inbuilt JavaScript Geolocation API to automatically get the latitude and longitude of the users position, as far as the user allow it on browser, and GeoDB Cities API on the search bar that returns city name, country name, latitude and longitude of the searched city.

## Getting Started

The project can be accessed on **[my GitHub profile on React-weater repository;](https://github.com/scarlosteixeira/react-weather)** The application can be accessed on **[Netlify.](https://weather-app-ga-sei-flex-ldn-25.netlify.app)**

This project is open source and can be downloaded, used and modified by anyone, as far as credit is given.

1. Clone the repository using `git clone https://github.com/scarlosteixeira/react-weather.git`
2. Make sure you have the latest version of Node.js installed.
3. Install all dependencies using `npm install`
4. Run the app using `npm run dev`

## Timeframe & Working Team

This project was completed over the course of 1 week as a solo project for the General Assembly Software Engineering Immersive course.

## Technologies Used
**[OpenWeather Current Weather API](https://openweathermap.org/current)** <br>
**[OpenWeather 5 day / 3 hour Forecast API](https://openweathermap.org/forecast5)** <br>
**[GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities)** <br>
**[JavaScript Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)** <br>
**[React](https://reactjs.org/)** <br>
**[React DOM](https://reactjs.org/docs/react-dom.html)** <br>
**[react-select-async-paginate](https://www.npmjs.com/package/react-select-async-paginate)** <br>
**[React-bootstrap](https://react-bootstrap.github.io/)** <br>
**[TypeScript](https://www.typescriptlang.org/)** <br>
**[Bootstrap](https://getbootstrap.com/)** <br>
**[HTML 5](https://developer.mozilla.org/en-US/docs/Web/HTML)** <br>
**[VS Code](https://code.visualstudio.com/docs)** <br>
**[Google Chrome](https://www.google.com/chrome/)** <br>
**[Netlify](https://docs.netlify.com/)** <br>
**[Insomnia](https://support.insomnia.rest/article/23-installation)**

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

During the whiteboard / sign off stage my instructor provided a list of API's that I had to pick one to build my app, using the selected API. I decided to use the **[OpenWeather API](https://openweathermap.org/api)**. I also decided to use the **[GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities)**, because it was the one that I found that had the most information about the cities, and it was the one that I could use to get the latitude and longitude of the searched city. I also decided to use the JavaScript **[Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)**, as it was the one that I found that was easy to use.

Prior to starting any Front-end coding, I focused on the API response and how I could handle it`s data. I used Insomnia to make a request to the API and from the response I chose the appropriate data. From this point I started the Front-end wireframe.
``` JSON
{
	"coord": {
		"lon": -0.1892,
		"lat": 51.4108
	},
	"weather": [
		{
			"id": 804,
			"main": "Clouds",
			"description": "overcast clouds",
			"icon": "04n"
		}
	],
	"base": "stations",
	"main": {
		"temp": 272.88,
		"feels_like": 270.31,
		"temp_min": 272.14,
		"temp_max": 273.92,
		"pressure": 1006,
		"humidity": 96
	},
	"visibility": 1100,
	"wind": {
		"speed": 2.06,
		"deg": 300
	},
	"clouds": {
		"all": 100
	},
	"dt": 1670800190,
	"sys": {
		"type": 2,
		"id": 2035324,
		"country": "GB",
		"sunrise": 1670745347,
		"sunset": 1670773940
	},
	"timezone": 0,
	"id": 3333171,
	"name": "Merton",
	"cod": 200
}
```

I made a simple wireframe of the app, using **[wireframepro from mockflow.](https://wireframepro.mockflow.com/)**. The wireframe was based on the layout of the **[open weather app](https://openweathermap.org/)**, but with some modifications to make it simpler, due to the time constraints. The current weather and forecast weather has been chosen as the starting point for the app.

![Wireframe](./wire-frame.png)
![Current-Weather](./current-weather.png) 
![Forecast-Weather](./forecast.png)


## Build/Code Process

I utilised TypeScript to develop my React app and found it very useful as it helped me catch potential bugs that I could have missed with JavaScript. It was also my first time organising my code into multiple files and folders, which made it easier to manage and read. For the search bar, I used the react-select-async-paginate library and react-bootstrap to create the app's layout.


To fetch data from the OpenWeather API, I implemented the weatherFetch function in the App.tsx file. By doing so, I could pass the fetched data to other components as props and manage the app's state more efficiently. I also used the JavaScript Geolocation API to obtain the user's latitude and longitude with the getLocation function.


I implemented these functions with the useEffect hook, which allowed me to run the getLocation function only once when the app loaded and the weatherFetch function when the location state was updated.


Below is a code snippet of the geoLocation function that invokes the geolocation API if it is supported by the user's browser. The coordinates obtained from this API are then utilised as the city's position (latitude and longitude) in the OpenWeather API query.

```TypeScript

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


  // useEffect to get the location
  React.useEffect(() => {
    getLocation()
  }, [])// only once
```

The SearchBar component implements react-select-async-paginate to allow users to search for cities fetched from the GeoDB Cities API. When a city is selected, its latitude and longitude are passed to the OnSearchChange function, which in turn triggers the weatherFetch function to fetch weather data for the selected city.


To achieve this, some props of the async-paginate component are used to retrieve the city data from the API and handle user input from the search bar:

* The loadOptions prop is called by the `async-paginate` component to fetch data from the GeoDB Cities API and it returns a Promise that resolves to an array of options. Each option is an object that has two properties: value and label. The label property is the text that is displayed in the search bar for the option, and the value property is the data that is associated with the option. In this case, the value property contains the latitude and longitude of the city. When the user selects an option, the onChange function is called with the selected option's value as its argument. The onChange function then calls the handleOnChange function, which sets the search state to the selected option's value.


* The onChange prop calls the handleOnChange function, which monitors the user input for changes.


* The value prop is assigned by a search useState and contains both the label and value of the selected city. The search useState is assigned by the handleOnChange function.


* The debounceTimeout prop sets the time for the user to stop typing before the API is called.


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
The CurrentWeather component is responsible for displaying the current weather data and also handles the conversion of wind speed and direction values.

To make the wind speed more meaningful to the user, it is converted from metres per second to a description based on the  **[Beaufort scale](https://en.wikipedia.org/wiki/Beaufort_scale)**. This conversion takes into account the wind speed, wind description.

In addition, the wind direction is converted from azimuth degrees to a cardinal point abbreviation using the **[Wind rose](https://uni.edu/storm/Wind%20Direction%20slide.pdf)**. These conversions make it easier for users to understand the wind condition and direction.


```TypeScript
// CurrentWeather component
function CurrentWeather ({currentWeatherData}:CurrentWeatherProps) {
  // useState to store the wind condition
  const [windCondition, setWindCondition] = React.useState<string>('wind condition')
  // useState to store the wind direction
  const [windDirection, setWindDirection] = React.useState<string>('wind direction')

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

      // returning the wind direction
      return direction
      } 
  }) 
  // checking if the wind direction is between 350 and 10 degree, North
  if (currentWeatherData?.wind.deg >= 350 || currentWeatherData?.wind.deg <= 10 ){
    // returning the wind direction
    return windDirect[15].direction
  }

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

The ForecastWeather component performs two main tasks in displaying the forecasted weather data for the next six days. Firstly, it formats the data to make it more understandable for the user. Secondly, it displays the forecast data by receiving a prop called forecastWeatherData, which is an object that contains the forecast data returned from the weather API.

To format the data, the component takes the forecastWeatherData.list array, which has the weather data for the next 5 days / 3 hours, and converts it into an array of arrays. Each array represents the weather of a day, and each object inside the array represents the weather of a 3-hour interval.

To achieve this, the component first determines the current day of the week using the Date object and calculates the next 6 days of the week using an array of weekdays. Next, it uses a map function to iterate over the forecastWeatherData.list array and extracts the date of each object. If the date of the current object is the same as the next object, it adds the date to the date array. Otherwise, it increments a count variable and adds the date to the next index of the date array.

Once it has the dates of the next 5 days, the component filters the forecastWeatherData.list array and adds the objects that have the same date as the date array to a new array. This new array is then stored in the weatherData state using the setWeatherData function.


```TypeScript
// weekDays array
const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]
// ForecastWeather component
function ForecastWeather({ forecastWeatherData }: ForecastWeatherProps) {

  // setting the weatherData state
  const [weatherData, setWeatherData] = React.useState<any>(null)
  // getting the current day of the week
  const dayOfWeek = new Date().getDay()

  // getting the next 6 days of the week
  const forecast6Days = weekDays
    .slice(dayOfWeek, weekDays.length)
    .concat(weekDays.slice(0, dayOfWeek))
    .slice(0, 6)

  // function to format the forecast data, it will take the forecastWeatherData.list array, that is a list of 40 objects, with the weather of next 5 days / 3 hours, and turn it into an array of arrays, where each array represents the weather of a day, and each object inside the array represents the weather of a 3 hours interval.
  function formatedForecastData() {
    let count = 0
    let date: Array<string> = []
    let newArray = []
    
    // getting the dates of the next 5 days
    forecastWeatherData?.list?.map(
      (data: { dt_txt: string }, index: number) => {
        
        // if the date of the current object is the same as the next object, then it will be added to the date array, if not, then the count will be increased, and the date will be added to the next index of the array.
        if (
          data?.dt_txt.slice(0, 10) ===
          forecastWeatherData?.list[index + 1]?.dt_txt.slice(0, 10)
        ) {
          date[count] = data.dt_txt.slice(0, 10)
          
        } else {
          count++
        }
      }
    )

    // if the first element of the date array is empty, then it will be removed
    if (!date[0]) {
      date.shift()
    }
    
    // filtering the forecastWeatherData.list array, and adding the objects that have the same date as the date array, to the newArray
    for (let index = 0; index < date.length; index++) {
      const auxday = date[index]
      newArray[index] = forecastWeatherData?.list?.filter(
        (data: { dt_txt: string}) => {
          return data.dt_txt.slice(0, 10) === auxday
        }
      )
      setWeatherData(newArray)
    }
  }

  // useEffect to call the formatedForecastData function when the forecastWeatherData changes
  React.useEffect(() => {
    formatedForecastData()
  }, [forecastWeatherData])
```

The ForecastCard component displays the forecasted weather data for a specific day. It uses the tempMaxMin function to determine the day's minimum and maximum temperatures by iterating through the dataset prop. This prop contains an array of objects that contain temperature data for every 3 hours of the day. The tempMaxMin function extracts the highest and lowest temperatures from the dataset and sets them as useState variables called tempMin and tempMax. Whenever the dataset prop changes, the component calls the tempMaxMin function using the useEffect hook.

```TypeScript
  const [tempMin, setTempMin] = React.useState<number>(0)
  const [tempMax, setTempMax] = React.useState<number>(0)

  // function to get the max and min temperature of the day
  function tempMaxMin() {

    const temps = [] as Array<number>
    // iterating through the dataset array, and pushing the temperature of each object to the temps array
    dataset?.map((data: { main: { temp: number } }) => {
      return temps.push(data.main.temp)
    })
    // sorting the temps array, so the lowest temperature will be in the first index, and the highest temperature will be in the last index
    temps.sort((a, b) => a - b)
    // setting the tempMin and tempMax states
    setTempMin(Math.round(temps[0]))
    setTempMax(Math.round(temps[temps.length - 1]))
  }

  // useEffect to call the tempMaxMin function
  React.useEffect(() => {
    tempMaxMin()
  }, [dataset]) // when the dataset changes. 
```
## Challenges

### Typescript
By far, TypeScript was my biggest challenge during the project. It was introduced just two weeks before the project started, and I only had basic knowledge of it. I spent a lot of time working on the main types of the project and tried to use them as much as possible. However, in some cases, I had to resort to using the "any" type, but I made an effort to avoid it whenever possible. With more practice and time, I am confident that my understanding of the language will naturally improve, leading to better code quality.

Below, you can find some of the interfaces and types that I used in the project.


```TypeScript
export interface ICurrentWeather {
  city: string,
  coord: {lon:number, lat: number},
  weather: [{id: number, main: string, description: string, icon: string }],
  base: string,
  main:{temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, humidity: number, sea_level: number, grnd_level: number},
  visibility: number,
  wind: {speed: number, deg: number, gust:number},
  rain: {["1h"]: number, ["3h"]:number},
  snow: {["1h"]: number, ["3h"]:number},
  clouds: {all:number},
  dt: number,
  sys: {type: number, id: number, country: string, sunrise: number, sunset: number, message: string}
  timezone:number,
  id: number,
  name: string,
  cod: number
}

export interface ICityData {
  name: string
  countryCode: string
  latitude: number
  longitude: number
}

interface IWindCondition{
  speedMin: number,
  speedMax: number,
  description: string
}

interface IWindDirection{
  direction: string,
  degree:Array<number>
}
export type TWindDirection = Array<IWindDirection>
export type TWindCondition = Array<IWindCondition>
export type TCurrentWeather = ICurrentWeather | null | undefined
```
## Wins

To handle the wind condition in my project, I created an array of objects that contained the minimum and maximum wind speeds for each condition, along with a description. After some research, I found the Beaufort scale to be a good fit for my project. I then translated the original scale into TypeScript code and exported it as a constant called ```windSpeed```, which is accessible to all the program files. In this way I can compare the data from the OpenWeather API and translate the speed in m/s into a readable description.

```TypeScript
export const windSpeed: TWindCondition =[
  {speedMin: 0,
    speedMax:0.5,
  description: 'Calm'
  },
  { speedMin:0.6,
    speedMax: 1.5,
    description: 'Light Air'
  },
  { speedMin: 1.6,
    speedMax: 3.3,
    description: 'Light breeze'
  },
  { speedMin:3.4,
    speedMax:5.5,
    description: 'Gentle breeze'
  },
  { speedMin:5.6,
    speedMax:7.9,
    description: 'Moderate breeze'
  },
  { speedMin:8,
    speedMax:10.7,
    description: 'Fresh breeze'
  },
  { speedMin:10.8,
    speedMax:13.8,
    description: 'Strong breeze'
  },
  { speedMin:13.9,
    speedMax:17.1,
    description: 'Near gale'
  },
  { speedMin:17.2,
    speedMax:20.7,
    description: 'Fresh gale'
  },
  { speedMin:20.8,
    speedMax:24.4,
    description: 'Severe gale'
  },
  { speedMin:24.5,
    speedMax:28.4,
    description: 'Storm'
  },
  { speedMin:28.5,
    speedMax:32.6,
    description: 'Violent storm'
  },  
  { speedMin:32.7,
    speedMax:100,
    description: 'Hurricane'
  },
]
```

## Key Learnings/Takeaways
I got a better understanding of code splitting, and how to use it in a React project, as well as dependency importing. NPM packages are a great way to save time and effort, it also pushed me to read the documentation of the packages that I used, and learn how to use them.

React is a great framework, it is easy to use, and it is very flexible. Rendering html elements from the code is a great way to integrate TypeScript code that controls the logic of the app, and the html elements that are rendered.

I made good progress in bootstrap, it still not perfect, but I could implement some responsiveness to the app.

I also made good progress in TypeScript. I still have a lot to learn, but I feel more comfortable using it.

## Bugs
No bugs to report.

## Future Improvements
Implement more responsiveness to the app, and make it more mobile friendly. 

Handle html elements with bootstrap to make screen transitions smoother. 

Implement a layout closer to the original design from the openWeather app.

Implement a .env file to keep the API keys safe.