import React, {useReducer, useState,useEffect,useContext,useRef} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state,action)=>{
  if (action.type==='EMAIL_INPUT'){
    return {value : action.val , isValid:action.val.includes('@')};
  }
  if (action.type==='EMAIL_BLUR'){
    return {value : state.value , isValid:state.value.includes('@')
    };
  }
  return {value : '' , isValid:false};
}

const passwordReducer = (state,action)=>{
  if (action.type==='PASS_INPUT'){
    return {value:action.val,isValid:action.val.trim().length > 6 };
  }
  if (action.type==='PASS_BLUR'){
    return {value:state.value,isValid:state.value.trim().length > 6 };
  }
  return{value:'',isValid:false};
}
const Login = () => {
  const ctx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState,dispatchEmail]=useReducer(emailReducer,
      {value:'',isValid:null}
  );
  const [passwordState,dispatchPassword]=useReducer(passwordReducer,
      {value:'',isValid:null}
  );
  // useEffect(() => {
  //   console.log('EFFECT RUNNING');
  //
  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);
  const {isValid : emailIsValid}=emailState;
  const {isValid : passIsValid}=passwordState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'EMAIL_INPUT', val:event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'PASS_INPUT',val:event.target.value})

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'EMAIL_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'PASS_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid){
      ctx.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
      emailRef.current.focus();
    }else {
      passRef.current.focus();
    }
  };
  const emailRef = useRef();
  const passRef = useRef();
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
            isValid={emailState.isValid}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            inputValue={emailState.value}
            inputId="email"
            label="E-mail"
            inputType="email"
            ref={emailRef}
        />
        <Input
            isValid={passwordState.isValid}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            inputValue={passwordState.value}
            inputId="password"
            label="Password"
            inputType="password"
            ref={passRef}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
