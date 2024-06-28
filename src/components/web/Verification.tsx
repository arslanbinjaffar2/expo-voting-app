import React, { useState } from 'react';
import { arrowRightIcon } from '../../assets/img';
import DatePicker from "react-datepicker";

interface Props {
  click: (value: number) => void;
}

const Verification: React.FC<Props> = ({ click }) => {
  const [date, setDate] = useState<any>('');

  const CustomDatePicker: React.FC<{ value: string, onClick: () => void }> = ({ value, onClick }) => (
    <button style={{ width: '100%', height: '56px', backgroundColor: '#fff', borderRadius: 5, borderColor: '#BBB', cursor: 'pointer', textAlign: 'left' }} onClick={onClick}>
      <span style={{ paddingLeft: 20, fontSize: 15, color: '#6D6D6D' }}>{value ? value : 'DD/MM/YY'}</span>
    </button>
  );

  return (
    <div className="verificationArea">
      <h4>Type your date of birth and election code to vote</h4>
      <div className="formRow" style={{ position: 'relative', zIndex: 99 }}>
        <div className="label">Date of birth</div>
        <DatePicker
          showWeekNumbers
          selected={date}
          onChange={(date: Date) => setDate(date)}
          customInput={<CustomDatePicker value={date} onClick={() => {}} />}
        />
        <div className="infoBox">Type your date of birth as dd/mm/yy, eg. 01/01/90</div>
      </div>
      <div className="formRow">
        <div className="label">Election code</div>
        <input
          type="text"
          className="input"
          placeholder="ELECTION CODE"
          style={{ height: 56, borderColor: '#ddd', borderWidth: 1, borderRadius: 5, backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }}
        />
        <div className="infoBox">Type your election code sent to you by message or email</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="button" onClick={() => click(2)}>
          <span style={{ fontSize: '15px', color: '#fff', marginRight: 10, fontWeight: '700' }}>Go To Ballot</span>
          <img style={{ width: '16px', height: '10px' }} alt="" src={arrowRightIcon} />
        </button>
      </div>
    </div>
  );
};

export default Verification;