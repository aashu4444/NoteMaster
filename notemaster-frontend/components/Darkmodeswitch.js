import {GlobalContext} from '../context/GlobalContext';
import { useTheme } from "next-themes";
import {useContext, useEffect, useState} from 'react';

const Darkmodeswitch = () => {
    const { theme, setTheme } = useTheme();
    const {isDarkMode, setIsDarkMode} = useContext(GlobalContext);
    const [isMounted, setIsMounted] = useState(false);

    const switchTheme = (e) => {
        if (isMounted) {
            setTheme(isDarkMode === true ? "light" : "dark");
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return <label htmlFor="darkMode" className="bg-blue-500 text-white flex w-24 dark:bg-gray-700 justify-between items-center rouned-md rounded-full cursor-pointer relative " onClick={switchTheme}>
        <input type="checkbox" name="darkMode" id="darkMode" className="peer" onChange={e => setIsDarkMode(e.target.checked)} checked={isDarkMode} hidden />
        <div className="w-10 rounded-full h-10 bg-blue-600 -left-2 absolute z-0 peer-checked:left-12 translate-x-2 transition-all duration-500 scale-75"></div>
        <i className="fa fa-sun cursor-pointer p-3 rounded-full relative z-10 animate-pop"></i>
        <i className="fa fa-moon cursor-pointer p-3 rounded-full relative z-10"></i>
    </label>;
};

export default Darkmodeswitch;
