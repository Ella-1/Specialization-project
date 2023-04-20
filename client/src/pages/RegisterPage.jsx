import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider, useFormContext } from "react-hook-form";


// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function RegisterPage() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();

    // function that handles submit for registeration
    async function registerUser(data) {


        // we want to send request to our api with our data
        try {
            await axios.post('/register', data);

            alert('Registeration Successful. Now you can login')
        } catch (e) {
            alert('Registration fail. Please try again latter')
        }


        navigate('/login')

    }


    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
                <h1 className="text-4xl text-center mb-4 ">Register</h1>
                <form
                    className="max-w-md mx-auto"
                    onSubmit={handleSubmit(registerUser)}

                    autoComplete="off"
                >
                    <div >
                        <label> Full Name:</label>
                        <input
                            placeholder="John Doe"
                            type="text"
                            {...register("name", { required: { value: true, message: 'full name is required' } })}
                        />
                        {errors.fullName && <span className="text-red-500 text-sm m-1">{errors.fullName?.message}</span>}</div>


                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            {...register("email", {
                                required: { value: true, message: 'email field is required' },
                                minLength: 3,

                            })}

                        />
                        {errors.email && <span className="text-red-500 text-sm m-1">{errors.email?.message}</span>}
                    </div>

                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            {...register("password")}

                        />
                        {errors.password && <span className="text-red-500 text-sm m-1">{errors.password?.message}</span>}
                    </div>

                    <div>
                        <label>Confirm Password:</label>
                        <input type="password"
                            placeholder=" Confirm Password"

                            {...register('confirmPassword', {
                                validate() {
                                    const confirmValue = getValues('confirmPassword');
                                    const password = getValues('password')

                                    return confirmValue === password
                                }
                            })}
                        />

                        {errors.confirmPassword && <span className="text-red-500 text-sm m-1">passwords don't match</span>}
                    </div>
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