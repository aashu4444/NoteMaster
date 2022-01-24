import Modal from '../Modal';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const Readnote = ({note}) => {
    const { setShowOverlay, showReadNoteModal, setShowReadNoteModal } = useContext(GlobalContext);

    useEffect(() => {
        showReadNoteModal === true ? setShowOverlay(true) : "";
    }, [showReadNoteModal]);

    function closeModal() {
        setShowOverlay(false);
        setShowReadNoteModal(false);
    }

    return note !== undefined && (
        <>
            <Modal
                header={note.title}
                body={
                    <pre className="font-sans">{note.note}</pre>
                }
                footer={
                    <div className="flex gap-x-3">
                        <button className="btn btn-blue ms-2" onClick={e => closeModal()}>Close</button>
                    </div>
                }
                show={showReadNoteModal}
                onClose={e => {closeModal()}}

            />
        </>
    )
}

export default Readnote;
