import { Link } from "react-router-dom";
import { useState } from "react"; 
import axios from "axios";

function RegisterPage() {
    // handling state for input
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    // function that h andles submit for registeration
    async function registerUser (ev) {
        
        // to prevent default behaviour of reloading our page
        ev.preventDefault();
        
        // we want to send request to our api with our data
       try {
        await axios.post('/register', {
            name,
            email,
            password
           });
    
           alert('Registeration Successful. Now you can login')
       } catch (e) {
            alert('Registration fail. Please try again latter')
       }
       
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" 
                       placeholder="John Doe" 
                       value={name} 
                       onChange={ev => setName(ev.target.value)} />
                    <input type="email" 
                        placeholder="Your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}/>
                    <button className="bg-grey-300 w-full bg-primary text-white rounded-2xl">Register</button>
                    <div className="text-center py-2 text-grey-500">
                        Don't have an account yet? <Link className="underline" to={'/login'} >Login</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default RegisterPage;