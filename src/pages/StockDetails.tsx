import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import NumericInput from 'react-numeric-input';

const StockDetails = () => {
    const history = useHistory()

    const back = async () => {
        history.goBack()
      }

      const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await fetch('http://localhost:8000/users/update', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        history.push('/')
    }

    const [stocksAmount, setStocksAmount] = useState(0)
    const [stockPrice, setStockPrice] = useState(0)

    const [stock, setStock] = useState(null)
    const stockId = useParams<any>().id
    const fetchStock = useCallback(async () => {
        const response = await fetch(`http://localhost:8000/api/v1/stockmarket/${stockId}`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const content = await response.json()
        setStock(content)
    }, [stockId]
    )

    useEffect(
        () => {
            fetchStock()
        }, [fetchStock]
    )

    if (stock != null) {
    return (
        <div>
            <h2>Stock Info</h2>
            <p>Company name: {stock['name']}</p>
            <p>Ticker: {stock['ticker']}</p>
            <p>Stock type: {stock['type']}</p>
            <p>Stock description: {stock['description']}</p>
            <p>Stock cost: {stock['cost']}</p>
            <p>Stock currency: {stock['currency']}</p>

            <p className="h3 mb-3 fw-normal">Add to portfolio</p>
            <form onSubmit={submit}>
                <p className="h3 mb-3 fw-normal">Select amount of stocks</p>
                <NumericInput min={0} className="form-control" value={stocksAmount} onChange={(value) => {setStocksAmount(value??0); setStockPrice(((value??0) * stock['cost']))}} />
                <p style={{marginTop: 10}}>Total cost</p>
                <input className="form-control" value={stockPrice + ' ' + stock['currency']} readOnly/>
                <button className="btn btn-primary" type="submit" style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>Make a deal</button>
            </form>

            <button className="btn btn-primary" onClick={back} style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>Back</button>
        </div>
    );}
    else {
        return (
            <div></div>
        )
    }
};

export default StockDetails;