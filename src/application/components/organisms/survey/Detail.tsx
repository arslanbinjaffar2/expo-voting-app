import React, { Fragment, useEffect, useState } from 'react';
import { logoIcon, nemIcon,successIcon } from '../../../../assets/img/index';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, Pressable, Image, Spinner, View, Modal } from 'native-base'
import UseSurveyService from '../../../redux/store/services/useSurveyServices';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import {UseEventService} from '../../../redux/store/services/useEventServices';
import UseLoadingService from '../../../redux/store/services/useLoadingServices';
import UseEnvService from '../../../redux/store/services/useEnvServices';
import UseAuthService from '../../../redux/store/services/useAuthServices';
import { FormData } from '../../../models/survey/Detail';
import { SubmittedQuestion } from '../../../models/survey/Survey';
import MatrixAnswer from '../../atoms/surveys/questions/MatrixAnswer';
import MultipleAnswer from '../../atoms/surveys/questions/MultipleAnswer';
import SingleAnswer from '../../atoms/surveys/questions/SingleAnswer';
import DropdownAnswer from '../../atoms/surveys/questions/DropdownAnswer';
import OpenQuestionAnswer from '../../atoms/surveys/questions/OpenQuestionAnswer';
import NumberAnswer from '../../atoms/surveys/questions/NumberAnswer';
import WordCloudAnswer from '../../atoms/surveys/questions/WordCloudAnswer';
import SectionLoading from '../../atoms/SectionLoading';

const SurveyId = () => {


  return (
    <Fragment>
      <div className="viewpoint">
        <div className="leftContainer">
          <img className="viewpointLogo" alt="" src={logoIcon} />
          <h2 className="heading">ELECTION OK21</h2>
          <p>Should you experience any problem voting, please contact our hotline via email?</p>
          <p>Should you experience any problem voting, please contact our hotline via email: <a href="mailto:abc@abc.com">abc@abc.com</a> or via telephone: 4697-3676. Our hotline is open on working days between 8.30 am to 4.00 pm.</p>
        </div>
        <div className="rightContainer">
          <SurveyDetail />
        </div>
      </div>
    </Fragment>
  );
}

export default SurveyId;
const SessionTimer = React.memo(() => {
  const [timeLeft, setTimeLeft] = useState<number>(59);
  const navigate= useNavigate();
  const {event} = UseEventService();
  const { survey_labels } = UseSurveyService();
  const handleRequestTime=()=>{
    setTimeLeft((prev:any)=>prev+5)
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft:any) => prevTimeLeft - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onEnd(); // Trigger the function when countdown ends
    }
  }, [timeLeft]);

  const onEnd = () => {
    // window.open(`https://www.hk.dk/omhk/sektor/kommunal/ok21`, '_blank');
    navigate(`/${event.url}/survey`)
  }

  return (
    <>
    <View bg={'#00000040'} width={'70%'} flexDirection={'row'} ml={'auto'} height={60} rounded={'md'} justifyContent={'center'} alignItems={'center'}>
              <Text fontSize={'md'} >Your session will expires in </Text>
              <Text fontSize={'lg'} fontWeight={'bold'} mx={2}>
              {timeLeft} 
              </Text>
              <Pressable onPress={()=>handleRequestTime()}>
                <Text fontSize={'lg'} fontWeight={'bold'} underline>Request more time</Text>
                </Pressable>
            </View>
    </>
  );
});



