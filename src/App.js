import { Card, CardContent, FormControl } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';

function App() {

  const [countries, setcountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('worldwide');  
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  // when dependency is empty code wil run once when component loads and not gain after
  useEffect(()=>{
   //async piece of code , that is a request to server ,and then wait for it to obtain data
   const getCountriesData = async()=>{
    await fetch('https://disease.sh/v3/covid-19/countries')
    .then((response)=>response.json())
    .then((data)=>{
      const countriesData = data.map((country)=>({  
           name:country.country, //UnitedStates, United Kingdom
           value:country.countryInfo.iso //UK,USA,FR
        }))            
        const sortedData = sortData(data)
        setTableData(sortedData)
        setcountries(countriesData);
    })}
     getCountriesData()
  },[])     

  //initial fetch for all data 
  useEffect(()=>{
    fetch(`https://disease.sh/v3/covid-19/all`)
    .then(response=>response.json())
    .then(data=>{
      setCountryInfo(data)
    })
  },[])

  const onCountryChange = async(e)=>{
   const selectedCountry = e.target.value;
   setSelectedCountry(selectedCountry)

   //fetch data when country is changed or worldwide is selected
   const url = selectedCountry==='worldwide'?
   `https://disease.sh/v3/covid-19/all`:
   `https://disease.sh/v3/covid-19/countries/${selectedCountry}`
   fetch(url)
   .then(response=>response.json())
   .then(data=>{
    setCountryInfo(data)
   })
  }
  console.log(countryInfo)

  return (
    <div className="app">
      <div className="app__left">       
          <div className="app__header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="app__dropdown">
              <select className='app__select' value={selectedCountry} onChange = {onCountryChange} >
              <option value='worldwide' key='worldwide'>Worldwide</option>          
              {countries.map((country)=>(
                <option value={country.value} key={country.name}>{country.name}</option>
                ))
              }          
              </select>   
            </FormControl> 
          </div>
          <div className="app__stats">
            {/* {infoBoxes cases} */}
            <InfoBox title="Coronavirus Cases" total={1234}></InfoBox>
          
            {/* {infoBoxes recoveries} */}
            <InfoBox title="Recovered"  total={14234} ></InfoBox>
          
            {/* {infoBoxes deaths} */}
            <InfoBox title="Deaths" total={124434}></InfoBox>
          </div>   
          <Map></Map>
      </div>        
        
      <Card className="app__right">        
        <CardContent>
          <h3> Live cases by country</h3>
          <Table countries={tableData}/>
           {/* {TABLE} */}
          <h3>Worldwide new cases</h3>
          <LineGraph></LineGraph>
        </CardContent>    
      </Card>

        {/* {graph} */}


        {/* {map} */}
       

    </div>
  );
}

export default App;
