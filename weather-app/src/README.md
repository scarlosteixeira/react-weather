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



## Challenges

## Wins

## Key Learnings/Takeaways

## Bugs

## Future Improvements