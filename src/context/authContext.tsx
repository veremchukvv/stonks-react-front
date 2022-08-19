import { createContext} from "react";

export const AuthContext = createContext({
    userName: '',
    isAuthenticated: false,
    portfolioID: 0,
    usdRate: 0,
    usdChange: 0,
    eurRate: 0,
    eurChange: 0
})