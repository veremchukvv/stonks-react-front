import React, { useCallback, useEffect, useState } from 'react';
import StockList from '../components/StockList';
import BondList from '../components/BondList';
import FundList from '../components/FundList';
import { Link, useParams } from 'react-router-dom';

const PortfolioDetails = () => {
    const [stocks, setStocks] = useState<any[]>([])
    const portfolioId = useParams<any>().id
    const fetchStocks = useCallback(async () => {
        const response = await fetch(`http://localhost:8000/api/v1/portfolio/${portfolioId}`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const content = await response.json()

        setStocks(content)
    }, [portfolioId]
    )

    useEffect(
        () => {
            fetchStocks()
        }, [fetchStocks]
    )
    if (!stocks.length) {
        return (
            <div>
                You don't have stocks yet.
                Please add any
                <Link to="/market" className="btn btn-primary">Go to the market</Link>
                {/* <button className="w-100 btn btn-lg btn-primary" type="submit">Create new Portfolio</button> */}
            </div>
        )
    }
    else {

        return (

            <div>
                <h1>Stocks</h1>
                <StockList />
                <h1>Bonds</h1>
                <BondList />
                <h1>Funds</h1>
                <FundList />
                <Link to="/market" className="btn btn-primary">Go to the market</Link>
            </div>

        );
    }

};


export default PortfolioDetails;