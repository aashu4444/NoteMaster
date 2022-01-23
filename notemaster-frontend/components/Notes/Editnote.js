import {useState, useEffect,useContext} from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { NotesContext } from '../../context/NotesContext';
import Modal from '../Modal';

const Editnote = ({note}) => {
    const [Note, setNote] = useState(note);
    const {showEditNoteModal, setShowEditNoteModal, setShowOverlay} = useContext(GlobalContext);
    const {editNote} = useContext(NotesContext);
    

    const closeModal = function(){
        setShowEditNoteModal(false);
        setShowOverlay(false)
    }


    useEffect(() => {
        setNote(note);
    }, [note]);

    return (
        <>
            <Modal
                header={"Edit note"}
                body={
                    Note !== undefined && <div className="flex flex-col gap-y-4">
                        <label htmlFor="noteTitle">
                            Title
                            <input type="text" name="noteTitle" id="noteTitle" value={Note.title} className="form-input mt-2" onChange={e => setNote({ ...Note, title: e.target.value })} />
                        </label>

                        <label htmlFor="note">
                            Note
                            <textarea type="text" name="note" id="note" value={Note.note} className="form-input mt-2" onChange={e => setNote({ ...Note, note: e.target.value })} ></textarea>
                        </label>
                    </div>
                }
                show={showEditNoteModal}
                onClose={e => closeModal()}
                footer={
                    <>
                        <button className="btn btn-red mr-4" onClick={e => {editNote(Note); closeModal()}}><i className="fa fa-save mr-3"></i>Save</button>

                        <button className="btn btn-blue" onClick={e => closeModal()}>Cancel</button>
                    </>}
            />
        </>
    )
}

export default Editnote
