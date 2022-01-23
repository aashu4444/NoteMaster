import Navbar from "../components/Navbar";
import Notes from "../components/Notes/Notes";
import { NotesState } from '../context/NotesContext';
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
import Searchform from "../components/search/Searchform";
import Head from 'next/head';

export default function Home() {
  const { loggedin } = useContext(GlobalContext);

  return (
    <NotesState>
      <Head>
        <title>NoteMaster - Home</title>
      </Head>
      <Navbar />

      {loggedin === true &&
        <div className="m-5 flex gap-x-3 gap-y-5 flex-col flex-wrap">
          <Searchform />
          <Notes />
        </div>}

    </NotesState>
  )
}
