import React from 'react'
import { Text } from "native-base";

const MatrixRadioBox = ({ formData, question, updateFormData }:any) => {
  return (

    <div className="verificationArea" >
      <Text fontSize={'sm'} fontWeight={'normal'}>Select option from the below:</Text>
      <div className='custom_checkbox_container' style={{ display:'flex',alignItems:"flex-start",flexDirection:'column',gap:'10px',width:"100%",marginTop:'8px' }}>
        {question.answer.map((answer, k) => (
    <div  key={k} className='custom_checkbox_item' >
      <input 
        type="radio" 
        name={`MyRadioGroup_${question.id}`} 
        id={`radio_${question.id}_${answer.id}`} 
        className="custom-checkbox" 
        checked={formData[question.id]?.answer?.[0] === answer.id.toString()} 
        onChange={() => updateFormData(question.id, question.question_type, answer.id)} 
      />
      {JSON.stringify(formData[question.id]?.answer?.[0] === answer.id.toString())}
      <label htmlFor={`radio_${question.id}_${answer.id}`}>{answer.answer}</label>
    </div>
  ))}
</div>
    </div>
  );
};



export default MatrixRadioBox