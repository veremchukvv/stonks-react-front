import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PortfolioList = () => {
    const [portfolios, setPortfolios] = useState<any[]>([])

    const fetchPortfolios = useCallback(async () => {
const response = await fetch('http://localhost:8000/api/v1/portfolio/', {
    headers: {'Content-Type':'application/json'},
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
{/* <button className="w-100 btn btn-lg btn-primary" type="submit">Create new Portfolio</button> */}
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
        <th>Open</th>
      </tr>
      </thead>

      <tbody>
      { portfolios.map((portfolio, index) => {
        return (
          <tr key={portfolio.id}>
            <td>{index + 1}</td>
            <td>{portfolio.name}</td>
            <td>{portfolio.assets_rub}</td>
            <td>{portfolio.assets_usd}</td>
            <td>{portfolio.assets_eur}</td>
            <td>
              <Link to={`/portfolio/${portfolio.id}`}>Открыть</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
    <Link to="/newPortfolio" className="btn btn-primary">Create new portfolio</Link>
        </div>
    );
};

export default PortfolioList;