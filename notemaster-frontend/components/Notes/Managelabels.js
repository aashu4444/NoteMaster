import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { NotesContext } from '../../context/NotesContext';
import Modal from '../Modal';
import Link from 'next/Link';
import { url, truncate } from '../Globals';

const Managelabels = ({ note }) => {
    const { showManageLabelsModal, setShowManageLabelsModal, setShowOverlay } = useContext(GlobalContext);
    const {addToLabel, removeFromLabel} = useContext(NotesContext);
    
    const [labels, setLabels] = useState([]);
    const [currentNote, setCurrentNote] = useState(note);

    const closeModal = function () {
        setShowManageLabelsModal(false);
        setShowOverlay(false)
    };


    // Below function return true if the given label is exists in note's labels
    function includes(label){
        if (currentNote.labels!==undefined){
            for (let item of currentNote.labels){
                if (item._id.$oid===label._id.$oid){
                    return true;
                }
            }
        }

        return false;
    }

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        axios.get(url("/api/labels/get/"), {
            headers: { authToken },
        }).then(res => {
            setLabels(res.data);
        });

    }, []);

    useEffect(() => {
        setCurrentNote(note);

    }, [note]);




    return currentNote !== undefined && labels !== undefined && (
        <>
            <Modal
                header={"Manage labels"}
                body={
                    <div className="flex flex-col gap-y-4">
                        <p>Note Title : {truncate(currentNote.title, 50)}</p>


                        {labels===undefined||labels.length===0&& 
                        <p className="bg-red-500 rounded-md p-2 px-4 text-white">Oops ! No labels are available. Plase got <Link href="/labels">labels</Link> page to create a label</p>
                        }

                        {labels.map((label, key) => <div key={key} className="flex justify-between dark:bg-gray-800 rounded-md shadow-md dark:shadow-gray-800 bg-gray-300">
                            <span className="p-3">{label.name}</span>
                            {
                                includes(label)===true
                                ?
                                // If the note is aleready in the current label
                                <i className="fa fa-minus cursor-pointer p-3 dark:hover:bg-gray-900 hover:bg-gray-400 transition-all duration-200" onClick={e => removeFromLabel(label, currentNote)}></i>
                                :
                                // If the note is not in the current label
                                <i className="fa fa-plus cursor-pointer p-3 dark:hover:bg-gray-900 hover:bg-gray-400 transition-all duration-200" onClick={e => addToLabel(label, currentNote)}></i>
                                
                            }

                        </div>)}
                    </div>
                }
                show={showManageLabelsModal}
                onClose={e => closeModal()}
                footer={
                    <>
                        <button className="btn btn-blue" onClick={e => closeModal()}>Close</button>
                    </>}
            />
        </>
    )
}

export default Managelabels;
