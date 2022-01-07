import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PortfolioList = () => {
  const { REACT_APP_BACKEND_URL} = process.env

  const [portfolios, setPortfolios] = useState<any[]>([])

  const fetchPortfolios = useCallback(async () => {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/api/v1/portfolios/`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    const content = await response.json()

    setPortfolios(content)
  }, [])

  useEffect(
    () => {
      fetchPortfolios()
    }, [fetchPortfolios]
  )

  if (!portfolios.length) {
    return (
      <div>
        You don't have portfolios yes.
        Create one
        <Link to="/newPortfolio" className="btn btn-primary">Create new portfolio</Link>
      </div>
    )
  } return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Total RUB assets value</th>
            <th>Total USD assets value</th>
            <th>Total EUR assets value</th>
            <th>Total RUB profit</th>
            <th>Total USD profit</th>
            <th>Total EUR profit</th>
            <th>Total RUB percent</th>
            <th>Total USD percent</th>
            <th>Total EUR percent</th>
          </tr>
        </thead>

        <tbody>
          {portfolios.map((portfolio, index) => {
            return (
              <tr key={portfolio.id}>
                <td><Link to={`/portfolios/${portfolio.id}`}>{index + 1}</Link></td>
                <td>{portfolio.name}</td>
                <td>{portfolio.assets_rub}</td>
                <td>{portfolio.assets_usd}</td>
                <td>{portfolio.assets_eur}</td>
                <td className={portfolio.profit_rub > 0 ? "profit" : "loss" }>{portfolio.profit_rub}</td>
                <td className={portfolio.profit_usd > 0 ? "profit" : "loss" }>{portfolio.profit_usd}</td>
                <td className={portfolio.profit_eur > 0 ? "profit" : "loss" }>{portfolio.profit_eur}</td>
                <td className={portfolio.percent_rub > 0 ? "profit" : "loss" }>{portfolio.percent_rub}</td>
                <td className={portfolio.percent_usd > 0 ? "profit" : "loss" }>{portfolio.percent_usd}</td>
                <td className={portfolio.percent_eur > 0 ? "profit" : "loss" }>{portfolio.percent_eur}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Link to="/newPortfolio" className="btn btn-primary">Create new portfolio</Link>
    </div>
  );
};

export default PortfolioList;