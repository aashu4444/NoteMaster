import Navbar from "../components/Navbar";
import Link from 'next/link';
import axios from 'axios';
import { url } from "../components/Globals";
import { useRouter } from 'next/router';
import Head from 'next/head';

const Signup = () => {
    const router = useRouter();

    async function createUser(e) {
        e.preventDefault();
        const signupForm = document.getElementById("signupForm");

        const res = await axios.post(url("/api/user/create/"), new FormData(signupForm));

        signupForm.reset();

        // Redirect to login page
        router.push("/login?signupSuccess=true");

    };

    return (
        <>
            <Head>
                <title>Create a new account on NoteMaster</title>
            </Head>

            <Navbar />

            <div className="flex w-screen justify-center md:mt-1 overflow-x-hidden">
                <form id="signupForm" className="md:w-1/2 w-full rounded-md md:shadow-md py-5 px-6 gap-y-6" onSubmit={createUser}>

                    {router.query.accountDeleted === 'true' && <p className="p-3 mb-3 rounded-md bg-green-500 text-white">Account deleted successfully!</p>}

                    <div className="grid gap-y-6">


                        <label htmlFor="firstName" className="flex flex-col gap-y-2 grow">
                            First name
                            <input id="firstName" type="text" name="firstName" placeholder="John" className="form-input" />
                        </label>

                        <label htmlFor="lastName" className="flex flex-col gap-y-2 grow">
                            Last Name
                            <input id="lastName" type="text" name="lastName" placeholder="Doe" className="form-input" />
                        </label>


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
                        <button type="submit" className="text-white bg-blue-500 rounded-full transition-opacity py-2 px-5 grow hover:bg-blue-600 hover:shadow-md transition-1">Submit</button>

                        <p className="text-gray-500">Aleready have an account? <Link href="/login"><a className="text-blue-500">Login</a></Link></p>
                    </footer>
                </form>
            </div>


        </>
    )
}

export default Signup;
