import { useEffect, useState } from "react";
import { debounce } from 'lodash';

export const userTextCount=({ updateFormData, questinId, type, formData }:{updateFormData:any,  questinId:any, type?: string, formData: any})=>{
    const [text, setText] = useState('');
    const maxChars = 500;
    const handleChange = (text:string) => {
      if (text.length <= maxChars ) {
        setText(text);
        debounce(() => {
            updateFormData(questinId, 'comment', text); // Wrap updateFormData inside debounce
        }, 300)();
      }
    };
    let remainingChars = maxChars - text.length;
    useEffect(() => {
        remainingChars = maxChars - text.length;
    }, [text]);
    return {handleChange, remainingChars};
}