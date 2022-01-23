import { useState } from "react";

const Apibutton = (props) => {
    const [children, setChildren] = useState(props.children);
    const [loading, setLoading] = useState(false);

    const handleOnClick = e => {
        setChildren(<i className="fa fa-spinner fa-spin text-white font-xl"></i>);
        setLoading(true);

        props.onClick!==undefined?props.onClick():"";
    };

    return (
        <button {...props} disabled={loading} onClick={handleOnClick}>{children}</button>
    )
}

export default Apibutton
