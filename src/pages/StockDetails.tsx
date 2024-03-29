import React, { SyntheticEvent, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import NumericInput from 'react-numeric-input';
import { AuthContext } from '../context/authContext';

const StockDetails = () => {
    const { REACT_APP_BACKEND_URL} = process.env

    const history = useHistory()
    const auth = useContext(AuthContext)
    const portfolioId = auth.portfolioID.toString()

    const back = async () => {
        history.goBack()
      }

      const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await fetch(`${REACT_APP_BACKEND_URL}/api/v1/stockmarket/deal`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                stock_id: stockId,
                stock_amount: stocksAmount,
                portfolio_id: parseInt(portfolioId),
            })
        })
        history.goBack()
    }

    const [stocksAmount, setStocksAmount] = useState(0)
    const [stockPrice, setStockPrice] = useState(0)

    const [stock, setStock] = useState(null)
    const stockId = parseInt(useParams<any>().id)
    const fetchStock = useCallback(async () => {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/api/v1/stockmarket/${stockId}`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const content = await response.json()
        setStock(content)
    }, [stockId, REACT_APP_BACKEND_URL]
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