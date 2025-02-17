import { useEffect, useState } from "react";
import Input from '../Input';
import s from './style.module.css';

const LoginForm = ({ onSubmit, isResetField = false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setLogin] = useState(true);

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, [isResetField]);

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit && onSubmit({
            type: isLogin ? 'login' : 'signup',
            email,
            password
        })
        setEmail('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input 
                label="Email" 
                value={email}
                name="email"
                onChange={setEmail}
            />
            <Input 
                label="Password" 
                value={password}
                type="password"
                name="password"
                onChange={setPassword}
            />
            <div className={s.flex}>
                <button>
                { isLogin ? 'Login' : 'SignUp' }
                </button>
                <div 
                    className={s.link}
                    onClick={() => setLogin(!isLogin)}
                >
                    { isLogin ? 'Register' : 'Login' }
                </div>
            </div>
        </form>
    );
};

export default LoginForm;