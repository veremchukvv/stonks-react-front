import React, { SyntheticEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Profile = () => {
    const [email, setEmail] = useState('')
    const history = useHistory()
    const auth = useContext(AuthContext)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await fetch('http://localhost:8000/users/update', {
            method: 'PATCH',
            credentials: 'include',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email,
            })
        })
        history.push('/')
    }

    const deleteUserHandler = async () => {
        await fetch('http://localhost:8000/users/delete', {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-Type':'application/json'}
            })
            auth.isAuthenticated = false
            history.push('/')
        }

    return (
        <div>
        <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Change your profile data</h1>

        <input className="form-control" placeholder="Name" defaultValue={auth.userName}
        />

        <input type="email" className="form-control" placeholder="Enter new email" required
               onChange = {e => setEmail(e.target.value)}
        />
        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        <Link to="/" className="w-100 btn btn-lg btn-primary" style={{ marginTop: 3}}>Back</Link>
        <h1>Or delete your profile</h1>
        <button
              className="w-100 btn btn-lg btn-danger"
              onClick={deleteUserHandler}
            >
              Delete Profile
            </button>
    </form>
    </div>
    );
};

export default Profile;