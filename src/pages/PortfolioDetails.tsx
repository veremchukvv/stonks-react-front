import React, { useCallback, useEffect, useState } from 'react';
// import StockList from '../components/StockList';
// import BondList from '../components/BondList';
// import FundList from '../components/FundList';
import { Link, useHistory, useParams } from 'react-router-dom';

const PortfolioDetails = () => {

    const history = useHistory()

    const deletePortfolio = async () => {
        await fetch(`http://localhost:8000/api/v1/portfolio/${portfolioId}`, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            })
            history.push('/')
        }

    const [stocks, setStocks] = useState<any[]>([])
    const [portftolio, setPortfolio] = useState<any[]>([])
    const portfolioId = useParams<any>().id
    const fetchStocks = useCallback(async () => {
        const response = await fetch(`http://localhost:8000/api/v1/portfolio/${portfolioId}`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const content = await response.json()

        setStocks(content["StocksResp"])
        setPortfolio(content["PortfolioResp"])
    }, [portfolioId]
    )

    useEffect(
        () => {
            fetchStocks()
        }, [fetchStocks]
    )
    // if (!stocks.length || stocks === null) {
        if (stocks === null || !stocks.length ) {
        return (
            <div>
                You don't have stocks yet.
                Please add any
                <Link to="/market" className="btn btn-primary">Go to the market</Link>
            </div>
        )
    }
    else {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Ticker</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Cost</th>
                            <th>Amount</th>
                            <th>Total Cost</th>
                            <th>Currency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock, index) => {
                            return (
                                <tr key={stock.id}>
                                    <td>{index + 1}</td>
                                    <td>{stock.ticker}</td>
                                    <td>{stock.name}</td>
                                    <td>{stock.type}</td>
                                    <td>{stock.cost}</td>
                                    <td>{stock.amount}</td>
                                    <td>{stock.value}</td>
                                    <td>{stock.currency}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* <h1>Stocks</h1>
                    <StockList />
                    <h1>Bonds</h1>
                    <BondList />
                    <h1>Funds</h1>
                    <FundList /> */}
                <div style={{display: 'flex', justifyContent: 'center', padding: '0 2rem'}}>
                    <Link to="/" className="btn btn-primary" style={{ marginRight: 10 }}>Back</Link>
                    <Link to="/market" className="btn btn-primary" style={{ marginRight: 10 }}>Market</Link>
                    <Link to="/" className="btn btn-danger" style={{ marginRight: 10 }} onClick={deletePortfolio}>Delete</Link>
                </div>
            </div>

        );
    }

};


export default PortfolioDetails;