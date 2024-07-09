import React, { Fragment, useEffect, useState } from 'react';
import {arrowRightIcon,chevronIcon,crossIcon,logoIcon,nemIcon,successIcon} from '../../../assets/img/index'
import useAuthServices from '../../../redux/store/services/useAuthServices';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import Verification from '../Verification';
import VoteView from '../VoteView';
import { Input } from '@rneui/base';
import in_array from 'in_array'
import UseLoadingService from '../../../redux/store/services/useLoadingServices';
import {DotLoader} from 'react-spinners'
import UseSurveyService from '../../../redux/store/services/useSurveyServices';

const ViewPoint = () => {


  
  return (
    <Fragment>
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
            
          </div>
        </div>
    </Fragment>
  );
};

export default ViewPoint;














  