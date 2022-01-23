import Navbar from "../components/Navbar";
import { useRouter } from 'next/router';
import Searchform from "../components/search/Searchform";
import Searchnotes from "../components/search/Searchnotes";
import { NotesState } from "../context/NotesContext";
import Head from 'next/head';

const Search = () => {
    const router = useRouter();


    return <NotesState>
        <Head>
            <title>Search results - {router.query.query}</title>
        </Head>
        <Navbar />
        <section id="searchNotes" className=" m-3 mt-5 mx-5">
            <div className="flex ml-auto mb-4">
                <Searchform />
            </div>

            <Searchnotes />
        </section>


    </NotesState>;
};

export default Search;
