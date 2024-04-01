import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link } from "react-router-dom";


const Register = () => {
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleRegister= e =>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const accepted = e.target.terms.checked
        console.log(email, password, accepted)
        //reset error
        setRegisterError('')
        setSuccess('')
        if(password.length < 6){
            setRegisterError('Password should be at least 6 or more characters')
            return
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('Your password should have at least one uppercase characters.')
            return
        }
        else if(!accepted){
            setRegisterError('Please accept our terms and conditions')
            return
        }      
        // Create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user)
            setSuccess('User Created Successfully')
        })
        .catch(error =>{
            console.error(error)
            setRegisterError(error.message)
        })
    }

    return (
        <div className="border">
            <div className="mx-auto md:w-1/2">
                <h2 className='text-3xl'>Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input type="email" name="email" id="1" className="input input-bordered mb-4 mt-4 w-3/4" placeholder="Your Email Address" required />
                    <br />
                    <input placeholder="Password" className="input input-bordered w-3/4"  type={showPassword? 'text': 'password'} 
                    name="password" id="2" required/> <span  onClick={()=> setShowPassword(!showPassword)} className="btn text-lg">{showPassword? <MdRemoveRedEye></MdRemoveRedEye> : <IoEyeOffSharp></IoEyeOffSharp>}</span>
                    <br />
                    <input type="checkbox" name="terms" id="4" />
                    <label htmlFor="terms">Accept our <Link><u className="text-blue-600">Tears amd conditions</u></Link> </label>
                    <input type="submit" value="Submit" className="btn mt-4 w-3/4" />
                    <p>Already have a Account, <Link to='/login' className="text-blue-600 underline">Login</Link> </p>
                </form>
                <div>
                    {
                        registerError && <p className="text-red-500">{registerError}</p>
                    }
                    {
                        success && <p className="text-green-400">{success}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Register;