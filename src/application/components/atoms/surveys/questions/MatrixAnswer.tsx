import React, { forwardRef, useRef, useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { Box, Center, Checkbox, Divider, HStack, Icon, Input, Radio, ScrollView, Text, TextArea, View, VStack } from 'native-base';
// import Icowritecomment from 'application/assets/icons/small/Icowritecomment';
import { Question, FormData } from '../../../../models/survey/Detail';
import Ionicons from '@expo/vector-icons/Ionicons';
import MyCheckboxGroup from '../customs/CheckBox';
import MyRadioGroup from '../customs/RadioBox';
import MatrixRadioBox from '../customs/MatrixRadioBox';
import { userTextCount } from '../../../utils/useTextCounter';



type PropTypes = {
  question: Question,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void
    error:string|null
    labels:any,
    forceRender:number,
}
const MatrixAnswer = ({ question, formData, updateFormData, error, labels,forceRender }: PropTypes) => {
  const {width} = useWindowDimensions();
  const [matrix, setmatrix] = React.useState(false)
  const {remainingChars,handleChange}=userTextCount( {updateFormData,questinId:question.id,formData,})
  // const [text, setText] = useState('');
  // const handleScroll = (e: any) => {
  //   if (e.nativeEvent.contentOffset.x > 40) {
  //     setmatrix(true);
  //   } else {
  //     setmatrix(false);
  //   }
  // };
  // const maxChars = 500;
  // const handleChange = (text:string) => {
  //   if (text.length <= maxChars && text !== formData[question.id]?.comment) {
  //     setText(text);
  //     updateFormData(question.id, 'comment', text); // Assuming updateFormData does not trigger immediate state changes
  //   }
  // };
  // const remainingChars = maxChars - text.length;
  return (
    <Box maxW="100%" w="100%" mb="0" >
      <Box  pb="3"  width={"100%"} >
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.value}</Text>
        <>
                    {width > 725 && (
                    <ScrollView
                      // onScroll={handleScroll}
                      w={['100%']}
                      scrollEventThrottle={400}
                      maxW={'100%'}
                      pb="5"
                      showsHorizontalScrollIndicator={true}
                      overflowX={'auto'}
                       height={300}
                       paddingLeft={'20px'}
                      showsVerticalScrollIndicator={true}
                    >
                      <Box position="relative" w="100%" rounded="lg"  maxHeight={'550px'}
                      height={'100%'} overflow={'auto'}>
                        <HStack space="0" alignItems="center" pb="3">
                          <Center zIndex={9} position={Platform.OS === 'web' ? 'sticky' : 'absolute'} left={0} minW="150px" maxW="150px" flex="1" height="20px"></Center>
                          {question?.matrix.map((matrixItem, k) => (
                            <React.Fragment key={k}>
                              <Center minW="100px" flex="1">
                                <Text isTruncated fontSize="lg">{matrixItem.name}</Text>
                              </Center>
                            </React.Fragment>
                          ))}
                        </HStack>
                        <VStack w="100%" space="0" key={forceRender}>
                          {question?.answer.map((answer, k) => (
                            <HStack w="100%" key={k}  alignItems="center">
                              <Center bg={matrix ? 'primary.500' : ''}  py={2} zIndex={9} position={Platform.OS === 'web' ? 'sticky' : 'absolute'} alignItems="flex-start" left={0} minW="150px" maxW="150px" flex="1">
                                <Text fontSize="lg">{answer?.answer}</Text>
                              </Center>
                              {question.matrix.map((matrixItem, i) => (
                                <HStack minW="100px" py={2}   key={matrixItem.id} alignItems="center" flexDirection={'row'} justifyContent={'center'} >
                                  <input
                                  style={{ width:20,height:20 }}
                                    type="radio"
                                    id={`radio-${k}-${i}`}
                                    name={`group-${k}`}
                                    value={`${matrixItem.id}`}
                                    checked={formData[question.id]?.answer !== null && formData[question.id]?.answer[answer.id] === `${matrixItem.id}`}
                                    onChange={() => {
                                      updateFormData(question.id, question.question_type, `${matrixItem.id}`, answer.id);
                                    }}
                      />
                      {/* <label htmlFor={`radio-${k}-${i}`} style={{marginLeft:'10px', marginRight:'10px', color:'white',fontWeight:'normal' }}>{matrixItem.name}</label> */}
                    </HStack>
                  ))}
                </HStack>
              ))}
            </VStack>
          </Box>
        </ScrollView>
      )}
              {width < 725 && (
                <Box width={'100%'}  overflowY={'auto'} height={'500px'}>
                  {question?.answer.map((answer, k) => (
                    <React.Fragment key={k}>
                      {k > 0 && <Divider my="5" opacity={0.27} bg="primary.bordercolor" />}
                      <VStack borderWidth={0} alignItems="flex-start" justifyContent="flex-start" w="100%" space="0" key={forceRender}>
                        <VStack w="100%" key={k} space="1" alignItems="center" justifyContent="flex-start">
                          <Center mb={3} w={'100%'} alignItems="flex-start" left={0} justifyContent="flex-start">
                            <Text fontWeight="500" fontSize="lg">
                              {answer?.answer}
                            </Text>
                          </Center>
                          {question.matrix.map((matrixItem, i) => (
                            <Center  w={'100%'} justifyContent="flex-start" py={2} alignItems="center" flexDirection={'row'} key={matrixItem.id}>
                              <input
                              style={{ width:20,height:20 }}
                                type="radio"
                                id={`radio-${k}-${i}`}
                                name={`group-${k}`}
                                value={`${matrixItem.id}`}
                                checked={formData[question.id]?.answer !== null && formData[question.id]?.answer[answer.id] === `${matrixItem.id}`}
                                onChange={() => {
                                  updateFormData(question.id, question.question_type, `${matrixItem.id}`, answer.id);
                                }}
                              />
                              <label htmlFor={`radio-${k}-${i}`} style={{ color:'white',marginLeft:'10px' }}>{matrixItem.name}</label>
                            </Center>
                          ))}
                        </VStack>
                      </VStack>
                    </React.Fragment>
                  ))}
                </Box>
              )}
    </>
       
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
       
          defaultValue={formData[question.id]?.comment !== null ? formData[question.id]?.comment : ``}
          onChangeText={(text) => handleChange(text)}
          borderWidth="0" fontSize="md" placeholder={labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
            <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Text color={'red.900'} bg={remainingChars<=0?'white':''} px={'2'} py={'1'} rounded={'sm'}>{remainingChars<=0?"stop typing no more chacter left ":""}</Text>
            <Text fontSize="sm" textAlign={'right'}>{labels?.GENERAL_CHARACTER_REMAINING !== undefined ? `${remainingChars} ${labels?.GENERAL_CHARACTER_REMAINING}` : ''}</Text>
            </View>
      </Box>
      </>
      }
    </Box>
  )
}

export default MatrixAnswer






