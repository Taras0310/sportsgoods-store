import { Link } from 'react-router-dom'
import React, {useState} from 'react'
import Header from '../component/Header'
import '../component/profile.scss'
import { useAuth } from '../contexts/AuthContexts'
export default function Profile() {

  const [eror, setEror]=useState('')
  const {currentUser}=useAuth()
 
  return (
    <div>
      
      {(currentUser !==undefined || currentUser!==null)? 
           <>
                {eror && <div className="error-alert">{eror}</div>}
                <div className="content-profile">
                    <h1>Profile</h1>
                    <div className="user-info">
                        <strong>Email: </strong> {currentUser.email}
                        {/* <strong>Name: </strong> {currentUser.displayName}
                        <strong>Phone: </strong> {currentUser.phoneNumber} */}
                    </div>
                    <button ><Link to="/update"> Оновити профіль</Link></button>
                    {/* <div className="user-info">
                        
                        <strong>Name: </strong> {currentUser.displayName}

                    </div>
                    <div className="user-info">
                        
                        <strong>Phone: </strong> {currentUser.phoneNumber}

                    </div> */}

                </div>
          </>
        : <div></div>}
    </div>
  )
}
