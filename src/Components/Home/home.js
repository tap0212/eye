import React, {useState, useEffect} from 'react'
import Navbar from '../Navbar/navbar'
import { getStock} from '../../APICalls/alphavantage'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';import './home.scss'
import {Grid} from '@material-ui/core'
import moment from 'moment'
import { css } from "@emotion/core";
import {PropagateLoader} from "react-spinners";



//CHARTS
import NFTY  from '../Charts/nfty'
import SYMBOL from '../Charts/symbol'

 const Home = (props) => {
    const override = css`
    display: block;
    margin-left:50%;
   `;


     const [symbol, setSymbol] = useState("")
     const [selectedSymbol, setSelectedSymbol] = useState("")
     const [stockData, setStockData] = useState("")
     const [symbolData, setSymbolData] = useState("")
     const [loading, setLoading] = useState(false)

     const [avg, setAvg] = useState({
		open:0,
		close:0,
		high:0,
		low:0
	})
    useEffect(() => {
            getStock(selectedSymbol)
                .then(res => {
                    setStockData(res)
                })
                .catch(err => console.log(err))
        
    }, [selectedSymbol])

    const handleSearch = (e) => {
        setLoading(true)
        e.preventDefault()
        setSelectedSymbol(symbol)
        getStock(symbol).then(res => {
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
            }
            setAvg({
                open:(avgOpen/array.length).toFixed(2),
                close:(avgClose/array.length).toFixed(2),
                high:(avgHigh/array.length).toFixed(2),
                low:(avgLow/array.length).toFixed(2)
            })
            getData(array)
            setLoading(false)
          }).catch(err => console.log(err))
    }

    const getData = (array) => {
        setSymbolData(array)
    }

    const Flash = () => {
        if(loading){
           return (<PropagateLoader
            css={override}
            size={10}
            color={"blue"}
            loading={props.loading}
        />)
        }
    }

    return (
        <div className="home">
            <Navbar {...props}/>
                <div className="input">
                    <input 
                    type="text"
                    placeholder="Enter Symbol"
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    />
                    <SearchTwoToneIcon id="icon"  onClick={handleSearch} />
                <p>Enter the symbol of the Stock to visualise data</p>   
                    {Flash()}
                    <Grid container spacing={0} >
                        <Grid item xs={12} sm={12} md={6}>
                            <SYMBOL avg={avg} selectedSymbol={selectedSymbol} loading={loading} symbolData={symbolData}/>
                        </Grid> 
                        <Grid item xs={12} sm={12} md={6}>
                            <NFTY />
                        </Grid> 
                    </Grid>   
                    
                       
                                             
            </div>
        </div>
    )
}
export default Home