import React, { useEffect, useState } from 'react';
import {arrowRightIcon,chevronIcon,crossIcon,logoIcon,nemIcon,successIcon} from '../../../assets/img/index'
import useAuthServices from '../../../redux/store/services/useAuthServices';
import {useNavigate} from 'react-router-dom'
import Verification from '../Verification';
import VoteView from '../VoteView';
import { Input } from '@rneui/base';

const ViewPoint = () => {
  const navigate=useNavigate()
  const [step, setStep] = useState(1);
  const [screen, setScreen] = useState(1);
  const [vote, setVote] = useState('');
  const handlePress = (item:any) => {
    setStep(item);
  };

  const handleVote = (voted:any) => {
    setVote(voted);
    setScreen(2);
  };
  const event_url="annual-convocation-3961"
//   const { FetchEvent, event } = useEventServices()
//   const {  _env } = UseEnvServices()
//   useEffect(() => {
//     if (event_url !== undefined && _env.api_base_url) {
//         FetchEvent(event_url)
//     }
//   }, [FetchEvent, event_url, _env.api_base_url])
  
  return (
    <React.Fragment>
      {screen === 1 && (
        <div className="viewpoint">
          <div className="leftContainer">
            <img className="viewpointLogo" alt="" src={logoIcon}/>
            <h2 className="heading">ELECTION OK21</h2>
            {/* <button className="button" onClick={()=>navigate('/login')}>
              <span style={{fontSize: '15px', color: '#fff', marginRight: 6,fontWeight: '400'}}>Vote with</span>
              <img style={{width: '56px', height: '12px'}} alt="" src={nemIcon} />
            </button> */}
            <p>Should you experience any problem voting, please contact out hotline via email?</p>
            <p>Should you experience any problem voting, please contact out hotline via email: <a href="mailto:abc@abc.com">abc@abc.com</a> or via telephone: 4697-3676. Our hotline is open on working days between 8.30 am to 4.00 pm. </p>
          </div>
          <div className="rightContainer">
              <LoginForm click={() => handlePress(1)} />
          </div>
        </div>
      )}
  

    </React.Fragment>
  );
};

export default ViewPoint;










function LoginForm({props}:any){

  const {login,response}=useAuthServices()
   const [formData,setFormData]=useState({email:"",password:""})

  return (
    <div className="verificationArea">
      <h4>Type your Email and password </h4>
      <div className="formRow" style={{ position: 'relative', zIndex: 99 }}>
        <div className="label">Login</div>
        <input
          type="text"
          className="input"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setFormData({...formData,email:e.target.value})}
          style={{ height: 56, borderColor: '#ddd', borderWidth: 1, borderRadius: 5, backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }}
        />
        {/* <div className="infoBox">Type your date of birth as dd/mm/yy, eg .01/01/90</div> */}
      </div>
      <div className="formRow">
        <div className="label">Password</div>
        <input
          type="text"
          className="input"
          placeholder="Password"
          value={formData.password}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setFormData({...formData,password:e.target.value})}
          style={{ height: 56, borderColor: '#ddd', borderWidth: 1, borderRadius: 5, backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }}
        />
        {/* <div className="infoBox">Type your election code sent to you by message or email</div> */}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="button" onClick={() => login(formData)}>
          <span style={{ fontSize: '15px', color: '#fff', marginRight: 10, fontWeight: '700' }}>Login</span>
          <img style={{ width: '16px', height: '10px' }} alt="" src={arrowRightIcon} />
        </button>
        
      </div>
    </div>
  );
};


