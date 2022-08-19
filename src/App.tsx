import React, { useContext, useEffect, useState, useCallback } from 'react';
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

    interface currRates {
        usd_rate: number
        usd_change: number
        eur_rate: number
        eur_change: number
    }

    const { REACT_APP_BACKEND_URL } = process.env
    const [userName, setName] = useState('')
    // const [curRates, setRates] = useState<any[]>([])
    const [curRates, setRates] = useState<currRates>({usd_rate: 0, usd_change:0, eur_rate: 0, eur_change: 0})
    const isAuthenticated = !!userName
    const portfolioID = 0
    let usdRate = 0
    let usdChange = 0
    let eurRate = 0
    let eurChange = 0
    const auth = useContext(AuthContext)



    const fetchRates = useCallback(async () => {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/api/v1/stockmarket/rates`, {
            headers: { 'Content-Type': 'application/json' },

        })
        const content = await response.json()
        setRates(content)

    }, [REACT_APP_BACKEND_URL]
    )

    usdRate = curRates.usd_rate
    usdChange = curRates.usd_change
    eurRate = curRates.eur_rate
    eurChange = curRates.eur_change

    console.log(usdRate, usdChange, eurRate, eurChange)

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${REACT_APP_BACKEND_URL}/users/user`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })
                const content = await response.json()
                setName(content.name)
            }
        )()
    }, [auth.userName, REACT_APP_BACKEND_URL]
    )

    useEffect(
        () => {
            fetchRates()
        }, [fetchRates]
    )

    return (
        <AuthContext.Provider value={{ userName, isAuthenticated, portfolioID, usdRate, usdChange, eurRate, eurChange }}>
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
