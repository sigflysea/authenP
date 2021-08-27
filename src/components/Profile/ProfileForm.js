import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-contex';

const ProfileForm = () => {
    const enteredPass = useRef();
    const authCxt = useContext(AuthContext);
    const history = useHistory();
    const submitHandler = (event) => {
        event.preventDefault();
        const newPassword = enteredPass.current.value;
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDiXyDfYkq5S60F3QIurBrngD8ltOHOklQ',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCxt.token,
                    password: newPassword,
                    returnSecureToken: false,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((res) => {
                history.replace('/');
            })
            .then((data) => {
                console.log(data);
            });
    };

    return (
        <form
            className={classes.form}
            onSubmit={submitHandler}
        >
            <div className={classes.control}>
                <label htmlFor='new-password'>
                    New Password
                </label>
                <input
                    type='password'
                    id='new-password'
                    minLength='7'
                    ref={enteredPass}
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;
