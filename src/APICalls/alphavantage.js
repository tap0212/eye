const APIKEY = "QF9TY4CF1H10EHT3"
export const getNFTY = () => {
    return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NFTY&apikey=${APIKEY}
    `, {
        method:"GET"
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}

export const getStock = (symbol) => {
    return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${APIKEY}`, {
        method:"GET"
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}