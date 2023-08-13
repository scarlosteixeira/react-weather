import { useState, useEffect } from 'react';
import { openWeatherSupportedLanguages } from '../variables/openWeatherSupportedLanguages';

export default function useNavigatorLanguage ():string | undefined{
  const [navigatorLanguage, setNavigatorLanguage] = useState<string|undefined>(undefined)

  function getNavigatorLanguage():string | undefined{
    let language = window.navigator.language.toLowerCase()
    console.log(language);
    const filterdLanguage = openWeatherSupportedLanguages.filter((lang)=>{
      return lang.match(language)
    })
    console.log(filterdLanguage);
    
    
    // switch(language){
    //   case 'pt-BR':
    //     language = 'pt_br'
    //     break
    //   default:
    //     language = filterdLanguage[0]

    // }
    if (!language) return undefined
    return language
  }
  useEffect(()=>{
    setNavigatorLanguage(getNavigatorLanguage())
    console.log(navigatorLanguage);
    
  },[])
  return navigatorLanguage
}