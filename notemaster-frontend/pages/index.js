import Navbar from "../components/Navbar";
import Notes from "../components/Notes/Notes";
import { NotesState } from '../context/NotesContext';
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
import Searchform from "../components/search/Searchform";
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const { loggedin } = useContext(GlobalContext);

  return (
    <NotesState>
      <Head>
        <title>NoteMaster - Home</title>
      </Head>
      <Navbar />

      {loggedin === true ?
        <div className="m-5 flex gap-x-3 gap-y-5 flex-col flex-wrap">
          <Searchform />
          <Notes />
        </div> :
        <section className="p-5 flex gap-x-8 mt-8 w-full justify-center">
          <div className="w-full px-5 md:w-1/2">
            <h2 className="text-2xl">Welcome to NoteMaster</h2>
            <h3 className="text-lg mt-3 dark:text-gray-300">NoteMaster helps you to save your notes on the cloud and it is easy to manage your notes on NoteMaster. You can create labels and categorize your images easily. Why you are waiting for? create your account and start using NoteMaster now, this is quick and easy!</h3>

            <div className="flex gap-x-3 md:mt-4 mt-8">
              <Link href="/signup">
                <a className="btn btn-blue">Create account</a>
              </Link>
              <Link href="/login">
                <a className="btn btn-blue">Login</a>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex">
            <Image src="/notemaster-main.png" width="300" height="300"></Image>
          </div>
        </section>
      }

    </NotesState>
  )
}
