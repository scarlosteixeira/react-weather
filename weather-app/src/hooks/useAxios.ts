import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
//If you are using different URLs, consider removing this line and adding a baseURL in the Axios Config parameter. 

const useAxios = (axiosParams: AxiosRequestConfig, trigger: any) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(axiosParams.method === "GET" || axiosParams.method === "get");

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params);
      console.log(result);      
      setResponse(result);
    } catch(err: any){
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const sendData = () => {
    fetchData(axiosParams);
  }

  useEffect(() => {
    if(axiosParams.method === "GET" || axiosParams.method === "get"){
      fetchData(axiosParams);      
    }
  },[trigger]);

  return { response, error, loading, sendData };
}

export default useAxios;