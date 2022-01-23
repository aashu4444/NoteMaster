import Modal from '../Modal';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { NotesContext } from '../../context/NotesContext';

const Addnote = () => {
    const { showOverlay, setShowOverlay, showCreateNoteModal, setShowCreateNoteModal } = useContext(GlobalContext);

    const { createNote } = useContext(NotesContext);

    const [saveToLocalStorage, setSaveToLocalStorage] = useState(false);
    const [saveToCloud, setSaveToCloud] = useState(true);
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        showCreateNoteModal === true ? setShowOverlay(true) : "";
    }, [showCreateNoteModal]);

    const handleAttachFileInputOnChange = e => {
        setAttachments([...attachments, { name: e.target.files[0].name }]);
    }
    function closeModal() {

        setShowOverlay(false);
        setShowCreateNoteModal(false);
    }

    return (
        <>
            <Modal
                header={"Add a note"}
                body={
                    <form id="createNoteForm" className="flex flex-col gap-y-4">
                        <label htmlFor="newNoteTitle">
                            Title
                            <input type="text" name="newNoteTitle" id="newNoteTitle" className="form-input mt-2" placeholder="Enter title of your note" />
                        </label>

                        <label htmlFor="newNote">
                            Note
                            <textarea type="text" name="newNote" id="newNote" className="form-input mt-2" placeholder="Enter your note" ></textarea>
                        </label>
                    </form>
                }
                footer={
                    <div className="flex gap-x-3">
                        <button className="btn btn-red" onClick={e => { createNote(document.getElementById("createNoteForm")); closeModal(); document.getElementById("createNoteForm").reset() }}><i className="fa fa-plus mr-2"></i>Create</button>

                        <button className="btn btn-blue ms-2" onClick={e => closeModal()}>Cancel</button>
                    </div>
                }
                show={showCreateNoteModal}
                onClose={e => closeModal()}

            />
        </>
    )
}

export default Addnote;
