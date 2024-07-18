import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import {UseEventService} from './application/redux/store/services/useEventServices';
import UseEnvServices from './application/redux/store/services/useEnvServices';
import { ToastContainer } from 'react-toastify';
import WebNavigation from './navigation/web/Navigator'
import  './assets/css/style.css';

import { ImageBackground, StyleSheet, View } from 'react-native';
import NativeBaseProvider from './navigation/routes/NativeBaseProvider';
import { Button, Modal, Text } from 'native-base';
export const Provider = () => {
    const { FetchEvent,event} = UseEventService()
    const {  _env } = UseEnvServices()
    const { updateEnv } = UseEnvServices()
    const currentUrl = window.location.href;
    const matchResult = currentUrl.match(/:(\d+)\/([^/]+)/);
    const eventId = matchResult ? matchResult[2] : null;
    const [InactiveModal,setInactiveModal]=useState(false)
    useEffect(() => {
    updateEnv({
      enviroment: "development",
      api_base_url: "https://apistage.eventbuizz.com/mobile",
      eventcenter_base_url: "https://stage.eventbuizz.com",
      socket_connection_server: "https://devsocket.eventbuizz.com:3000",
      app_api_url: "https://piy49faln0.execute-api.eu-west-1.amazonaws.com/Development",
      msw_enabled: '',
      api_gateway_url: "https://uut0ih5zqd.execute-api.eu-west-1.amazonaws.com/Development",
      app_server_enviornment: "development",
      app_registration_url: "https://registration.url.com"
    });
    }, [])
    useEffect(() => {
      if (eventId !== undefined && _env.api_base_url) {
          FetchEvent(eventId as string)
      }
      if(window.location.href==`http://localhost:19006/${event.url}`){
        window.location.replace(`http://localhost:19006/${event.url}/login`)
      }else if(window.location.href==`http://localhost:19006/`){
        window.location.replace(`http://localhost:19006/${event.url}`)
      }
    }, [FetchEvent, eventId, _env.api_base_url])
    const image = { uri: `${_env.eventcenter_base_url}/assets/event/app_background/${event?.settings?.app_background_image}`};
 
  return (
    <NativeBaseProvider>
      <ToastContainer/>
      <View style={styles.container}>
        <ImageBackground style={styles.banner} source={image}>
          <WebNavigation />
        </ImageBackground>
      </View>
      <InactivityDetector/>
    </NativeBaseProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
   banner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    resizeMode: "cover",
    backgroundColor: '#1D9FE4',
  }
});




function InactiveModalComponent({modalVisible,setModalVisible,timeLeft,setTimeLeft}:{setTimeLeft: React.Dispatch<React.SetStateAction<number>>,setModalVisible:React.Dispatch<SetStateAction<boolean>>,modalVisible:boolean,timeLeft:number}){
  const handleClick = () => {
    setTimeLeft(prev=>  prev + 5);
  };
  return(
    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} >
    <Modal.Content 
      maxWidth={'400'}
      width={['90%','100%']}
      nativeID='confirmModal'
    >
      <Modal.Header    borderBottomWidth={2} borderBottomColor={'rgba(173, 173, 173,0.3)'}  nativeID='confirmModal' flexDirection={'row'}
      justifyContent={'space-between'} alignItems={'center'}
      >
      <Text color='#1D9FE4' fontSize='28px'fontWeight="bold">Inactive for 2 minutes</Text>
      {/* <AntDesign name="close" size={24} color="#A39F9F" onPress={()=>setModalVisible(false)}/>  */}
        </Modal.Header>
      <Modal.Body  fontSize={'lg'} pb={'30px'}  nativeID='confirmModal'   maxHeight={'150px'} height={'100%'} justifyContent={'center'}
    alignItems={'flex-start'}
      >
        <Text color='#6E6E6E'fontSize="24px"fontWeight="medium">
       remaining time :
       <Text fontSize={'lg'} fontWeight={'bold'} color={'red.600'}>{timeLeft}</Text>
        </Text>
      </Modal.Body>
      <Modal.Footer borderTopWidth={0}  nativeID='confirmModal' maxHeight={100} height={'100%'}>
        <Button.Group space={1}  >
          <Button
           _text={{ color:'black' }}
           bg={'transparent'}
            borderWidth={0}
             rounded={'md'}
             borderColor={'white'}
              width={100}
              height={50}
             fontSize="md"
             _icon={{color: '#797979'}}
             _hover={{bg:'transparent',borderWidth:0,_text:{underline:true},_icon: {color: 'primary.hovercolor'}}}
          colorScheme="unstyled" onPress={() => {
          setModalVisible(false);
        }}>
            Cancel
          </Button>
          <Button 
            bg={'transparent'}
            _text={{ color:'black' }}
            borderWidth={1}
             rounded={'md'}
             borderColor={'black'}
              width={193}
              height={50}
             fontSize="md"
             _icon={{color: 'primary.text'}}
             _hover={{borderWidth:0,_icon: {color: 'primary.hovercolor'},_text:{color:"white"}}}
             colorScheme="primary"
          onPress={() => {
            handleClick()
        }}>
            Request for more time
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
  )
}




function InactivityDetector() {
  const [isInactive, setIsInactive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimeLimit =2 * 60 *1000; // 2 minutes in milliseconds

  // Function to be called when user is inactive
  const handleInactivity = () => {
    setIsInactive(true);
    console.log('User has been inactive for 2 minutes.');
    // Start countdown timer
    startCountdown();
  };

  // Reset the inactivity timer
  const resetInactivityTimeout = () => {
    clearTimeout(inactivityTimeoutRef.current as NodeJS.Timeout);
    inactivityTimeoutRef.current = setTimeout(() => {
      handleInactivity();
    }, inactivityTimeLimit);
    // setIsInactive(false);
    // Reset countdown timer if user becomes active
    setTimeLeft(60);
    clearInterval(countdownIntervalRef.current as NodeJS.Timeout);
  };

  // Start countdown timer
  const startCountdown = () => {
    countdownIntervalRef.current = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    }, 1000);
  };

  // Effect to manage countdown end
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(countdownIntervalRef.current as NodeJS.Timeout);
      // Add any action to perform when the countdown ends
      console.log('Countdown has ended.');
    }
  }, [timeLeft]);

  useEffect(() => {
    // Set up event listeners to detect user activity
    const events = ['mousemove', 'keydown', 'click'];

    const handleActivity = () => {
      resetInactivityTimeout();
    };

    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Initialize the inactivity timeout
    resetInactivityTimeout();

    // Cleanup event listeners and timeouts on component unmount
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      clearTimeout(inactivityTimeoutRef.current as NodeJS.Timeout);
      clearInterval(countdownIntervalRef.current as NodeJS.Timeout);
    };
  }, []);

  return (
    <>
      <InactiveModalComponent modalVisible={isInactive} setModalVisible={setIsInactive} timeLeft={timeLeft} setTimeLeft={setTimeLeft  }/>
      {!isInactive &&
        <>{console.log("User is active.")}</>
      }
    </>
  );
};

