import React from 'react';
import Content from '../Content/Content';
import Counter from '../Counter/Counter';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

import './Stats.css'

function Stats (props){

// Käydään data läpi ja summataan kaikkien samojen aterioiden kalorit yhteen
  const reducer = (groupedData, currentItem) => {
    const index = groupedData.findIndex(item => item.tyyppi === currentItem.tyyppi)
    if (index >= 0) {
      groupedData[index].kalorit = groupedData[index].kalorit + currentItem.kalorit;
    } else {
      groupedData.push({ tyyppi: currentItem.tyyppi, kalorit: currentItem.kalorit})
    }
    return groupedData;
  }

  //
  let groupedData = props.data.reduce(reducer, []);

   //mapataan ja palautetaan labeleiksi tyypit
   //dataset dataan mapataan taulukosta kalorit
  let doughnutData = {
    labels: groupedData.map(item => item.tyyppi),
    datasets: [
      {
        data: groupedData.map(item => item.kalorit),
        backgroundColor: ["#202020","#1a1a00","#330d00","#00004d","#333300"   ]   
      }
    ]
  }

  let doughnutOptions = {
    legend: {
        display: true,
        position: 'left',
        labels: {
            fontColor: 'rgba(0,0,0,0.9)',
        }
    }
}

  // Käydään läpi data joka palauttaa javascript olion
  let linedata = props.data.map( item => ({x: item.paiva, y: item.kalorit}) );

  let data = {
    datasets: [
      {
        label:"kalorit",
        data: linedata,
        fill: true,
        backgroundColor: 'rgba(151, 187, 205, 0.3)',
        borderColor: 'rgba(0,0,0,0.3)',
        pointBackgroundColor: 'rgba(151, 187, 205, 0.5)',
        pointBorderColor: 'white'
      }
    ]
  }

  let options = {
    responsive: true,
    maintainAspectRatio: true,
  
    scales: {
      xAxes: [
          {
          type: 'time',
          time: {
            unit: 'month'
          }
          }      
      ],
      yAxes: [{
        ticks: {
            beginAtZero: true
        }
    }]  
    }
  }

    return (
      <Content>  
        <div className="stats">
          <Counter data={props.data} /> 
          <div className="stats__graph">
            <h2>Statistiikat</h2>
             <div className="stats__line">       
              <Line data={data} options={options}/> 
             </div>
              <div className="stats__doughnutgraph">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
          </div>  
        </div>       
      </Content>   
    );
  }
  
  export default Stats;