import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const StockMarket = () => {
    const history = useHistory()

    const back = async () => {
      history.goBack()
    }

    const [stocks, setStocks] = useState<any[]>([])

    const fetchStocks = useCallback(async () => {
        const response = await fetch('http://localhost:8000/api/v1/stockmarket/', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          })
          const content = await response.json()
      
          setStocks(content)
        }, [])

        useEffect(
            () => {
                fetchStocks()
            }, [fetchStocks]
        )

        console.log(stocks)
    return (
        <div>
             <h1 className="h3 mb-3 fw-normal">Here you can choose stocks for your portfolio</h1>    
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Name</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Currency</th>
          </tr>
        </thead>    
        <tbody>
          {stocks.map((stocks, index) => {
            return (
              <tr key={stocks.id}>
                <td>{stocks.name}</td>
                <td>{stocks.ticker}</td>
                <td>{stocks.type}</td>
                <td>{stocks.cost}</td>
                <td>{stocks.currency}</td>
              </tr>
            )
          })}
        </tbody>   
        </table>
        {/* <Link to="/" className="btn btn-primary" style={{ marginRight: 10 }} onClick={back}>Back</Link> */}
        <button className="w-100 btn btn-lg btn-primary" onClick={back}>Back</button>
        </div>
    );
};

export default StockMarket;