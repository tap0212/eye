import React, {useState, useEffect} from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import {getNFTY, getStock} from '../../APICalls/alphavantage'
import moment from 'moment'
import {Table} from 'react-bootstrap'

const Chart = () => {
  const [data, setData] = useState("")
	const [avg, setAvg] = useState({
		open:0,
		close:0,
		high:0,
		low:0
	})
  useEffect(() => {
    getNFTY(getData).then(res => {
      const data = res['Time Series (Daily)']
			let array = []
			let avgOpen = 0;
			let avgHigh = 0;
			let avgLow = 0;
			let avgClose = 0;
      for (let key in data) {
        const date = (moment(key).unix())*1000;
       avgOpen =avgOpen + JSON.parse(data[key]['1. open']);
        const high = JSON.parse(data[key]['2. high']);
       avgHigh =avgHigh +  JSON.parse(data[key]['2. high']);
			 avgLow =avgLow + JSON.parse(data[key]['3. low']);
      avgClose =avgClose + JSON.parse(data[key]['4. close']);
        const volume = JSON.parse(data[key]['5. volume']);        
        const pair = [date, high]
				array.push(pair)
				setAvg({
					open:(avgOpen/array.length).toFixed(2),
					close:(avgClose/array.length).toFixed(2),
					high:(avgHigh/array.length).toFixed(2),
					low:(avgLow/array.length).toFixed(2)
				})
      }

      getData(array)
    
    }).catch(err => console.log(err))
  }, [])

  const getData = (array) => {
    setData(array)
  }

  const options= {
    title: {
      text: 'NIFTY (NFTY)'
    },
    series: [{
      name: 'NFTY (high)',
      data: data,
      tooltip: {
        valueDecimals: 2
      }
    }]
  }


    return (      
        <div>  
              <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={options}
                />
				
        <Table style={{marginTop:"5%"}} striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Aspects</th>
              <th>NIFTY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Open</td>
              <td>{avg.open}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>High</td>
              <td>{avg.high}</td>
            </tr>
						<tr>
              <td>3</td>
              <td>Low</td>
              <td>{avg.low}</td>
            </tr>
						<tr>
              <td>4</td>
              <td>Close</td>
              <td>{avg.close}</td>
            </tr>

          </tbody>
        </Table>
        </div>
    )
}
export default Chart

