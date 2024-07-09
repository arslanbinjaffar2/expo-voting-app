import React, { useState } from 'react';
import { Box, Center, Checkbox, Divider, HStack, Icon, Radio, Text, TextArea, View, VStack } from 'native-base';
// import Icowritecomment from 'application/assets/icons/small/Icowritecomment';
import { Question, FormData } from '../../../../models/survey/Detail';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomCheckbox from '../customs/Checkbox';

type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null,
  labels:any,
  forceRender:number,
}
const SingleAnswer = ({ question, formData, updateFormData, error, labels }: PropTypes) => {
  return (
    <View  width="100%" mb="0">
      <Box mb="3" py="3" px="4" width={'100%'} >
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{Number(question?.required_question) === 1 && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.value}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        {/* <Radio.Group space="4" defaultValue={formData[question.id]?.answer !== null && formData[question.id]?.answer.length > 0 ?  `${formData[question.id]?.answer[0]}` : ``} name="MyRadioGroup" 
         onChange={answer_id => {updateFormData(question.id, question.question_type, answer_id);}}>
          {question.answer.map((answer, k) =>
            <Radio  key={k}  value={`${answer.id}`}> {answer.answer} </Radio>
          )}
        </Radio.Group> */}
        <MyRadioGroup formData={formData} question={question} updateFormData={updateFormData}/>
      </Box>
      {error && <Box  mb="3" py="3" px="4" backgroundColor="red.100" w="100%">
              <Text color="red.900"> {error} </Text>
      </Box>}
      {Number(question.enable_comments) === 1 &&
        <>
          <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
            {/* <Icowritecomment width="15px" height="18px" /> */}
            <Text fontSize="lg">{labels?.GENERAL_YOUR_COMMENT}</Text>
          </HStack>
          <Box py="3" px="4" w="100%">
            <TextArea
              p="3"
              mb={1}
              h="100px"
              bg={'primary.darkbox'}
              defaultValue={formData[question.id]?.comment !== null ? formData[question.id]?.comment : ``}
              onChangeText={(text) => updateFormData(question.id, 'comment', text)}
              borderWidth="0" fontSize="md" placeholder={labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
              <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `510 ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
          </Box>
        </>
      }
    </View>
  )
}

export default SingleAnswer





// Skipped existing code for brevity

const MyRadioGroup = ({ formData, question, updateFormData }:any) => {
  return (
    <div className="verificationArea" style={{ display:'flex',alignItems:"flex-start",flexDirection:'column',gap:'10px',width:"100%" }}>
      {question.answer.map((answer:any, k:any) => (
        <CustomCheckbox  onChange={() => updateFormData(question.id, question.question_type, answer.id)}
        key={k}
          type="radio"
          htmlFor={`singleanswer${answer.id}`}
          id={`singleanswer${answer.id}`}
          name='singleanswer'
          text={answer.answer}
          
          />
        // <div className="formRow" style={{ display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%" }}>
        // <label className="label" htmlFor={`singleanswer${answer.id}`}>{answer.answer}</label>
        // <input
        //   key={k}
        //   type="radio"
        //   checked={answer.id}
        //   id={`singleanswer${answer.id}`}
        //   name='singleanswer'
        //   onChange={() => updateFormData(question.id, question.question_type, answer.id)}
        //   style={{ height: 56,width:56, borderColor: '#ddd', borderWidth: 1, borderRadius: 5, backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }}
        //   />
        //   </div>
      ))}
    </div>
  );
};

