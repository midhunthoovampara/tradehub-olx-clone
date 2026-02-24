import React,{useEffect,useState,useContext} from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
function View() {
const [userDetails,setUserDetails] = useState()
const {postDetails} = useContext(PostContext)
const {firebase} = useContext(FirebaseContext)
useEffect(()=>{
  if(postDetails && postDetails.userId) {
    const {userId} = postDetails
    firebase.firestore().collection('user').where('id','==',userId).get().then((res)=>{
      res.forEach(doc => {
        setUserDetails(doc.data())
      });
    }).catch((error)=>{
      console.log('Error fetching user details:', error)
    })
  }
},[postDetails, firebase])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt="product"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.Price} </p>
          <span>{postDetails.category}</span>
          <p>{postDetails.name}</p>
          <span>{postDetails.createdAt}</span>
        </div>
       { userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
          <button className="contactBtn" onClick={() => alert('Chat functionality coming soon!')}>Chat with Seller</button>
        </div>}
      </div>
    </div>
  );
}
export default View;
