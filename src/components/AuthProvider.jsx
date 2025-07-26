import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(null);
    const handleClose = () => setModalShow(null);
    const handleShowRegister = () => setModalShow("register");
    const handleShowLogin = () => setModalShow("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            if (user) {
                setModalShow(null);
                navigate("/profile");
            }
        });
        return () => unsubscribe();
    }, [navigate])

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (event) => {
        event.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(res.user);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
            console.log("User logged out");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };


    return (
        <AuthContext.Provider
            value={{
                currentUser,
                handleGoogleLogin,
                handleLogin,
                handleRegister,
                handleLogout,
                modalShow,
                handleShowLogin,
                handleShowRegister,
                handleClose,
                setEmail,
                setPassword
            }}>
            {!loading && children}
        </ AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
