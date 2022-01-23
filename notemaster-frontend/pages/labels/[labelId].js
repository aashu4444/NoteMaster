import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import {useState, useEffect} from 'react';
import axios from 'axios';
import {url} from '../../components/Globals';
import { NotesState } from "../../context/NotesContext";
import Labelnotes from "../../components/Labels/Labelnotes";
import Head from 'next/head';


const Labelnotespage = ({labelId}) => {
    const router = useRouter();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        async function fetchNotes() {
            const authToken = localStorage.getItem("authToken");

            const { data } = await axios.get(url(`/api/labels/notes/get/?labelId=${labelId}`), {
                headers: { authToken },
            });

            setNotes(data);


        };

        fetchNotes();
    }, []);

    return (
        <NotesState>
            <Head>
                <title>Label - {router.query.name}</title>
            </Head>
            <Navbar />
            <Labelnotes notes={notes} />

        </NotesState>
    )
}

Labelnotespage.getInitialProps = async ({ query }) => {
    const {labelId} = query
  
    return {labelId}
  }

export default Labelnotespage;
