import { getAuth } from 'firebase/auth'
import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import '../component/registration.scss'
import { useAuth } from '../contexts/AuthContexts'

export default function UpdateProfile() {
    const { signup, currentUser, admin, updateEmail, updatePassword } = useAuth()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    

    const navigate = useNavigate()
    
    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const passwordConfirmRef = useRef()
    // useEffect(() => {
    //     console.log(currentUser, 'currentUser');
    //     if (currentUser) {
    //         // updateUserProfile(currentUser, nameRef.current)
    //         currentUser.uid === admin ? navigate('/admin') : navigate('/')
    //     }
    // }, [currentUser])


        function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        setError("")
        if(passwordRef.current.value!==passwordConfirmRef.current.value){
            return setError('Паролі не співпадають!')
        }

        const promises = []

        if(emailRef.current.value!==currentUser.email){
            const email = updateEmail( currentUser, emailRef.current.value)
            promises.push(email)
        }
        
        if(passwordRef.current.value){
            
            const passowrd = updatePassword(currentUser, emailRef.current.value)
            
        }

        

        Promise.all(promises)
        .then(() => {
           navigate('/profile')
        })
        .catch(() => {
          setError("Failed to update account")
        })
        .finally(() => {
          setLoading(false)
        })
       
       
       
        // try{
        //     setError('')
        //     setLoading(true)
        //     await signup(emailRef.current.value, passwordRef.current.value)
        //     setLoading(false)

        // } catch(error){
        //     setError(error.message)
        //     setLoading(false)
        // }

        
    }
      
    return (
        <div className='sign'>
            <form autoComplete="off" className='form-group' onSubmit={handleSubmit}  >
                <h2>Update Profile</h2>
                {error && <div className="error-alert">{error}</div>}       
                <div className='field'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" className='form-control' ref={emailRef} required
                    defaultValue={currentUser.email} />
                </div>    
                <div className='field'>
                    <label htmlFor="passowrd"><strong>Password</strong></label>
                    <input type="password" className='form-control' ref={passwordRef}  placeholder='Leave blank to keep the same' />
                </div>
                <div className='field'>
                    <label htmlFor="confirm passowrd"><strong>Confirm password</strong></label>
                    <input type="password" className='form-control' ref={passwordConfirmRef}  placeholder='Leave blank to keep the same' />
                </div>            
                <button type="submit" className="btn">Update</button>
                <span>
                    <Link to="/profile">Cancel</Link>
                </span>
            </form>
        </div>
    )
}