function SurveyDetail (){
  const {id} = useParams();
  const navigate=useNavigate()
  const {loading}=UseLoadingService()
  const [forceUpdate, setForceUpdate] = useState<number>(0);
  const [showModal,setShowModal]=useState(false)
  const [steps, setsteps] = useState<number>(0);

  const [completed, setcompleted] = useState<boolean>(false);

  const [submittingSurvey, setSubmittingSurvey] = useState(false);


  const { _env } = UseEnvService();

  const { event} = UseEventService();

  const { response  } = UseAuthService();


  const { FetchSurveyDetail, detail, survey_labels, submitSuccess, SubmitSurvey } = UseSurveyService();

  const [formData, setFormData] = useState<FormData>({});

  const [activeQuestionError, setActiveQuestionError] = useState<string | null>(null);

  const updateFormData = (question_id:number, type:string, answer:any, index?:number) => {
    setActiveQuestionError(null);
    let newFormData = formData;
    if(newFormData[question_id] === undefined){
      newFormData[question_id] = {
        answer:null,
        comment:""
      };
    }
    if(type === 'multiple'){
          newFormData[question_id].answer = answer      
    }
    else if(type === 'single'){
      newFormData[question_id].answer = [answer]
    }
    else if(type === 'dropdown'){
      newFormData[question_id].answer = [answer]
    }
    else if(type === 'world_cloud'){
      if(newFormData[question_id].answer === null){
        newFormData[question_id].answer = {}
      }
      newFormData[question_id].answer[index!] = answer
    }
    else if(type === 'matrix'){
      if(newFormData[question_id].answer === null){
        newFormData[question_id].answer = {}
      }
      newFormData[question_id].answer[index!] = answer
    }
    else if(type === 'comment'){
      newFormData[question_id].comment = answer
    }
    else{
      newFormData[question_id].answer = answer
    }
    console.log(newFormData)
    setFormData(newFormData);
    setForceUpdate(forceUpdate + 1);
  }


    React.useEffect(() => {
        if (id) {
          FetchSurveyDetail({ id: Number(id) });
        }
    }, [id]);

    React.useEffect(() => {
      console.log(submitSuccess, 'useEffect');
        setcompleted(submitSuccess);
    }, [submitSuccess]);

    const stepIndicatorWidth = detail !== null ? 100/(detail.questions.length) : 10;

    const setNextStep = () => {
        setActiveQuestionError(null);
        const activeQuestion = detail?.questions[steps];
        if(Number(activeQuestion?.required_question) === 1 || (formData[activeQuestion?.id!] !== undefined &&  formData[activeQuestion?.id!].answer !== null)){
          if(activeQuestion?.question_type === 'multiple'){
              if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || (Number(activeQuestion?.required_question) === 1 && formData[activeQuestion?.id!].answer.length <= 0)){
                // setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
                return;
              }
              else if(activeQuestion.min_options > 0 && (formData[activeQuestion?.id!].answer.length < activeQuestion.min_options) && formData[activeQuestion?.id!].answer.length != 0){
                // setActiveQuestionError(survey_labels.POLL_SURVEY_MIN_SELECTION_ERROR
                //   .replace(/%q/g, activeQuestion.value)
                //   .replace(/%s/g, activeQuestion.min_options.toString())
                // );
                return;
              }
              else if(activeQuestion.max_options > 0 && (formData[activeQuestion?.id!].answer.length > activeQuestion.max_options) && formData[activeQuestion?.id!].answer.length != 0){
                setActiveQuestionError(survey_labels.POLL_SURVEY_MAX_SELECTION_ERROR.replace(/%s/g, activeQuestion.max_options.toString()));
                return;
              }
            }
            else if(activeQuestion?.question_type === 'single') {
              if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer.length <= 0){
                // setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
                return;
              }
            }
            else if(activeQuestion?.question_type === 'dropdown') {
              if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer.length <= 0){
                // setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
                return;
              } 
            }
            else if(activeQuestion?.question_type === 'world_cloud') {
              if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || Object.keys(formData[activeQuestion?.id!].answer).length < activeQuestion.entries_per_participant){
                // setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
                return;
              } 
            }
            else if(activeQuestion?.question_type === 'matrix') {
              if(formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || Object.keys(formData[activeQuestion?.id!].answer).length < activeQuestion.answer.length){
                // setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
                return;
              } 
            }
            else{
              if(Number(activeQuestion?.required_question) === 1 && (formData[activeQuestion?.id!] === undefined || formData[activeQuestion?.id!]?.answer === null || formData[activeQuestion?.id!].answer === '')){
                // setActiveQuestionError(event.labels.REGISTRATION_FORM_FIELD_REQUIRED);
                return;
              }
            }
          
        }
        if(steps === (detail?.questions.length! - 1)){
          setShowModal(true)
        }else{
          setsteps(steps + 1);
        }
        
    }

    const onSubmit = ( ) => {
      setSubmittingSurvey(true)
        const submitedData:SubmittedQuestion[] | undefined = detail?.questions.map((q)=>{
            let answeredQuestion:any = {
              id:q.id,
              type:q.question_type,
              required:q.required_question,
              is_anonymous:q.is_anonymous,
              comment:formData[q.id] !== undefined ? formData[q.id]?.comment : '',
            }
            if(q.question_type === 'single' || q.question_type === 'multiple' || q.question_type === 'dropdown' || q.question_type === 'matrix'){
              answeredQuestion['original_answers']= q.answer.map((answer)=>({id:answer.id, correct:answer.correct}));
              if(q.question_type === 'single'){
                answeredQuestion['answers'] = (formData[q.id] !== undefined && formData[q.id].answer.length > 0) ? [{id: formData[q.id].answer[0]}] : []
              }
              else if(q.question_type === 'dropdown'){
                answeredQuestion['answers'] = (formData[q.id] !== undefined && formData[q.id].answer.length > 0) ? [{id: formData[q.id].answer[0]}] : []
              }
              else if(q.question_type === 'multiple'){
                answeredQuestion['answers'] = (formData[q.id] !== undefined && formData[q.id].answer.length > 0) ? formData[q.id].answer.map((i:number)=>({id:i})) : [];
              }
              else if(q.question_type === 'matrix'){
                answeredQuestion['answers'] = (formData[q.id] !== undefined && Object.keys(formData[q.id].answer).length > 0) ? Object.keys(formData[q.id].answer).reduce((ack:any, i)=>([...ack, {id: `${i}_${formData[q.id].answer[i]}`}]), []) : [];
              }
            }
            else{
              if(q.question_type === 'world_cloud'){
                answeredQuestion['answers'] = (formData[q.id] !== undefined && Object.keys(formData[q.id].answer).length > 0) ? Object.keys(formData[q.id].answer).reduce((ack:any, v, i)=>([...ack, {value: formData[q.id].answer[Object.keys(formData[q.id].answer).length - (i + 1)]}]), []) : [];
              }
              else{
                answeredQuestion['answers'] = [{value:(formData[q.id] !== undefined && formData[q.id].answer !== null) ? formData[q.id].answer : ''}]
              }
            }
            return answeredQuestion;

        });

        const postData = {
          survey_id: parseInt(id!),
          event_id: event.id!,
          attendee_id: response.data.user.id,
          base_url: _env.api_base_url,
          organizer_id: event.organizer_id!,
          create_date: new Date().toLocaleDateString(),
          env: _env.app_server_enviornment,
          submitted_questions:submitedData!
        };
        
        SubmitSurvey(postData);

    }

    const [canSubmitMultipleTimes,setCanSubmitMultipleTimes]=useState<boolean>(false);
    useEffect(()=>{
      if(detail?.questions.length! > 0){
        const mutipleCloudQuestions = detail?.questions.filter((question) => question.question_type === 'world_cloud' && question.is_participants_multiple_times === 1);
        setCanSubmitMultipleTimes(mutipleCloudQuestions && mutipleCloudQuestions?.length > 0 ? true : false);
      }
    },[detail])

    function resetForSubmitAgain(){
      setFormData({})
      if (id) {
        FetchSurveyDetail({ id: Number(id) });
      }
      setcompleted(false)
      setSubmittingSurvey(false)
      setsteps(0)
    }
