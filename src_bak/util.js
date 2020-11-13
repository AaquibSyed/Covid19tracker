//helper function file
import react from 'react';
import { Circle,Popup } from 'react-leaflet';
import { numeral } from 'numeral';

const casesTypeColors={
  cases:{
    hex:'#cc1034',   
    multiplier:800
  },
  recovered:{
    hex:'#7dd71d',    
    multiplier:1200
  },
  deaths:{
    hex:'#fb4443',   
    multiplier:2000
  }
}

export const sortData =(data)=>{
  const sortedData = [...data];
  return sortedData
  .sort((a,b)=>a.cases > b.cases ? -1 : 1)
//   sortedData.sort((a,b)=>{
//       if(a.cases > b.cases){
//           return -1;
//       }else{
//           return 1;
//       }
//   })
//   return sortedData;
}

export const showDataOnMap = (data,caseType="cases")=>(
 data.map(country=>(
   <Circle
    center= {[country.countryInfo.lat,country.countryInfo.long]}
    fillOpacity = {0.4}
    color={casesTypeColors[caseType].hex}
    fillColor={casesTypeColors[caseType].hex}
    radius={
      Math.sqrt(country[caseType])*casesTypeColors[caseType].multiplier
    }
   >
     <popup>
       <h1>i am a popup</h1>
     </popup>
   </Circle>

 ))
)