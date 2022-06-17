import classes from "./Input.module.css"

const Input = ({isValid,onChange,onBlur,inputValue,inputId,label,inputType})=>{
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
            />
        </div>
    );
}

export default Input;