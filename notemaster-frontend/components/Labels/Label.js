import Link from 'next/link';
import axios from 'axios';
import {url} from '../Globals';
import {useState, useEffect} from 'react';

const Label = ({label, labels, setLabels, openEditLabelModal}) => {
    const [notesLength, setNotesLength] = useState(0);

    async function deleteLabel(){
        const authToken = localStorage.getItem("authToken");

        const res = await axios.delete(url("/api/labels/delete/"), {
            headers: {authToken},
            data: {
                labelId: label._id.$oid,
            },
        });

        setLabels(labels.filter(item => item._id.$oid!==label._id.$oid))


    };

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        axios.get(url(`/api/labels/getNotesLength/?labelId=${label._id.$oid}`), {
            headers: {authToken},
        }).then(res => {
            setNotesLength(Number(res.data));
        });

    }, []);

    
    return (
        <div className="shadow-blue-400 bg-blue-500 border-blue-400 text-white dark:bg-gray-800 rounded-md w-80 flex justify-between flex-grow md:grow-0 dark:shadow-md dark:shadow-gray-800 border-2 dark:border-gray-500">
            <Link href={`/labels/${label._id.$oid}?name=${label.name}`}><p className="p-4 px-5 grow cursor-pointer">{label.name} ( {notesLength} {notesLength<=1?"Note":"Notes"} )</p></Link>

            <div className="actions flex">
                <button className="p-3 hover:bg-blue-600 hover:text-white dark:bg-gray-900 px-5 dark:hover:bg-gray-700 transition-all duration-200" onClick={e => deleteLabel()}><i className={`fa fa-trash`}></i></button>

                <button className="p-3 hover:bg-blue-600 hover:text-white dark:bg-gray-900 px-5 dark:hover:bg-gray-700 transition-all duration-200" onClick={e=>openEditLabelModal(label)}><i className={`fa fa-edit`}></i></button>
                
            </div>
        </div>
    )
}

export default Label;
