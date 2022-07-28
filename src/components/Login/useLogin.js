import { useState } from "react";
import { signinOptions, signinFields } from "../../constants";
import { addUser, setRememberMe, setActiveUser, logInUser } from "../../utils/features/userSlice";
import { validateEmail, validatePassword } from "../../utils/validate";
import { useDispatch, useSelector } from "react-redux";


export const useLogin = () => {
    // dispatch function using useDispatch hook
    const dispatch = useDispatch();
    // state to maintain current selected auth option i.e. LogIn or Signup
    const [activeAuthOption, setactiveAuthOption] = useState(signinOptions.LOGIN);
    // state to maintain the password type initially it will be password
    const [passwordType, setPasswordType] = useState('password');
    // state to maintain full name
    const [fullName, setFullName] = useState('');
    // state to maintain email
    const [email, setemail] = useState('');
    // state to maintain password
    const [password, setPassword] = useState('');
    // state to maintain whether or not to show warnings 
    const [warning, setWarning] = useState({ show: false, error: '' });
    // state to maintain remember me state
    const [rememberMe, setRememberme] = useState(false);

    // handle when the use clicks on any auth option.
    const handleChangeAuthOption = (option) => {
        setactiveAuthOption(option)
        setPasswordType('password');
    }
    // handle changes for full name, email, password
    const handleChanges = (e, type) => {
        const input = e.target.value;
        switch (type) {
            case signinFields.FULLNAME:
                setFullName(input);
                break;
            case signinFields.EMAIL:
                console.log('email = ', input);
                setemail(input);
                if (!validateEmail(input)) {
                    setWarning({ show: true, error: 'invalid email' });
                }
                else {
                    setWarning({ show: false, error: '' });
                }
                break;
            case signinFields.PASSWORD:
                setPassword(input);
                if (!validatePassword(input)) {
                    setWarning({ show: true, error: 'password must be of minimum 8 characters' });
                }
                else {
                    setWarning({ show: false, error: '' });
                }

            default:
                break;
        }
    }

    // handle signin click
    const handleSignIn = () => {
        // call add user thunk to add user into database
        dispatch(addUser(fullName, email, password));
    }

    // handle login click
    const handleLogIn = () =>{
        // call sign in user function
        dispatch(logInUser(email, password));
    }

    // toggle password type
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    // toggle remember me
    const toggleCheckbox = () => {
        console.log(!rememberMe);
        dispatch(setRememberMe(!rememberMe));
        setRememberme(!rememberMe);
    }

    return {
        activeAuthOption,
        setactiveAuthOption,
        handleChangeAuthOption,
        passwordType,
        togglePassword,
        handleChanges,
        handleSignIn,
        toggleCheckbox,
        handleLogIn,
        email,
        password,
        fullName,
        warning
    }
}