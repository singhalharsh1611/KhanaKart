import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import {Circles} from 'react-loader-spinner'
import axios from 'axios';

const Verify = () => {

  const [searchParams,setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const {url} = useContext(StoreContext);
  const navigate = useNavigate(); 

  const verifyPayment = async () => {
    const response = await axios.post(url+"/api/order/verify",{success,orderId});
    if(response.data.success) {
        navigate("/myorders");
    }
    else{
      navigate("/")
    }
  }

  useEffect(()=>{
    verifyPayment();
  },[])

  return (
    <div className='spinner'>
       <Circles
  height="80"
  width="80"
  color="tomato"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />

    </div>
  )
}

export default Verify
