import Link from "next/link";
import { GlobalContext } from "../context/GlobalContext";
import { useContext, useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import { url } from "../components/Globals";
import LoadingBar from 'react-top-loading-bar';
import Navdrawer from './Navdrawer';
import Darkmodeswitch from "./Darkmodeswitch";
import Createnote from './Notes/Createnote';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    const { loggedin, setShowCreateNoteModal, logout, progress, setProgress, setShowNavdrawer, isDarkMode, setIsDarkMode, showOverlay } = useContext(GlobalContext);
    const [user, setUser] = useState({});
    const [isMounted, setIsMounted] = useState(false);



    useEffect(() => {
        const fetchUser = async () => {
            const authToken = localStorage.getItem("authToken");

            if (authToken !== null) {

                const { data } = await axios.get(url("/api/user/get/"), {
                    headers: { authToken },
                });

                setUser(data);


            }
        };

        fetchUser();

        setIsMounted(true);


    }, []);

    return (
        <>
            <div className={`w-full h-screen fixed top-0 left-0 bg-black`} style={
                showOverlay === true ?
                    { opacity: 0.5, pointerEvents: "all" } :
                    { opacity: 0, pointerEvents: "none" }
            }></div>

            <nav className="py-4 px-3 shadow-md flex justify-between flex-col md:flex-row gap-y-3 dark:bg-gray-800 items-center dark:text-white">
                <div className="flex w-full md:w-auto justify-between">

                    <h1 className="text-2xl text-blue-600 dark:text-white">NoteMaster</h1>


                    <div className="md:hidden flex flex-col gap-y-2 cursor-pointer" onClick={e => setShowNavdrawer(true)}>
                        {[0, 0, 0].map((item, key) => {
                            return <div key={key} className="h-1 bg-blue-500 w-12"></div>
                        })}
                    </div>
                </div>

                <div className="md:flex items-center hidden">
                    <ul className="flex gap-x-6 mr-6">
                        <li>
                            <Link href="/">
                                <a className='cursor-pointer dark:text-gray-400 dark:hover:text-white transition-all duration-200 text-gray-500 hover:text-black'>Home</a>
                            </Link>
                        </li>

                        {loggedin === true ?
                            <>

                                <li>
                                    <Link href="/labels">
                                        <a className="cursor-pointer dark:text-gray-400 dark:hover:text-white transition-all duration-200 text-gray-500 hover:text-black">Labels</a>
                                    </Link>
                                </li>

                                <Dropdown trigger={
                                    <li>
                                        <a className="cursor-pointer dark:text-gray-400 dark:hover:text-white transition-all duration-200 text-gray-500 hover:text-black">User</a>
                                    </li>
                                }>
                                    <div className="bg-blue-600 text-white flex flex-col dark:bg-gray-900 shadow-sm dark:shadow-gray-800 rounded-md w-80 mt-3 -mr-7">
                                        <span className="p-3">{user.firstName} {user.lastName}</span>

                                        <hr className="mb-3" />

                                        <Link href="/account/delete">
                                            <a className={styles.dropdownItem} >Delete account <i className="fa fa-trash text-white"></i></a>
                                        </Link>

                                        <a className={styles.dropdownItem} onClick={e => logout()}>Logout <i className="fa fa-sign-out-alt text-white"></i></a>
                                    </div>

                                </Dropdown>
                            </>

                            : ""}
                    </ul>

                    {loggedin === false ?
                        <ul className="flex gap-x-2">
                            <li>
                                <Link href="/signup">
                                    <a className="text-white bg-blue-500 py-2 px-4 rounded-full hover:bg-blue-600 transition-opacity">Sign up</a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/login">
                                    <a className="text-white bg-blue-500 py-2 px-4 rounded-full hover:bg-blue-600 transition-1 mr-3">Log in</a>
                                </Link>
                            </li>
                        </ul>
                        :
                        ""
                    }

                    <Darkmodeswitch />

                </div>

                <LoadingBar
                    color='#f11946'
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                />
            </nav>
            <Navdrawer user={user} />
        </>

    )
}

export default Navbar
