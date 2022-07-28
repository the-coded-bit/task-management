// login/signup option object
export const signinOptions = Object.freeze(
    {
        LOGIN : 'Log In',
        SIGNUP : 'Sign up'
    }
)
// login/signup options list 
export const optionsList = Object.freeze([signinOptions.LOGIN, signinOptions.SIGNUP]);

// signin fields constants
export const signinFields = Object.freeze({
    FULLNAME : 'fullname',
    EMAIL: 'email',
    PASSWORD: 'password'
})

// statuses
// for use while making requests to backend
export const STATUSES = Object.freeze({
    ERROR: 'error',
    LOADING: 'loading',
    SUCCESS: 'success',
    IDLE: 'idle'
});