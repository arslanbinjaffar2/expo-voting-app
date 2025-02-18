import React, { useState } from 'react';
import { Box, Center, Checkbox, Divider, HStack, Text, TextArea, View, VStack } from 'native-base';
// import Icowritecomment from 'application/assets/icons/small/Icowritecomment';
import { Question, FormData } from '../../../../models/survey/Detail';
import CustomCheckbox from '../customs/RadioBox';
import MyRadioGroup from '../customs/RadioBox';
import MyCheckboxGroup from '../customs/CheckBox';

type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void
  error:string|null
  labels:any,
  forceRender:number,
}

const MultipleAnswer = ({ question, formData, updateFormData, error, labels }: PropTypes) => {
  const [text, setText] = useState('');
  const maxChars = 500;
  const handleChange = (text:string) => {
    if (text.length <= maxChars) {
      setText(text);
      updateFormData(question.id, 'comment', text)
    }
  };
  const remainingChars = maxChars - text.length;
  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="3"  width={'100%'}>
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{Number(question?.required_question) === 1 && <Text color="red.500">*</Text>} {question?.value}</Text>
        {/* <Divider mb="5" opacity={0.27} bg="primary.text" /> */}
        <VStack space="4">
        {/* <Checkbox.Group defaultValue={formData[question.id]?.answer !== null && formData[question.id]?.answer.length > 0 ? formData[question.id]?.answer : []} onChange={(answers) => { console.log(answers);  updateFormData(question.id, question.question_type, answers)}} aria-label={question?.value} >
          {question?.answer.map((answer, k) =>
            <Checkbox key={k} size="md" mb={3} width={40} height={40} value={`${answer.id}`}>{answer.answer}</Checkbox>
          )}
        </Checkbox.Group> */}
   
       <MyCheckboxGroup formData={formData} question={question} updateFormData={updateFormData}/>
         {/* <MyRadioGroup formData={formData} question={question} updateFormData={updateFormData}/> */}
        </VStack>
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
            bg={'primary.darkbox'}
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

export default MultipleAnswer