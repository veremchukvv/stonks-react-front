import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { format } from "date-fns";

const ClosedDealsDetails = () => {
    const [closedDeal, setClosedDeal] = useState(null)
    const closedDealId = parseInt(useParams<any>().id)

    const history = useHistory()
    const back = async () => {
        history.goBack()
    }

    const fetchClosedDeal = useCallback(async () => {
        const response = await fetch(`http://localhost:8000/api/v1/closed/${closedDealId}`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const content = await response.json()
        setClosedDeal(content)
    }, [closedDealId]
    )

    useEffect(
        () => {
            fetchClosedDeal()
        }, [fetchClosedDeal]
    )

    const deleteClosedDeal = async () => {
        await fetch(`http://localhost:8000/api/v1/closed/${closedDealId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        history.goBack()
    }


    if (closedDeal != null) {
        return (
        <div>
            <h2>Closed Deal Info</h2>
            <p>Company name: {closedDeal['name']}</p>
            <p>Ticker: {closedDeal['ticker']}</p>
            <p>Stock type: {closedDeal['type']}</p>
            <p>Stock description: {closedDeal['description']}</p>
            <p>Stock amount: {closedDeal['amount']}</p>
            <p>Stock buy cost: {closedDeal['buy_cost']}</p>
            <p>Stock sell cost: {closedDeal['sell_cost']}</p>
            <p>Stock value: {closedDeal['value']}</p>
            <p>income (money): {closedDeal['profit']}</p>
            <p>income (%): {closedDeal['percent']}</p>
            <p>Stock currency: {closedDeal['currency']}</p>
            <p>deal open time: {format(new Date(closedDeal['opened_at']), 'dd-MM-yyyy/kk:mm')}</p>
            <p>deal close time: {format(new Date(closedDeal['closed_at']), 'dd-MM-yyyy/kk:mm')}</p>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0 2rem' }}>
                <button className="btn btn-primary" onClick={back} style={{ display: 'flex', justifyContent: 'center', marginTop: 10,  marginRight: 10}}>Back</button>
                <button className="btn btn-danger" onClick={deleteClosedDeal} style={{ display: 'flex', justifyContent: 'center', marginTop: 10,  marginRight: 10 }}>Delete closed deal</button>
            </div>
        </div>
    );
} else {
    return (
        <div>
            OOPS
        </div>
    )
}
}

export default ClosedDealsDetails;