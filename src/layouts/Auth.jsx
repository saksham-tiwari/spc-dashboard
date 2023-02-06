import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import "./styles.css"
import { login } from 'server/services/auth/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'server/redux/actions/user';
import { useHistory } from 'react-router';

function App() {
    const dispatch = useDispatch()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [emailErr,setEmailErr] = useState("");
    const [passErr,setPassErr] = useState("");
    const history = useHistory();
    const isUser = useSelector((state)=>state.user).isUser||localStorage.getItem("token")
    useEffect(()=>{
        if(isUser) history.push("/admin/dashboard")
    },[])
    const loginCall = ()=>{
        let c=0;
        if(!email.trim()) {
            setEmailErr("Cannot be empty");
            c++;
        } else setEmailErr("")
        if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setEmailErr("Enter valid email")
            c++;
        } else setEmailErr("")
        if(!password.trim()) {
            setPassErr("Enter your password");
            c++;
        } else setPassErr("")
        if(!c){
            login({email,password})
            .then(async(res) => {
                console.log(res);
                // dispatch(setLoading(false))
                localStorage.setItem("user", JSON.stringify(res.data))
                localStorage.setItem("token", res.data.token)
                await dispatch(setUser(true))
                history.push("/admin/dashboard")
            })
            .catch((err) => { 
                console.log(err);
                if(err.response.status===401) setPassErr("Incorrect Password!")
                if(err.response.status===404) setEmailErr("Invalid user! Create an account.")
                console.log(err);
                // dispatch(setLoading(false))
            })
        }
        
    }
  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#247F70' }}/>
                <span className="h1 fw-bold mb-0">&emsp;SPC CARE</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your admin account</h5>

                <MDBInput wrapperClass='mb-4' value={email} onChange={e=>setEmail(e.target.value)} label='Email address' id='formControlLg' type='email' size="lg"/>
                <p className='ErrorRed'>{emailErr}</p>
                <MDBInput wrapperClass='mb-4' value={password} onChange={e=>setPassword(e.target.value)} label='Password' id='formControlLg' type='password' size="lg"/>
                <p className='ErrorRed'>{passErr}</p>

              <MDBBtn onClick={loginCall} className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
              {/* <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div> */}

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default App;