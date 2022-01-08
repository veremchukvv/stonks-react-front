import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const StockMarket = () => {
    const { REACT_APP_BACKEND_URL} = process.env

    const history = useHistory()

    const back = async () => {
      history.goBack()
    }

    const [stocks, setStocks] = useState<any[]>([])

    const fetchStocks = useCallback(async () => {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/api/v1/stockmarket/`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          })
          const content = await response.json()
      
          setStocks(content)
        }, [REACT_APP_BACKEND_URL])

        useEffect(
            () => {
                fetchStocks()
            }, [fetchStocks]
        )

    return (
        <div>
             <h1 className="h3 mb-3 fw-normal">Here you can choose stocks for your portfolio</h1>    
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Currency</th>
          </tr>
        </thead>    
        <tbody>
          {stocks.map((stocks, index) => {
            return (
              <tr key={stocks.id}>
                <td><Link to={`/stockmarket/${stocks.id}`}>{stocks.name}</Link></td>
                <td>{stocks.ticker}</td>
                <td>{stocks.type}</td>
                <td>{stocks.cost}</td>
                <td>{stocks.currency}</td>
              </tr>
            )
          })}
        </tbody>   
        </table>
        <button className="w-100 btn btn-lg btn-primary" onClick={back}>Back</button>
        </div>
    );
};

export default StockMarket;