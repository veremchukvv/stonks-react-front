import React, { useCallback, useContext, useEffect, useState } from 'react';
// import StockList from '../components/StockList';
// import BondList from '../components/BondList';
// import FundList from '../components/FundList';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import * as _ from "lodash";
import { format } from "date-fns";

const PortfolioDetails = () => {
    const { REACT_APP_BACKEND_URL} = process.env
    
    const auth = useContext(AuthContext)
    const history = useHistory()
    const [toggle, setToggle] = useState(false)

    const handleClick = () => {
        setToggle(toggle => !toggle);
    };

    const deletePortfolio = async () => {
        await fetch(`${REACT_APP_BACKEND_URL}/api/v1/portfolios/${portfolioId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        history.push('/')
    }

    const [deals, setDeals] = useState<any[]>([])
    const [stocks, setStocks] = useState<any[]>([])
    const [closedDeals, setClosedDeals] = useState<any[]>([])
    // const [portftolio, setPortfolio] = useState<any[]>([])
    const portfolioId = useParams<any>().id
    auth.portfolioID = portfolioId
    const fetchStocks = useCallback(async () => {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/api/v1/portfolios/${portfolioId}`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const content = await response.json()

        setDeals(content["DealResp"])
        // setPortfolio(content["PortfolioResp"])

    }, [portfolioId]
    )

    const fetchClosedDeals = useCallback(async () => {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/api/v1/portfolios/closed/${portfolioId}`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const content = await response.json()

        setClosedDeals(content)
        // setPortfolio(content["PortfolioResp"])

    }, [portfolioId]
    )

    useEffect(
        () => {
            fetchStocks()
        }, [fetchStocks]
    )

    useEffect(
        () => {
            fetchClosedDeals()
        }, [fetchClosedDeals]
    )

    useEffect(
        () => {
            let grouped = _.groupBy(deals, 'ticker')
            let tickers = _.uniqBy(deals, 'ticker')

            let stocksInfo = tickers.map(({ value, amount, ...item }) => item);

            let values = _.map(grouped, (objs: any, key: any) => ({
                'ticker': key,
                'value': _.sumBy(objs, 'value')
            }))

            let amounts = _.map(grouped, (objs: any, key: any) => ({
                'ticker': key,
                'amount': _.sumBy(objs, 'amount')
            }))

            let res = _.merge(stocksInfo, values, amounts)
            setStocks(res)
        }, [deals]
    )

    if (deals === null || !deals.length) {
        return (
            <div>
                You don't have stocks yet.
                Please add any
                <Link to="/stockmarket" className="btn btn-primary">Go to the market</Link>
            </div>
        )
    }
    else {
        if (toggle === true) {
            return (
                <div>
                    <h2>aggregated opened deals view</h2>
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
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '0 2rem' }}>
                        <Link to="/" className="btn btn-primary" style={{ marginRight: 10 }}>Back</Link>
                        <Link to="/stockmarket" className="btn btn-primary" style={{ marginRight: 10 }}>Market</Link>
                        <Link to="/" className="btn btn-danger" style={{ marginRight: 10 }} onClick={deletePortfolio}>Delete</Link>
                    </div>
                    <button onClick={handleClick} className="btn btn-primary" style={{ display: 'flex', justifyContent: 'center', padding: '0 2rem', marginLeft: 35, marginTop: 5 }}>Toggle display mode</button>
                </div>)
        } else {
            return (
                <div>
                    <h2>detailed opened deals view</h2>
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
                                <th>deal time</th>
                                <th>profit (money)</th>
                                <th>profit (percent)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deals.map((deal, index) => {
                                return (
                                    // <tr key={deal.id} className={deal.is_closed ? "strikeout" : ""} >
                                        <tr key={deal.id}>
                                        <td><Link to={`/deals/${deal.id}`}>{index + 1}</Link></td>
                                        <td>{deal.ticker}</td>
                                        <td>{deal.name}</td>
                                        <td>{deal.type}</td>
                                        <td>{deal.cost}</td>
                                        <td>{deal.amount}</td>
                                        <td>{deal.value}</td>
                                        <td>{deal.currency}</td>
                                        <td>{format(new Date(deal.opened_at), 'dd-MM-yyyy/kk:mm')}</td>
                                        <td className={deal.profit > 0 ? "profit" : "loss" }>{deal.profit !== 0 ? deal.profit : "" }</td>
                                        <td className={deal.percent > 0 ? "profit" : "loss" }>{deal.percent !== 0 ? deal.percent: "" }</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <h2>Detailed closed deals view</h2>
                    {closedDeals !== null &&
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Ticker</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Sell cost</th>
                                <th>Amount</th>
                                <th>Value</th>
                                <th>Currency</th>
                                <th>Close time</th>
                                <th>profit (money)</th>
                                <th>profit (percent)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {closedDeals.map((closedDeal, index) => {
                                return (
                                    // <tr key={deal.id} className={deal.is_closed ? "strikeout" : ""} >
                                        <tr key={closedDeal.id}>
                                        <td><Link to={`/deals/closed/${closedDeal.id}`}>{index + 1}</Link></td>
                                        <td>{closedDeal.ticker}</td>
                                        <td>{closedDeal.name}</td>
                                        <td>{closedDeal.type}</td>
                                        <td>{closedDeal.sell_cost}</td>
                                        <td>{closedDeal.amount}</td>
                                        <td>{closedDeal.value}</td>
                                        <td>{closedDeal.currency}</td>
                                        <td>{format(new Date(closedDeal.closed_at), 'dd-MM-yyyy/kk:mm')}</td>
                                        <td className={closedDeal.profit > 0 ? "profit" : "loss" }>{closedDeal.profit !== 0 ? closedDeal.profit : "" }</td>
                                        <td className={closedDeal.percent > 0 ? "profit" : "loss" }>{closedDeal.percent !== 0 ? closedDeal.percent: "" }</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '0 2rem' }}>
                        <Link to="/" className="btn btn-primary" style={{ marginRight: 10 }}>Back</Link>
                        <Link to="/stockmarket" className="btn btn-primary" style={{ marginRight: 10 }}>Market</Link>
                        <Link to="/" className="btn btn-danger" style={{ marginRight: 10 }} onClick={deletePortfolio}>Delete</Link>
                    </div>
                    <button onClick={handleClick} className="btn btn-primary" style={{ display: 'flex', justifyContent: 'center', padding: '0 2rem', marginLeft: 35, marginTop: 5 }}>Toggle display mode</button>
                </div>)
            /* <h1>Stocks</h1>
        <StockList />
        <h1>Bonds</h1>
        <BondList />
        <h1>Funds</h1>
        <FundList /> */
        }

    };
}


export default PortfolioDetails;