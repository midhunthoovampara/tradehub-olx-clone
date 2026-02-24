import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FirebaseContext,AuthContext } from '../../store/Context'; 

const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const history = useHistory()
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [Price,setPrice] = useState('')
  const [image,setImage] = useState('')
  const date = new Date()
  const handleSubmit = ()=>{
        firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
          ref.getDownloadURL().then((url)=>{
           firebase.firestore().collection('products').add({
            name,
            category,
            Price,
            url,
            userId:user.uid,
            createdAt:date.toDateString()
           })
           history.push("/")
          })
        })
  }
  return (
    <Fragment>
      <Header />
      <div className="createCard">
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e)=>setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number"
            onChange={(e)=>setPrice(e.target.value)}
             id="fname" name="Price" />
            <br />
          </form> 
          <br />
          <img alt="Product Preview" width="200px" height="200px" src={image ? URL.createObjectURL(image): ''}></img>
          
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
