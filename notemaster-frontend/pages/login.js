import Navbar from "../components/Navbar";
import Link from 'next/link';
import axios from "axios";
import { url } from '../components/Globals';
import { GlobalContext } from '../context/GlobalContext';
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';


const Login = () => {
    const { setLoggedin } = useContext(GlobalContext);
    const router = useRouter();
    const [error, setError] = useState(undefined);

    function loginUser(e) {
        e.preventDefault();
        const loginForm = document.getElementById("loginForm");

        axios.post(url('/api/user/login/'), new FormData(loginForm)).then(res => {
            setLoggedin(true);
            localStorage.setItem("authToken", res.data);
            loginForm.reset();
            router.push("/");
        }).catch(error => {
            if (error.response.status === 401){
                setError("Please enter valid credentails");
            };
        });




    }
    return (
        <>
            <Head>
                <title>Login to NoteMaster</title>
            </Head>
            <Navbar />

            <div className="flex w-screen justify-center mt-10">
                <form id="loginForm" className="p-2 md:w-1/3 w-full md:scale-110 rounded-md md:shadow-md py-8 px-6" onSubmit={loginUser}>
                    {error!==undefined && 
                    <p className="p-3 rounded-md bg-red-500 text-white">{error}</p>
                    }

                    {router.query.signupSuccess === 'true' && <p className="p-3 rounded-md bg-green-500 text-white">Account created! you can login now.</p>}


                    

                    <div className="mt-4 flex gap-y-4 flex-col">
                        <label htmlFor="emailAddress" className="flex flex-col gap-y-2 grow">
                            Email address
                            <input id="emailAddress" type="text" name="email" placeholder="doejohn456@gmail.com" className="form-input" />
                        </label>

                        <label htmlFor="password" className="flex flex-col gap-y-2 grow">
                            Password
                            <input id="password" type="password" name="password" placeholder="Enter password" className="form-input" />
                        </label>
                    </div>

                    <footer className='mt-4 flex flex-col text-center gap-y-3'>
                        <button className="text-white bg-blue-500 rounded-full transition-opacity py-2 px-5 grow hover:bg-blue-600  transition-1">Login</button>

                        <p className="text-gray-500">Don&apos;t have an account? <Link href="/signup"><a className="text-blue-600">Sign up</a></Link></p>
                    </footer>
                </form>
            </div>


        </>
    )
}

export default Login;
