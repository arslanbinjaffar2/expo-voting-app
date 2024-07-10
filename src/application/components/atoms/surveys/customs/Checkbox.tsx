import React from 'react'
import { Text } from "native-base";

 const MyCheckboxGroup = ({ formData, question, updateFormData }:any) => {
  return (
    <div className="verificationArea" >
        <Text fontSize={'sm'} fontWeight={'normal'}>Select option from the below:</Text>
      <div className='custom_checkbox_container' style={{ display:'flex',alignItems:"flex-start",flexDirection:'column',gap:'10px',width:"100%",marginTop:'8px' }}>
        {question.answer.map((answer, k) => (
       <div key={k} className='custom_checkbox_item'>
       <input 
         type="checkbox" 
         name={`MyCheckboxGroup_${question.id}`} 
         id={`checkbox_${question.id}_${answer.id}`} 
         className="custom-checkbox" 
         checked={formData[question.id]?.answer?.includes(answer.id.toString())} 
         onChange={(e) => {
           const newAnswers = e.target.checked
             ? [...(formData[question.id]?.answer || []), answer.id.toString()]
             : formData[question.id]?.answer?.filter((id:any) => id !== answer.id.toString());
           updateFormData(question.id, question.question_type, newAnswers);
         }} 
       />
       <label htmlFor={`checkbox_${question.id}_${answer.id}`}>{answer.answer}</label>
     </div>
  ))}
</div>
    </div>
  );
};



export default  MyCheckboxGroup