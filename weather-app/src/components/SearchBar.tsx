// importing dependencies
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, geoApiUrl } from "../APIs";
import { Search, InputValue, ICityData } from "../Types"; 

// SearchBarProps Interface
interface SearchBarProps  {onSearchChange: Function}

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

export default SearchBar;