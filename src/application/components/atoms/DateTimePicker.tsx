import React, { ReactElement, FC, useRef, useEffect } from 'react';
import { Box, Button, Center, Checkbox, Divider, HStack, Icon, IconButton, Input, Radio, Text, TextArea, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
// import Icocross from 'application/assets/icons/Icocross';

type Props = {
  value: any;
  onChange: any;
  onBlur: any;
  placeholder: any;
  required: any;
  showtime: boolean;
  showdate: boolean;
  locale?: any;
  initialValue?: any;
  readOnly?:boolean
  showClearBtn?: boolean;
  setClearDate?: any;
}

const MyDTPicker: FC<any> = (props: Props): any => {

  const textInput = useRef<any | null>(null);
  
 
  const [tab, setTab] = React.useState('days');

  const renderView = (mode: any, renderDefault: any, showTime: any,showDate:any,) => {
    // Only for years, months and days view
    return (
      <div className="ebs-date-wrapper">
        {showTime && showDate && <HStack mb={3} space="2%" w="100%">
          
          <Button bg={tab !== "time" ? 'primary.500' : 'secondary.500'} w="48%" p="0">
            <label style={{width: '120px',padding: "10px 15px",boxSizing: 'border-box',textAlign: 'center'}}> <input style={{display: 'none'}} defaultChecked onChange={() => {textInput.current?.navigate('days');setTab('days')}} type="radio" name="calendar" />
              <Icon size="8" as={AntDesign} name="calendar" color="primary.text" />
              
            </label>
          </Button>
         <Button bg={tab === "time" ? 'primary.500' : 'secondary.500'}  w="48%" p="0">
          <label style={{width: '120px',padding: "10px 15px",boxSizing: 'border-box',textAlign: 'center'}} className='ebs-time'> <input style={{display: 'none'}}  onChange={() => {textInput.current?.navigate('time'); setTab('time')}} type="radio" name="calendar" />
            <Icon size="8" as={AntDesign} name="clockcircleo" color="primary.text" />
          </label>
          </Button>
        </HStack>}
        {renderDefault()}
      </div>
    );
  };

  const renderInput = (props: any) => {

    return (
      <Box fontFamily={'Avenir'} w="100%">
        <label className={`label-input ${props.timeOnly ? 'ebs-time-icon' : ''}`}>
          <Input
          nativeID='#textAreaNative'
          placeholderTextColor={'#6D6D6D'}
          h={50}
          opacity={props.disabled ? '0.5' : 1} 
          bg={'#fff'}
          color={'#000'}
          rightElement={
          <>
            <Icon mr="2" size="5" as={AntDesign} name="calendar" color="black" />
          </>
          } isReadOnly={true} {...props} placeholder={props.placeholder} />
          <span>{props.required && <em className="req">*</em>}</span>
        </label>
        {props?.showClearBtn && props?.value && (
              <IconButton
                position={'absolute'}
                right={'40px'}
                top={'19px'}
                p={0}
                variant="unstyled"
                // icon={<Icocross  width={12} height={12} />}
                onPress={props.setClearDate}
                
              />
             
            )}
      </Box>
    );
  }

  return <Datetime
  
  locale={props?.locale !== undefined ? props?.locale : 'en'} initialValue={props.initialValue}
  ref={textInput} renderView={(mode:any, renderDefault:any) => renderView(mode, renderDefault, props.showtime,props.showdate)} initialViewMode={props.showdate ? 'days' : 'time'} closeOnSelect={true} onChange={props.onChange} value={props.value} timeFormat={props.showtime} dateFormat={props.showdate} inputProps={{ placeholder: props.placeholder, required: props.required, disabled: props.readOnly }} renderInput={(inputProps: any) => renderInput({ ...inputProps, showClearBtn: props?.showClearBtn,setClearDate: props.setClearDate })} />;
};

type DateTimeProps = {
  label?: any;
  value?: any;
  showtime?: any;
  showdate?: any;
  onChange?: any;
  setClearDate?: any;
  required?: any;
  toDate?: any;
  fromDate?: any;
  locale?: any;
  initialValue?: any;
  readOnly?:boolean;
  showClearBtn?: boolean;
}

const DateTimePicker: FC<DateTimeProps> = (props): ReactElement => {
  return (
    <div style={{width: '100%'}} >
      <MyDTPicker locale={props?.locale !== undefined ? props?.locale : 'en'} readOnly={props.readOnly} initialValue={props.initialValue} onChange={props.onChange} value={props.value} showtime={props.showtime !== undefined ? props.showtime : false} showdate={props.showdate !== undefined ? props.showdate : true} placeholder={props.label} showClearBtn={props.showClearBtn} setClearDate={props.setClearDate} />
    </div>
  )
};

export default DateTimePicker;
