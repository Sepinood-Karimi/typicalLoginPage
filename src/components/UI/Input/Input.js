import React,{useRef,useImperativeHandle} from "react";
import classes from "./Input.module.css"

const Input = React.forwardRef( ({isValid,onChange,onBlur,inputValue,inputId,label,inputType},ref)=>{
    const inputRef = useRef();
    useImperativeHandle(ref,()=>{
        return {
            focus : activate
        }
    })
    const activate = ()=>{
        inputRef.current.focus();
    }
    return (
        <div
            className={`${classes.control} ${
                isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={inputId}>{label}</label>
            <input
                type={inputType}
                id={inputId}
                value={inputValue}
                onChange={onChange}
                onBlur={onBlur}
                ref={inputRef}
            />
        </div>
    );
})

export default Input;