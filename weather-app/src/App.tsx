import React from 'react'
import SearchBar from './components/SearchBar'
import './App.css'

interface ISearchData{
  value: string
  label: string
}

function App() {
  const handleOnSearchChange = (searchData:ISearchData) => {
    const [lat, lon] = searchData.value.split(" ");}

  return (
    <div className="App">
      <SearchBar
        onSearchChange={handleOnSearchChange}
      />
    </div>
  )
}

export default App
