import Readnote from './Readnote';
import Note from './Note';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { getToday } from '../Globals';
import Managelabels from './Managelabels';
import Editnote from './Editnote';
import { NotesContext } from '../../context/NotesContext';
import Createnote from './Createnote';

const Notes = () => {
    const { showOverlay, setShowOverlay, showEditNoteModal, setShowEditNoteModal, setShowManageLabelsModal, setShowCreateNoteModal, setShowReadNoteModal } = useContext(GlobalContext);

    const [targetNote, setTargetNote] = useState(undefined);
    const [classifiedNotes, setClassifiedNotes] = useState([]);


    let { notes, classifyNotes } = useContext(NotesContext);




    const openEditNoteModal = function (note) {
        setShowEditNoteModal(true);
        setShowOverlay(true);
        setTargetNote(note);
    }

    const openManageLabelsModal = function (note) {
        setShowManageLabelsModal(true);
        setShowOverlay(true);
        setTargetNote(note);
    }

    
    function openReadNoteModal(note){
        setShowReadNoteModal(true);
        setShowOverlay(true);
        setTargetNote(note);
    }


    useEffect(() => {
        setClassifiedNotes(classifyNotes(notes));

    }, [notes]);




    return (
        <>
            <Managelabels note={targetNote} />
            <Createnote />
            <Readnote note={targetNote} openReadNoteModal={openReadNoteModal} />

            <div className="flex flex-col w-full">
                <div className="mb-3">

                    <button className="btn btn-blue" onClick={e => { setShowCreateNoteModal(true) }}><i className="fa fa-plus mr-2"></i>Create Note</button>
                </div>

                {notes.length === 0 && <p className="p-3 w-full md:w-auto bg-red-500 text-white rounded-md">Oops! you don't have any notes <button onClick={e => { setShowCreateNoteModal(true) }}>Click here</button> to create a note.</p>}

                <div className="flex flex-col gap-y-5">
                    {classifiedNotes.map((item, key) => {
                        return <div key={key}>
                            <div>
                                <h2 className="text-2xl mb-5">{item[0] === getToday() ? "Today" : item[0]}</h2>
                            </div>
                            <div className="flex gap-x-2 gap-y-5 flex-wrap">
                                {/* item[1] contains notes */}
                                {item[1].map((note, key) => <Note key={key} note={note}
                                    openEditNoteModal={openEditNoteModal}
                                    openManageLabelsModal={openManageLabelsModal} setTargetNote={setTargetNote}
                                    openReadNoteModal={openReadNoteModal} />)}
                            </div>
                        </div>

                    })}
                </div>
            </div>

            <Editnote note={targetNote} />

        </>
    )
}

export default Notes;
