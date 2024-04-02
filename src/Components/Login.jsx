import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
    const [error, setError]= useState()
    const [success, setSuccess]= useState()
    const emailRef = useRef(null)
    const handleLogin = e=>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password)
        setError('')
        setSuccess('')
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            if(result.user.emailVerified){
                console.log(result.user)
            setSuccess('Login Successful')
            return
            }
            else{
                setError('Kindly verified your email')
            }
        })
        .catch(error =>{
            console.error(error);
            setError(error.message)
        })
    }
    const handleResetPassword = () =>{
        const email =emailRef.current.value
        if(!email){
            
            console.log('Please provide an email', email);
            return
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            console.log('write an valid email')
            return
        }
        //send validation email
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert('Please check you email');
        })
        .catch(error =>{
            console.log(error.message)
        })
        

    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                            ref={emailRef}
                            name="email" 
                            type="email" 
                            placeholder="email" 
                            className="input input-bordered" 
                            required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div>
                            {
                                error && <p className="text-red-600">{error}</p>
                            }
                            {
                                success && <p className="text-green-600">{success}</p>
                            }
                        </div>
                        <p>New to the Website. Please <Link to='/register' className="text-blue-700 underline">Register</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;