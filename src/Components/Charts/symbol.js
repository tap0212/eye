import React, {useState, useEffect} from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { css } from "@emotion/core";
import {PropagateLoader} from "react-spinners";
import EmojiObjectsTwoToneIcon from '@material-ui/icons/EmojiObjectsTwoTone';
import {Table} from 'react-bootstrap'

const Chart = (props) => {

    const override = css`
    display: block;
    margin-left:50%;
    margin-top:20%;
   `;

  const [data, setData] = useState(null)
  const [symbol, setSymbol] = useState("")
  
  useEffect(() => {
      setSymbol(props.selectedSymbol)
        setData(props.symbolData)
  }, [props])



  const options= {
    title: {
      text: symbol
    },
    series: [{
      name: `${symbol} (high)`,
      data: data,
      tooltip: {
        valueDecimals: 2
      }
    }]
  }


    return (      
        <div className="symbol">  
              {
                  symbol
                  ?
                  data.length > 1 
                  ?
                  <>
                  <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={options}
                    />
                      <Table style={{marginTop:"5%"}} striped bordered hover size="sm">
                    <thead >
                      <tr>
                        <th>#</th>
                        <th>Aspects</th>
                        <th>{symbol}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Open</td>
                        <td>{props.avg.open}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>High</td>
                        <td>{props.avg.high}</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Low</td>
                        <td>{props.avg.low}</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Close</td>
                        <td>{props.avg.close}</td>
                      </tr>

                    </tbody>
                  </Table>
                </>
                :
                    props.loading ? 
                        <PropagateLoader
                            css={override}
                            size={22}
                            color={"blue"}
                            loading={props.loading}
                        />
                    : 
                     <h5>Please Enter a valid Stock Symbol</h5>

                :
               <div className="current-symbol">
                   <EmojiObjectsTwoToneIcon className="icon-bulb"/>
                   <p>Stock Symbol Chart Will Appear Here.</p>
               </div>               

              }

        </div>
    )
}
export default Chart

