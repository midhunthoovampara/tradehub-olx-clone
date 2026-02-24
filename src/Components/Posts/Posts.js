import React,{useState,useEffect,useContext} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { PostContext } from '../../store/PostContext';

function Posts() {
const {firebase} = useContext(FirebaseContext)
const [products,setProducts] = useState([])
const history = useHistory()
const {setPostDetails} = useContext(PostContext)


useEffect(()=>{
  firebase.firestore().collection('products').get().then((snapshot)=>{
     const allPost = snapshot.docs.map((products)=>{
        return{
          ...products.data(),
          id:products.id
        }
     })
      setProducts(allPost)
  })
  },[firebase])


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.map(products=>{
              return (
          <div
            className="card"
            key={products.id}
            onClick={(()=>{
              setPostDetails(products)
               history.push("/View")
            })}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={products.url} alt="product" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {products.Price}</p>
              <span className="kilometer">{products.category}</span>
              <p className="name"> {products.name}</p>
            </div>
            <div className="date">
              <span>{products.createdAt}</span>
            </div>
          </div>
              )
            })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="/Images/R15V3.jpg" alt="product" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
