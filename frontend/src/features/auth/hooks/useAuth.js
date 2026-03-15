import { useContext,useEffect } from "react";
import AuthContext from "../usecontext/createContext";
import { login,logout, register,getMe} from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context;

    const handleLogin = async ({ email, password }) => {
    setLoading(true)
    try {
        const data = await login({ email, password })
        console.log("response:", data) 
        if (data?.isExistUser) {
            setUser(data.isExistUser)        
        } else {
            console.log("Login failed:", data?.message)
        }
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
}

    const handleRegister = async({username,email,password}) => {
          setLoading(true)
        try {
            const data = await register({username,email,password})
            setUser(data.isExistUser)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async() => {
           setLoading(true)
        try {
            const data = await logout()
            console.log(data)
            setUser(null)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }

        
    }

    useEffect(()=>{
            const getAndSetUser = async() => {
                try {
                    const data = await getMe()
                    setUser(data?.user)
                } catch (error) {
                    console.error('getMe failed', error)
                    setUser(null)
                } finally {
                    setLoading(false)
                }
            }
            getAndSetUser()
        },[])

    return {user, loading, handleLogin, handleLogout, handleRegister}

}