import axios from "axios";

import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContex } from "../userContex";


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[redirect, setRedirect] = useState('');
    const {setUser} = useContext(UserContex);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
           const {data} = await axios.post('/login', {email,password});
           setUser(data) 
           alert('login successful')
            setRedirect(true);
        } catch {
            alert('Login fail')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
                <h1 className="text-4xl text-center mb-4" >Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email" 
                        placeholder="'Your@email.com" 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className="bg-grey-300 w-full bg-primary text-white rounded-2xl">Login</button>
                    <div className="text-center py-2 text-grey-500">
                        Already a member? <Link className="underline" to={'/register'} >Register</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default LoginPage;