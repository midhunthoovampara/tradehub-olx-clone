import React, { useState,useContext } from 'react';

import { useHistory } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
  const history = useHistory()
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [error, setError] = useState('')
  const {firebase} = useContext(FirebaseContext)

  
  const handleSumbit = (e)=>{
    e.preventDefault()
    setError('')
    
    
    if (!username || username.length < 3) {
      setError('Username must be at least 3 characters long')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    if (!phone || phone.length !== 10) {
      setError('Phone number must be exactly 10 digits')
      return
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('user').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          history.push("/login")
        })
      })
    }).catch((err) => {
      setError(err.message)
    })

  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSumbit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value = {username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value = {email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value = {phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value = {password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <a onClick={()=> history.push('/Login')}>Login</a>
      </div>
    </div>
  );
}