return(

<>

              {loading ? (
                  <SectionLoading />
              ) : (
                <>
                <Container mb="3" maxW="100%" w="100%">
               <SessionTimer/>
                  
                  {/* <Button onPress={()=>navigate(`/${event.name}/survey`)}>Back</Button> */}
                <Text mb={1} textBreakStrategy='simple' w={'100%'} textAlign={'center'} fontSize="2xl" color={'primary.text'} fontWeight={'bold'}>{detail?.info.name}</Text>
              {/* {detail?.questions.length! > 0 && <div >
                { detail?.questions.map((item, key)=>(
                    <Box key={key} bg={steps >= key ? 'secondary.500' : 'transparent'} h="22px" w={`${stepIndicatorWidth}%`} />
                ))}
              </div>} */}
              {!completed && <Box maxW="100%" w="100%">
                {detail?.questions.length! > 0 &&  detail?.questions[steps] !== undefined && (
                  <View width={'100%'}>
                    {detail?.questions[steps].question_type === 'matrix' && <MatrixAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}   />}
                    {detail?.questions[steps].question_type === 'multiple' && <MultipleAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}   />}
                    {detail?.questions[steps].question_type === 'single' && <SingleAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}   />}
                    {detail?.questions[steps].question_type === 'dropdown' && <DropdownAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError}labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}   />}
                    {detail?.questions[steps].question_type === 'open' && <OpenQuestionAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}   />}
                    {detail?.questions[steps].question_type === 'number' && <NumberAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate}key={detail?.questions[steps].id}  />}
                    {/* {detail?.questions[steps].question_type === 'date' && <DateAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}  />} */}
                    {/* {detail?.questions[steps].question_type === 'date_time' && <DateTimeAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}  />} */}
                    {detail?.questions[steps].question_type === 'world_cloud' && <WordCloudAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} error={activeQuestionError} labels={event?.labels} forceRender={forceUpdate} key={detail?.questions[steps].id}  />}
                  </View>
                )}
                {detail?.questions.length! <= 0 &&
                  <Box padding={5}>
                      <Text>{survey_labels?.NO_SURVEY_AVAILABL}</Text>
                  </Box>
                }
                <Box py="0" px="4" w="100%">
                  <Divider mb="15" opacity={0.27} bg="primary.text" />
                  <HStack mb="3" space="3" alignItems="center">
                    {steps > 0 && <Button
                      isDisabled={steps <= 0 ? true : false}
                      p="4"
                      fontSize="lg"
                      leftIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                      _icon={{color: 'primary.text'}}
                      _hover={{_text: {color: 'primary.hovercolor'},_icon: {color: 'primary.hovercolor'}}}
                      colorScheme="primary"
                      onPress={() => {
                        setActiveQuestionError(null);
                        setsteps(steps - 1);
                      }}
                    >
                      {survey_labels?.POLL_SURVEY_PREVIOUS}
                    </Button>}
                    <Spacer />
                     <Button
                      p="4"
                      fontSize="lg"
                      rightIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color={'primary.text'} />}
                      _icon={{color: 'primary.text'}}
                      _hover={{_text: {color: 'primary.hovercolor'},_icon: {color: 'primary.hovercolor'}}}
                      colorScheme="primary"
                      onPress={() => {
                        setNextStep();
                      }}
                    >
                      {survey_labels?.POLL_SURVEY_NEXT}
                    </Button>
                  </HStack>
                  {/* {steps === (detail?.questions.length! - 1) &&  */}
                  <Box w="100%" mb="6" alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'}>
                      {/* <Button
                          bg={'transparent'}
                          onPress={() => 
                          resetForSubmitAgain()
                        }
                        w={227}  h={50}
                          >
                          Cancel
                            
                          </Button> */}
                      {/* <Button
                          onPress={() => 
                          setNextStep()
                        }
                        w={227}  h={50}
                          >
                       
                           Submit
                          </Button> */}
                          <ConfirmModal 
                          submittingSurvey={submittingSurvey}
                          modalVisible={showModal} setModalVisible={setShowModal} handleSubmit={onSubmit} resetForSubmitAgain={resetForSubmitAgain}/>
                  </Box>
                  
                    {/* }  */}
                </Box>
              </Box>}
              {completed === true && (
                <Box borderWidth="0" borderColor="primary.bdBox" w="100%" bg="primary.box" p="5" py="8" rounded="10px">
                <VStack alignItems="center" space="5">
                  {/* <Box nativeID='bg-circle-animation' bg="primary.500" w="67px" h="67px" borderWidth="1" borderColor="primary.bordercolor" rounded="100%" alignItems="center" justifyContent="center">
                    <IcoTick />
                  </Box> */}
                  {/* <Text fontSize="lg">{survey_labels?.SURVEY_ANSWER_SUBMITTED_SUCCESFULLY}</Text> */}
                  {canSubmitMultipleTimes ? (
                    <Button
                    id='test'
                    minW="100px"
                    py="3"
                    px="3"
                    isLoading={false}
                    color={'primary.hover'}
                    colorScheme="primary"
                    onPress={()=>{
                      resetForSubmitAgain()
                    }}
                    
                  >
                    {survey_labels?.WORD_CLOUD_SUBMIT_AGAIN}
                  </Button>
                  ):(
                    <>
                    <CountdownTimer />
                    </>
                  )}
                </VStack>
              </Box>
              )}
              </Container>
              </>
              )}
