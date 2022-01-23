import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import styles from '../styles/Navdrawer.module.css';
import Darkmodeswitch from './Darkmodeswitch';

const NavItem = (props) => {
    const { setShowNavdrawer } = useContext(GlobalContext);

    function handleNavItemOnClick() {
        if (props.onClick === undefined) {
            setShowNavdrawer(false);
        }
        else {
            props.onClick();
            setShowNavdrawer(false);
        }
    }

    return props.href !== undefined
        ?
        <Link href={props.href}>
            <a className={styles.NavdrawerLink} onClick={e => handleNavItemOnClick()}>{props.text}</a>
        </Link>
        :
        <a className={styles.NavdrawerLink} onClick={e => handleNavItemOnClick()}>{props.text}</a>

}

const Navdrawer = ({ user }) => {
    const { loggedin, showNavdrawer, setShowNavdrawer, logout, setShowCreateNoteModal } = useContext(GlobalContext);


    function closeNavdrawer() {
        setShowNavdrawer(false);
    }




    return <div style={showNavdrawer === true ? {
        opacity: 1,
        pointerEvents: "all",
    } : { opacity: 0, pointerEvents: "none" }} className="transition-all duration-200">

        <div className="w-full h-screen bg-black fixed top-0 left-0 opacity-50" onClick={e => closeNavdrawer()}></div>

        <div style={
            showNavdrawer === true ?
                {
                    left: "0%"
                }
                :
                {
                    left: "-80%"
                }
        } className="fixed top-0 left-0 w-72 p-3 h-screen dark:bg-gray-900 bg-white rounded-br-xl rounded-tr-xl transition-all duration-200">
            <div className="flex justify-between items-center px-2">
                <h3 className="text-2xl">NoteMaster</h3>
                <i className="fa fa-times text-2xl cursor-pointer" onClick={e => closeNavdrawer()}></i>
            </div>
            <ul className="flex flex-col w-full mt-4 gap-y-4">
                {loggedin === true &&
                    <div className={`${styles.NavdrawerLink}`}>
                        Logged in as : {user.firstName} {user.lastName}
                    </div>
                }
                <NavItem
                    href="/"
                    text="Home"
                />


                {loggedin === false ?
                    <>
                        <NavItem
                            href="/signup"
                            text="Signup"
                        />
                        <NavItem
                            href="/login"
                            text="Login"
                        />
                    </>
                    :
                    <>

                        <NavItem
                            text={<div className="flex items-center gap-x-3">
                                <i className="fa fa-plus"></i> Create note
                            </div>}
                            onClick={() => { setShowCreateNoteModal(true) }}

                        />
                        <NavItem
                            href="/labels"
                            text={<div className="flex items-center gap-x-3">
                                <i className="fa fa-tag"></i> Labels
                            </div>}
                        />
                        <NavItem
                            text={<div className="flex items-center gap-x-3">
                            <i className="fa fa-sign-out-alt"></i> Logout
                        </div>}
                            onClick={() => logout() && closeNavdrawer()}
                        />
                    </>
                }

                <Darkmodeswitch />


            </ul>
        </div>

    </div>;
};

export default Navdrawer;
