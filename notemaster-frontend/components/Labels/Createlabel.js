import Modal from '../Modal';
import { useState, useEffect, useContext } from 'react';
import { url } from '../../components/Globals';
import axios from 'axios';

const Createlabel = ({show, onClose, labels, setLabels}) => {
    const [showCreateLabelModal, setshowCreateLabelModal] = useState(show);
    const [labelName, setLabelName] = useState("");

    async function createLabel(e=undefined){
        e!==undefined?e.preventDefault():"";

        const form = document.getElementById("createLabelForm");
        const authToken = localStorage.getItem("authToken");

        const {data} = await axios.post(url("/api/labels/create/"), new FormData(form), {
            headers: {authToken},
        });

        setLabels([...labels, data]);
        setLabelName("");
        onClose();
    }


    useEffect(() => {
        setshowCreateLabelModal(show);
    }, [show]);

    return (
        <>
        <Modal 
        header={"Create a label"}
        body={
            <form id="createLabelForm" onSubmit={createLabel}>
                <input className="form-input" placeholder="Enter label name" name="newLabelName" value={labelName} onChange={e => setLabelName(e.target.value)} />
            </form>
        }
        footer={
            <div className="flex gap-x-3">
                <button className="btn btn-green" onClick={e => createLabel()}><i className="fa fa-plus mr-2"></i>Create</button>
                <button className="btn btn-blue" onClick={onClose}>Close</button>
            </div>
        }
        show={showCreateLabelModal}
        onClose={onClose}
        
        />
            
        </>
    )
}

export default Createlabel;
