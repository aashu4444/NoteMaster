import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { url, getDate, getToday } from '../components/Globals';
import { GlobalContext } from './GlobalContext';

const NotesContext = createContext();

const NotesState = props => {
    const [notes, setNotes] = useState([]);
    const [authToken, setAuthToken] = useState("");
    const { setProgress } = useContext(GlobalContext);

    async function fetchLabels(notes) {
        const Notes = [];


        // Fetching each note's data
        for (let note of notes) {
            if (note.labels !== undefined) {
                const fetchedLabels = [];
                for (let label of note.labels) {
                    const fetchedLabel = await fetchLabel(label.$oid);
                    fetchedLabels.push(fetchedLabel);
                }

                Notes.push({ ...note, labels: fetchedLabels });
            }
            else {
                Notes.push({ ...note, labels: [] });
            }
        }

        return Notes;
    }

    async function fetchLabel(labelId) {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.get(url(`/api/labels/getLabel?labelId=${labelId}`), {
            headers: { authToken },
        });

        return data;
    }

    function classifyNotes(notes) {
        // Categorizing notes in Dates

        const ClassifiedNotes = [];
        const timestamps = Array.from(new Set(notes.map(item => item.createdDate)));

        for (let timestamp of timestamps) {
            const tNotes = notes.filter(item => item.createdDate === timestamp);
            ClassifiedNotes.push([timestamp, tNotes])
        };


        return ClassifiedNotes;
    }


    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        async function fetchData() {


            if (authToken !== null) {
                setProgress(20);

                // Fetch notes
                const res = await axios.get(url("/api/note/getNotes/"), {
                    headers: { authToken },
                });

                setProgress(70);

                let Notes = await fetchLabels(res.data);

                setNotes(Notes);
                setProgress(100);

            }
        }

        fetchData();
        setAuthToken(authToken);

    }, [])

    async function createNote(createNoteForm) {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(url("/api/note/create/"), new FormData(createNoteForm), {
            headers: { authToken },
        });

        setNotes([...notes, {...data, labels: []}])


    }

    async function shareNote(targetUser, note) {
        const formData = new FormData();
        formData.append("noteId", note._id.$oid);
        formData.append("targetUserId", targetUser._id.$oid);

        const res = await axios.post(url("/api/note/share/"), formData, {
            headers: { authToken },
        });
    }

    async function editNote(note) {
        const res = await axios.put(url("/api/note/edit/"), { ...note, noteId: note._id.$oid }, {
            headers: { authToken },
        });

        setNotes(notes.map(currentNote => currentNote._id.$oid === note._id.$oid ? note : currentNote));
    };

    async function deleteNote(note) {
        setProgress(30);
        const res = await axios.delete(url("/api/note/delete/"), {
            data: {
                noteId: note._id.$oid,
            },
            headers: {
                authToken,
            },
        });

        setNotes(notes.filter(currentNote => currentNote._id.$oid !== note._id.$oid));
        setProgress(100);
    }


    async function addToLabel(label, note) {
        const authToken = localStorage.getItem("authToken");

        const res = await axios.put(url("/api/note/addToLabel/"), {
            noteId: note._id.$oid,
            labelId: label._id.$oid,
        }, {
            headers: { authToken },
        });

        // Update the currentNote object
        setNotes(notes.map(item => item._id.$oid === note._id.$oid ? { ...note, labels: [...note.labels, label] } : item));
    }

    async function removeFromLabel(label, note) {
        const authToken = localStorage.getItem("authToken");

        const res = await axios.delete(url("/api/note/removeFromLabel/"), {
            headers: { authToken },
            data: {
                noteId: note._id.$oid,
                labelId: label._id.$oid,
            },
        });


        // Update the currentNote object
        setNotes(notes.map(item => item._id.$oid === note._id.$oid ? { ...note, labels: note.labels.filter(noteLabel => noteLabel._id.$oid !== label._id.$oid) } : item));
    }

    return <NotesContext.Provider value={{
        notes,
        setNotes,
        editNote,
        deleteNote,
        createNote,
        shareNote,
        addToLabel,
        removeFromLabel,
        fetchLabels,
        classifyNotes
    }}>
        {props.children}
    </NotesContext.Provider>
}

export { NotesContext, NotesState };