export default function milisecondsToDate (dt:number, location:string | undefined = undefined):string[]{
  const time = new Date((dt*1000)).toLocaleTimeString(location)
  const date = new Date((dt*1000)).toLocaleDateString(location)
  return [date, time]
}
