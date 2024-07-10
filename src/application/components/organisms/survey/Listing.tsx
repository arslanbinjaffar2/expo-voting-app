import React, { Fragment, useEffect,  } from 'react';
import { Link } from "react-router-native";
import {arrowRightIcon,chevronIcon,crossIcon,logoIcon,nemIcon,successIcon} from '../../../../assets/img/index'
import UseSurveyService from '../../../redux/store/services/useSurveyServices';
import UseLoadingService from '../../../redux/store/services/useLoadingServices';
import SectionLoading from '../../atoms/SectionLoading';
import { Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
const ViewPoint = () => {


  
  return (
    <Fragment>
        <div className="viewpoint" style={{ overflow:'hidden',maxHeight:'550px' }}>
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
            <SurveyList/>
          </div>
        </div>
    </Fragment>
  );
};

export default ViewPoint;




  
function SurveyList(){
   const {FetchSurveys,surveys}=UseSurveyService()
   const {loading}=UseLoadingService()
   useEffect(()=>{
    FetchSurveys()
   },[])
 
    return(
      <>

{loading ? (
                <SectionLoading />
            ) : (

              <>
      <Text fontSize={'20px'} fontWeight={"bold"} textAlign={'left'}>Surveys</Text>
      <Text fontSize={'sm'} fontWeight={'normal'} textAlign={'left'} mb={'4'} mt={2} lineHeight={'1.3em'}>
       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. </Text>
      <div className='survey_list_container' style={{ overflow:'auto' }}>
      {surveys.map(({info,id})=>{
        return(
          <>
            <Link to={`${id}`} key={id}>
                <div className='survey_list_item'>
                    <h4>{info.name ?? ""}</h4>
                    <span>
                    <AntDesign name="arrowright" size={20} color="white" />
                    </span>
                </div>
          </Link>
          
          </>
          )
        })}
      </div>
      
      </>
            )
      
    }
  </>
    )
  }