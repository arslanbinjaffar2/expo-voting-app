import React from 'react'

const CustomCheckbox = React.memo(({onChange,text,id,name,checked,htmlFor}:any) => {
    
  return (
    <div className='custom_checkbox_container'>
    <input type="radio" name={name} id={id} className="custom-checkbox" checked={checked} onChange={onChange} />
    <label htmlFor={htmlFor}>{text}</label>
  </div>
  )
})

export default CustomCheckbox