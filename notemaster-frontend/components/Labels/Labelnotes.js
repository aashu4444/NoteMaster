import { useContext, useEffect, useState } from "react";
import { NotesContext } from "../../context/NotesContext";
import Notes from '../Notes/Notes';

const Labelnotes = ({notes}) => {
    const {setNotes, fetchLabels, classifyNotes} = useContext(NotesContext);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        async function fetchData(){
            let Notes = await fetchLabels(notes);

            setNotes(Notes);
            setIsMounted(true);
        };

        fetchData();

    }, [notes]);


    return isMounted===true &&  (
        <div className="m-5 flex gap-x-3 gap-y-5 flex-wrap">
           <Notes />
        </div>
    )
}

export default Labelnotes;