</>
)
}



const CountdownTimer = React.memo(() => {
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const navigate= useNavigate();
  const {event} = UseEventService();
  const { survey_labels } = UseSurveyService();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft:any) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onEnd(); // Trigger the function when countdown ends
    }
  }, [timeLeft]);

  const onEnd = () => {
    window.open(`https://www.hk.dk/omhk/sektor/kommunal/ok21`, '_blank');
    navigate(`/${event.name}/survey`)
  }

  return (
    <>
      {timeLeft > 0 ? (
    <div className="eb-thankyou">
          <img  alt="" src={successIcon} />
          <h3>Thank you for the Vote</h3>
          <p>You will be Redirected to <a href="https://www.hk.dk/omhk/sektor/kommunal/ok21">https://www.hk.dk/omhk/sektor/kommunal/ok21</a> in {timeLeft > 0 && timeLeft} seconds</p>
        </div>
        // <p >{survey_labels?.POLL_SURVEY_REDIRECT_MSG} {timeLeft}</p>
      ) : (
        <>
        {/* <SectionLoading /> */}
        </>
      )}
    </>
  );
});

const ConfirmModal=({modalVisible,setModalVisible,handleSubmit,resetForSubmitAgain,submittingSurvey}:{submittingSurvey:boolean, resetForSubmitAgain(): void,handleSubmit:() => void,modalVisible: boolean,setModalVisible: React.Dispatch<React.SetStateAction<boolean>>})=>{
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return(
    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef} 
    
    >
    <Modal.Content width={ 622}
    >
      <Modal.CloseButton />
      <Modal.Header fontSize={'3xl'} fontWeight={'bold'} borderWidth={0}>Confirm Vote</Modal.Header>
      <Modal.Body borderWidth={0}>
       Are you sure?
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={() => {
          setModalVisible(false);
        }}>
            Cancel
          </Button>
          <Button onPress={() => {
            if(!submittingSurvey){
              handleSubmit()
              setModalVisible(false);
            }
        }}>
           {submittingSurvey?"loading...":"Confirm Vote"}
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
  )
}
