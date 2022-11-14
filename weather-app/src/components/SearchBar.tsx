import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../APIs";


interface ICityData {
  name: string
  countryCode: string
  latitude: number
  longitude: number
}

interface ISearchData{
  value: string
  label: string
}

type InputValue = string | null
type Search = ISearchData | null

const SearchBar = ({ onSearchChange }:any) => {

  const [search, setSearch] = useState<Search>(null);

  const loadOptions = (inputValue:InputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
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
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default SearchBar;