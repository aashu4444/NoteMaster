import React, { useState, useEffect } from 'react';

const Modal = ({header, body, footer, show , trigger, onClose}) => {
    const [showModal, setShowModal] = useState(show);

    useEffect(() => {
        setShowModal(show);
    }, [show])
     
    return (
        <>
        <div className={`fixed top-0 left-0 z-10 w-full h-screen flex justify-center items-center duration-100`} style={
            showModal===true?
            {pointerEvents:"all",opacity:1}:
            {pointerEvents:"none", opacity:0}}>

                
            <div className={`bg-white shadow-sm shadow-gray-100 text-blue rounded-md max-w-full dark:bg-gray-900 dark:text-white dark:shadow-gray-800 `} style={{width:"28rem"}}>

                <div className="text-xl mb-1 shadow-sm px-4 py-4  shadow-blue-300 flex justify-between transition-1 dark:shadow-gray-800">
                    {header} 

                    {/* Close modal button */}
                    <i className="fa fa-times cursor-pointer p-1" onClick={e=>{setShowModal(false);onClose(e)}}></i></div>

                <div className="p-4 flex flex-col max-h-96 overflow-auto">

                        {body}
                </div>

                <footer className="p-4 flex justify-end dark:bg-gray-800 bg-gray-300 mt-4">
                    {footer}
                </footer>
            </div>
        </div>

        {trigger!==undefined&&<span onClick={e=>setModalClass("")}>{trigger}</span>}
        </>
    )
}

export default Modal;
