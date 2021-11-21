import React, { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router';

const CreatePortfolio = () => {
    const [name, setPortfolioName] = useState('')
    const [description, setPortfolioDescription] = useState('')
    const [is_public, setPortfolioIsPublic] = useState(false)
    const history = useHistory()

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await fetch('http://localhost:8000/api/v1/portfolio/', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name,
                description,
                is_public
            })
        })
        history.push('/')
    }

    return (
        <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Choose portfolio parameters</h1>

        <input className="form-control" placeholder="Name" required
               onChange = {e => setPortfolioName(e.target.value)} 
        />

        <input className="form-control" placeholder="Description" required
               onChange = {e => setPortfolioDescription(e.target.value)}
        />
        <label>
            Public
        <input type="checkbox" className="form-control" checked={true} required
               onChange = {e => setPortfolioIsPublic(e.target.checked)}
        />
        </label>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
    );
};

export default CreatePortfolio;