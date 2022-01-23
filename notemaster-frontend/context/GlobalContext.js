import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';


const GlobalContext = createContext();

const GlobalState = props => {
    const router = useRouter();

    

    const [showOverlay, setShowOverlay] = useState(false);
    const [showEditNoteModal, setShowEditNoteModal] = useState(false);
    const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);
    const [showManageLabelsModal, setShowManageLabelsModal] = useState(false);
    const [loggedin, setLoggedin] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showNavdrawer, setShowNavdrawer] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        if (authToken !== null) {
            setLoggedin(true);
        }
        

        setIsDarkMode(localStorage.getItem("theme") === "light" ? false : true);

    }, []);

    function logout(){
        localStorage.removeItem("authToken");
        setLoggedin(false);
        router.push("/login");
    }

    return <GlobalContext.Provider value={{
        showOverlay,
        setShowOverlay,
        showEditNoteModal,
        setShowEditNoteModal,
        loggedin,
        setLoggedin,
        showCreateNoteModal,
        setShowCreateNoteModal,
        showManageLabelsModal,
        setShowManageLabelsModal,
        logout,
        progress,
        setProgress,
        setShowNavdrawer,
        showNavdrawer,
        isDarkMode,
        setIsDarkMode,
    }}>
        {props.children}
    </GlobalContext.Provider>
}

export { GlobalContext, GlobalState };