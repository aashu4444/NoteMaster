import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { NotesContext } from '../../context/NotesContext';
import Notes from "../Notes/Notes";
import { url } from '../Globals';
import axios from 'axios';

const Searchnotes = () => {
    const router = useRouter();
    const { notes, setNotes } = useContext(NotesContext);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        async function searchNotes() {
            const query = router.query.query;

            if (query !== undefined){
                const authToken = localStorage.getItem("authToken");
                
                const { data } = await axios.get(url(`/api/note/search/?query=${query}`), {
                    headers: { authToken },
                });
                
                setNotes(data);
                setIsMounted(true);
            }
        };

        searchNotes();

    }, [router]);
    return isMounted === true && <>
        {notes.length!==0? 
        <div>
            <h3 className="text-2xl mb-5">{notes.length} Note(s) found!</h3>
            <Notes />
        </div>
        :
            <p className="rounded-md px-4 text-white bg-red-500 p-3">No notes found ! Try to enter a different query...</p>
        }

    </>;
};

export default Searchnotes;


