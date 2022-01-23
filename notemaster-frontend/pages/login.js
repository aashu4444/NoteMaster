import Navbar from "../components/Navbar";
import Link from 'next/link';
import axios from "axios";
import {url} from '../components/Globals';
import {GlobalContext} from '../context/GlobalContext';
import { useContext } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';


const Login = () => {
    const {setLoggedin} = useContext(GlobalContext);
    const router = useRouter();

    async function loginUser(e){
        e.preventDefault();
        const loginForm = document.getElementById("loginForm");

        const {data} = await axios.post(url('/api/user/login/'), new FormData(loginForm));

        setLoggedin(true);
        localStorage.setItem("authToken", data);
        loginForm.reset();
        router.push("/");


    }
    return (
        <> 
            <Head>
                <title>Login to NoteMaster</title>
            </Head>
            <Navbar />

            <div className="flex w-screen justify-center mt-10">
                <form id="loginForm" className="p-2 md:w-1/3 w-full md:scale-110 rounded-md md:shadow-md py-8 px-6" onSubmit={loginUser}>

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

                        <p className="text-gray-500">Don't have an account? <Link href="/signup"><a className="text-blue-600">Sign up</a></Link></p>
                    </footer>
                </form>
            </div>


        </>
    )
}

export default Login;
