import React, {useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from "../context/authContext";

    const Navigation = () => {
    const { REACT_APP_BACKEND_URL} = process.env

    const auth = useContext(AuthContext)
    const history = useHistory()
    const [userName, setName] = useState(auth.userName)

    const logout = async () => {
        await fetch(`${REACT_APP_BACKEND_URL}/users/signout`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            })
        setName('')
        auth.userName = userName
        history.push("/")
        history.go(0)
        }

    let menu

    if (!auth.isAuthenticated) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item active">
                <Link to="/profile" className="nav-link">{auth.userName}</Link>
            </li>
            <li className="nav-item active">
                <Link to="/" className="nav-link" onClick={logout}>Logout</Link>
            </li>
        </ul>
        )
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Home</Link>
                    <div>
                        <p className="nav-link">$ = {auth.usdRate} ({auth.usdChange}) € = {auth.eurRate} ({auth.eurChange})</p>
                        {/* <p className="nav-link"></p> */}
                    </div>
                    <div>
                        {menu}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;