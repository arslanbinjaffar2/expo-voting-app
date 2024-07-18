import React, { useState } from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack, Button, View } from 'native-base';
// import Icodocument from 'application/assets/icons/small/Icodocument';
import { Question, FormData } from '../../../../models/survey/Detail';
import {GENERAL_DATE_FORMAT, GENERAL_DATETIME_FORMAT, GENERAL_TIME_FORMAT} from '../../../utils/Globals'
import DateTimePicker from '../../../atoms/DateTimePicker';
import { Platform } from 'react-native';
import moment from 'moment';
type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null
  labels:any,
  forceRender:number,
}
const DateTimeAnswer = ({ question, formData, updateFormData, labels, error }: PropTypes) => {
  const [text, setText] = useState('');
  const maxChars = 500;
  const handleChange = (text:string) => {
    if (text.length <= maxChars) {
      setText(text);
      updateFormData(question.id, 'comment', text)
    }
    return ;
  };
  const remainingChars = maxChars - text.length;
  return (
    <Center position={'relative'} zIndex={9999} maxW="100%" w="100%" mb="0">
      <Box zIndex={9999} position={'relative'}  py="3"  w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.value}</Text>
        {/* <Divider mb="5" opacity={0.27} bg="primary.text" /> */}
        <DateTimePicker label={GENERAL_DATETIME_FORMAT} showtime={GENERAL_TIME_FORMAT} showdate={GENERAL_DATE_FORMAT} value={formData[question.id]?.answer ?? ''} onChange={(currentDate:any)=>{updateFormData(question.id, question.question_type, currentDate._isAMomentObject !== undefined && currentDate._isAMomentObject === true ? moment(currentDate).format(GENERAL_DATETIME_FORMAT) : '')}} />
      </Box>
      {error && <Box  mb="3" py="3" px="4" backgroundColor="red.100" w="100%">
              <Text color="red.900"> {error} </Text>
      </Box>}
      {Number(question.enable_comments) === 1 && 
      <>
      <Box pb="3"  w="100%">
         <TextArea
         nativeID='textAreaNative'
          p="3"
          mb={1}
          h="100px"
          // bg={'primary.darkbox'}
          bg={'white'}
          defaultValue={formData[question.id]?.comment !== null ? formData[question.id]?.comment : ``}
          onChangeText={(text) => handleChange(text)}
          borderWidth="0" fontSize="md" placeholder={labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
          <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Text color={'red.500'} fontSize="sm" fontWeight={'medium'}>{remainingChars<=0?"stop typing no more chacter left ":""}</Text>
            <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `${remainingChars} ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
            </View>
        </Box>
      </>
      }
    </Center>
  )
}


export default DateTimeAnswer