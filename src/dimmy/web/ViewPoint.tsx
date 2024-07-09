import React, { useCallback, useEffect, useState } from 'react';
import VoteView from './VoteView';
import Verification from './Verification';
// import logoIcon from '../../assets/img/logoIcon.svg';
// import nemIcon from '../../assets/img/nemIcon.svg';
// import crossIcon from '../../assets/img/crossIcon.svg';
// import successIcon from '../../assets/img/successIcon.svg';
import {logoIcon,crossIcon,successIcon,nemIcon} from '../../assets/img/index'
import {useNavigate} from 'react-router-dom'
import useTimerServices from '../../redux/store/services/useTimerServices';

const ViewPoint = () => {
  const navigate=useNavigate()
  const {RemainTime,setStartRemainTime,setStopRemainTime,setAddMoreRemainTime}=useTimerServices()
  const [step, setStep] = useState(1);
  const [screen, setScreen] = useState(4);
  const [vote, setVote] = useState('');
  const handlePress = (item:any) => {
    setStep(item);
  };

  const handleVote = (voted:any) => {
    setVote(voted);
    setScreen(2);
  };

 useEffect(() => {
  setStartRemainTime()
  return ()=>{
  setStopRemainTime()
  } 
 }, [])
 
  return (
    <React.Fragment>
      {screen === 1 && (
        <div className="viewpoint">
          <div className="leftContainer">
            <img className="viewpointlogoIcon" alt="" src={logoIcon}/>
            <h2 className="heading">ELECTION OK21</h2>
            <button className="button" onClick={()=>navigate('/login')}>
              <span style={{fontSize: '15px', color: '#fff', marginRight: 6,fontWeight: '400'}}>Vote with</span>
              <img style={{width: '56px', height: '12px'}} alt="" src={nemIcon} />
            </button>
            <p>Should you experience any problem voting, please contact out hotline via email?</p>
            <p>Should you experience any problem voting, please contact out hotline via email: <a href="mailto:abc@abc.com">abc@abc.com</a> or via telephone: 4697-3676. Our hotline is open on working days between 8.30 am to 4.00 pm. </p>
          </div>
          <div className="rightContainer">
            {step === 1 && 
              <Verification click={() => handlePress(1)} />
            }
            {step === 2 && 
              <VoteView vote={(voted:any) => handleVote(voted)} click={() => handlePress(2)} 
              />
            }
          </div>
        </div>
      )}
      {screen === 2 && (
        <div className="eb-confirmation-box">
          <header className="eb-header">
            <h3>Confirm Vote</h3>
            <span onClick={() => setScreen(1)} className="btnCancel"><img style={{width: '20px', height: '20px'}} alt="" src={crossIcon} /></span>
          </header>
          <div className="eb-databoxy">
            <div className="eb-question">OK21 - Kommunal</div>
            <div className="eb-voteBox">
              <span className="eb-check"><img src={crossIcon} alt="" /></span>
              {vote ? 'For' : 'Against' }
            </div>
          </div>
          <div className="buttonPanel">
            <span className="btnCancel"  onClick={() => setScreen(1)}>Cancel</span>
            <button onClick={() => setScreen(3)} className="button">
              <span style={{fontSize: '15px', color: '#fff', marginRight: 10,fontWeight: '700'}}>Confirm Vote</span>
            </button>
          </div>
        </div>
      )}
      {screen === 3 && (
        <div className="eb-thankyou">
          <img  alt="" src={successIcon} />
          <h3>Thank you for the Vote</h3>
          <p>You will be Redirected to <a href="https://www.hk.dk/omhk/sektor/kommunal/ok21">https://www.hk.dk/omhk/sektor/kommunal/ok21</a> in 5 seconds</p>
        </div>
      )}
      {screen === 4 && (
        <div className="eb-confirmation-box">
          <header className="eb-header">
            <h3>Your session will expire soon</h3>
            <span onClick={() => setScreen(1)} className="btnCancel"><img style={{width: '20px', height: '20px'}} alt="" src={crossIcon} /></span>
          </header>
          <div className="eb-databoxy">
            <div className="eb-expiretime">Your session will expires in <span id="timeExpire">0:{RemainTime}</span></div>
          </div>
          <div className="buttonPanel">
            <span className="btnCancel"  onClick={() => setScreen(1)} >Cancel</span>
            <button onClick={() => {
              setAddMoreRemainTime()
            }} className="button"
            
            >
              
              <span style={{fontSize: '15px', color: '#fff', marginRight: 10,fontWeight: '700'}}>Give me more time</span>
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ViewPoint;