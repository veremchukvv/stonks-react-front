import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Navigation from "./components/Navigation"
import { BrowserRouter, Route } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import CreatePortfolio from './pages/CreatePortfolio';
import PortfolioDetails from './pages/PortfolioDetails';
import StockMarket from './pages/StockMarket';
import StockDetails from './pages/StockDetails';
import DealsDetails from './pages/DealsDetail';
import ClosedDealsDetails from './pages/ClosedDealsDetail';

function App() {
    const [userName, setName] = useState('')
    const isAuthenticated = !!userName
    const portfolioID = 0
    const auth = useContext(AuthContext)

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/users/user', {
                    headers: {'Content-Type':'application/json'},
                    credentials: 'include',
                })
                const content = await response.json()

                setName(content.name)
            }
        )()
    }, [auth.userName]
        )

    return (
        <AuthContext.Provider value={{ userName, isAuthenticated, portfolioID }}>
            <div className="App">
                <BrowserRouter>
                    <Navigation />
                    <main className="form-signin">
                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/deals/:id" exact component={DealsDetails} />
                        <Route path="/deals/closed/:id" component={ClosedDealsDetails} />
                        <Route path="/newPortfolio" component={CreatePortfolio} />
                        <Route path="/portfolios/:id" component={PortfolioDetails} />
                        <Route path="/stockmarket" exact component={StockMarket} />
                        <Route path="/stockmarket/:id" component={StockDetails} />
                    </main>
                </BrowserRouter>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
