import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { createContext, useContext, useEffect, useState} from "react";
import { auth } from "../firebase";


export const authContext = createContext();

export const useAuth = () => {
   const context = useContext(authContext);
   if (!context) throw new Error("There is no auth provider");
   return context;
}

export function AuthProvider({ children }) { 

    const [user, setUser] = useState(null);
    const [loanding, setLoanding] = useState(true);
    const signup = (email, password) => 
        createUserWithEmailAndPassword(auth, email, password)

    const login = (email, password) => 
    signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth)

    const loginWithGoogle = ()=>{
       const  google_provider = new GoogleAuthProvider()
       return signInWithPopup(auth, google_provider)
    }

    useEffect(() =>{
       const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoanding(false);
        })

        return () =>unsubscribe();
    }, [])
    
    return(
        <authContext.Provider value={{ signup, login, user, logout, loanding, loginWithGoogle}}>
            {children} {/* Renderizar los hijos */}
        </authContext.Provider>
    );
}
