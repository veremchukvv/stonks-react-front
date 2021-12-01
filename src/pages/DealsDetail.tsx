import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { format } from "date-fns";

const DealsDetails = () => {
    const [deal, setDeal] = useState(null)
    const dealId = parseInt(useParams<any>().id)

    const history = useHistory()
    const back = async () => {
        history.goBack()
    }

    const fetchDeal = useCallback(async () => {
        const response = await fetch(`http://localhost:8000/api/v1/deals/${dealId}`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const content = await response.json()
        setDeal(content)
    }, [dealId]
    )

    useEffect(
        () => {
            fetchDeal()
        }, [fetchDeal]
    )

    const closeDeal = async () => {
        await fetch(`http://localhost:8000/api/v1/${dealId}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        history.goBack()
    }

    const deleteDeal = async () => {
        await fetch(`http://localhost:8000/api/v1/deals/${dealId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        history.goBack()
    }


    if (deal != null) {
        return (
        <div>
            <h2>Deal Info</h2>
            <p>Company name: {deal['name']}</p>
            <p>Ticker: {deal['ticker']}</p>
            <p>Stock type: {deal['type']}</p>
            <p>Stock description: {deal['description']}</p>
            <p>Stock buy cost: not implemented yet</p>
            <p>Stock current cost: {deal['cost']}</p>
            <p>income (money): not implemented yet</p>
            <p>income (%): not implemented yet</p>
            <p>Stock currency: {deal['currency']}</p>
            <p>deal time: {format(new Date(deal['created_at']), 'dd-MM-yyyy/kk:mm')}</p>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0 2rem' }}>
                <button className="btn btn-primary" onClick={back} style={{ display: 'flex', justifyContent: 'center', marginTop: 10,  marginRight: 10}}>Back</button>
                <button className="btn btn-primary" onClick={closeDeal} style={{ display: 'flex', justifyContent: 'center', marginTop: 10,  marginRight: 10 }}>Close deal</button>
                <button className="btn btn-danger" onClick={deleteDeal} style={{ display: 'flex', justifyContent: 'center', marginTop: 10,  marginRight: 10 }}>Delete deal</button>
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

export default DealsDetails;