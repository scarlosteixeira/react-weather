// importing dependencies
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, geoApiUrl } from "../APIs";
import { Search, InputValue, ICityData } from "../Types"; 

// SearchBar component
const SearchBar = ({ onSearchChange }:any) => {

  const [search, setSearch] = useState<Search>(null);

  const loadOptions = (inputValue:InputValue) => {
    return fetch(
      `${geoApiUrl}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        
        return {
          options: response.data.map((city:ICityData) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData:Search) => {
    console.log(searchData,'searchData');
    
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate className="mx-auto my-3"
      placeholder="Search for a city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default SearchBar;