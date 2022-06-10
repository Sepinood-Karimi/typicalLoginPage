import React,{useState,useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn:false,
    onLogout:()=>{},
    onLogin: (email,password)=>{}
});

export const AuthContextProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const userLoggedInInfo=localStorage.getItem('isLoggedIn');
        if (userLoggedInInfo==='1'){
            setIsLoggedIn(true);
        }
    },[])
    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('isLoggedIn','1');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };
    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn,onLogout:logoutHandler,onLogin:loginHandler}}>{children}</AuthContext.Provider>;

}

export default AuthContext;
