import Navbar from '../../components/Navbar';
import { useRef, useContext, useState } from 'react';
import axios from 'axios';
import { url, config } from '../../components/Globals';
import { GlobalContext } from '../../context/GlobalContext';


const Deleteaccount = () => {
    const password = useRef();
    const {logout} = useContext(GlobalContext);
    const [error, setError] = useState(null);

    function deleteAccount(e){
        e.preventDefault();

        const authToken = localStorage.getItem(config.authTokenKey);

        
        axios.delete(url("/api/user/delete/"), {
            data: {accountPassword: password.current.value},
            headers: {
                authToken,
            },
        })
        .then(res => {
            logout();
        })        
        .catch(error => {
            if (error.response.status === 401){
                setError("Please enter correct password!");
            }
        });


    };

    return <>
        <Navbar />
        <div className="flex w-full mt-9 justify-center items-center">
            <form onSubmit={deleteAccount} className="w-96 md:w-96 dark:bg-gray-800 bg-gray-100 shadow-lg shadow-gray-300 dark:shadow-gray-800 rounded-md">
                <h2 className="text-2xl mb-2 dark:bg-gray-700 bg-gray-300 p-3">Delete account</h2>

                <div className="p-3 pb-5">
                    {error!==null && 
                    <p className="bg-red-500 mb-2 text-white p-3 rounded-md">{error}</p>
                    }
                    <label htmlFor="accountPassword">
                        Account password
                        <input type="password" name="accountPassword" id="accountPassword" placeholder="Enter your account's password" className="form-input mt-2" ref={password} />
                    </label>

                    <p className="mt-3 text-red-400">Note : Your all data (Notes, Labels, etc...) of NoteMaster will be deleted if your delete your account</p>

                    <button type="submit" className="btn btn-red mt-4 w-full">Delete account</button>
                </div>
            </form>
        </div>

    </>;
};

export default Deleteaccount;
