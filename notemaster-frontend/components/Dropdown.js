import {useState} from 'react';

const Dropdown = (props) => {
    const [dropdownState, setDropdownState] = useState(false);
    return (
        <div className="dropdown">
            <span onClick={e => setDropdownState(dropdownState===false?true:false)} className="dropdown_trigger">{props.trigger}</span>
            <div className="dropdown_content flex flex-col" style={dropdownState===true?{pointerEvents:'all', opacity: 1, transform: "rotate(0deg)"}:{pointerEvents:'none', opacity: 0, transform: "rotate(-11deg)"}}>
                {props.children}
            </div>
        </div>
    )
}

export default Dropdown;
