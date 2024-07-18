import React, { useState } from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, View, VStack } from 'native-base';
// import Icowritecomment from 'application/assets/icons/small/Icowritecomment';
import { Question, FormData } from '../../../../models/survey/Detail';
import { Platform } from 'react-native';
import UseSurveyService from '../../../../redux/store/services/useSurveyServices';

type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void,
  error:string|null,
  labels:any,
  forceRender:number,
}
const OpenQuestionAnswer = ({ question, formData, updateFormData, error, labels }: PropTypes) => {
  const [inputText, setInputText] = React.useState(formData[question.id]?.answer ?? '')
  const { survey_labels} = UseSurveyService();
 const [text,setText]=useState('')
 const maxChars=500
 const handleChange = (text:string) => {
    if (text.length <= maxChars) {
      setText(text);
      updateFormData(question.id, 'comment', text)
    }
    return ;
  };
  const remainingChars = maxChars - text.length;
  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box  py="3"   width={'100%'} >
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.value}</Text>
        {/* <Divider mb="5" opacity={0.27} bg="primary.text" /> */}
        <TextArea
        nativeID='textAreaNative'
         p="3"
         h="100px"
         // bg={'primary.darkbox'}
         bg={'white'}
        //  bg="primary.darkbox"
        w="100%" 
        color={'black'}
        placeholderTextColor={'#b0b0b0'}
        _focus={{ bg:'white' }}
        //  borderColor={'primary.darkbox'} 
         fontSize={'lg'} placeholder={survey_labels?.POLL_SURVEY_ANSWER} autoCompleteType={undefined} 
          value={inputText}
          onChangeText={(answer)=>{ 
            updateFormData(question.id, question.question_type, answer)
            setInputText(answer)
          }}
        />
        <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `510 ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
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
            placeholderTextColor={'#b0b0b0'}
            // bg={'primary.darkbox'}
            bg={'white'}
            color={'black'}
            _focus={{ bg:'white' }} 
            defaultValue={formData[question.id]?.comment !== null ? formData[question.id]?.comment : ``}
            onChangeText={(text) => updateFormData(question.id, 'comment', text)}
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

export default OpenQuestionAnswer