import React, { useEffect, useState } from 'react'
import {Line} from "react-chartjs-2"
import numeral from 'numeral'

const options= {
    legend:{
        diplay:false
    },
    elements:{
        point:{
            radius:0
        }
    },
    maintainAspectRatio:false,
    tooltip:{
        mode:'hidden',
        intersect:false,
        callbacks:{
            label: function(tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0")
            },
        },
    },
    scales:{
        xAxes:[{
            type:'time',
            time:{
                  format:"MM/DD/YY",
                  tooltipFormat:"ll"
                },
            },
        ],
        yAxes:[{
          gridLines:{
              display:false
          },
          ticks:{
              callback:function(value,index,values){
                  return numeral(value).format("0a");
              }
          }  
        }]
    },

}

function LineGraph() {
    const [data,setData] = useState({});
    //https://disease.sh/v3/covid-19/historical/all?lastdays=120
    
    const buildChartData = (data,caseType='cases')=>{
        const chartData =[];
        let lastDataPoint;    
        //data[caseType].forEach(date=>{
        for(let date in data.cases){ 
            if(lastDataPoint){
                const newDataPoint = {
                    x:date,
                    y:data['cases'][date]-lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data['cases'][date];
        }
        return chartData
    }                
   
  useEffect(()=>{
   fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`)
   .then(response=>response.json())
   .then(data=>{
       console.log(data);
       const chartData = buildChartData(data)
       setData(chartData)
   })
},[])

    return (  
        <div className="linegraph">
            <Line
            options={options}
             data = {{
                datasets:[{
                    data:data,
                    backgroundColor:"rgba(204,16,52,0)",
                    borderColor:"#cc1034"
                }]
             }
           }
                
            />
        </div>
    )
}

export default LineGraph
