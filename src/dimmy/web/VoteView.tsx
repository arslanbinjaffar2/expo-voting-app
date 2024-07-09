import React, { useState } from 'react';
import {crossIcon,chevronIcon} from '../../assets/img';

const VoteView = (props:any) => {
  const [vote, setVote] = useState('');

  const handleVote = (vote) => () => {
    setVote(vote);
  };

  const handleSubmit = () => {
    if (vote === '') {
      alert('Please Select an Option');
    } else {
      // Assuming this.props.vote is passed as a prop to VoteView
      props.vote(vote);
    }
  };

  return (
    <div className="questionBox">
      <h2>OK21 - Kommunal</h2>
      <p className="readMore"><a href="$!">Read more about OK21</a></p>
      <p className="captionBox"><strong>Note that you have only one vote. When you have ticked or either yes or no, click on ‘Submit Vote’ and then ‘Confirm Vote’.</strong></p>
      <div className="voteBox">
        <h3>Select 1 option from the below</h3>
        <div onClick={handleVote(true)} className="questionLabel">
          <span className="title">For</span>
          <span className="check">
            {vote && <img src={crossIcon} alt="" />}
          </span>
        </div>
        <div onClick={handleVote(false)} className="questionLabel">
          <span className="title">Against</span>
          <span className="check">{vote === false &&  <img src={crossIcon} alt="" />}</span>
        </div>
        <div className="buttonPanel">
          <span className="btnCancel"  onClick={() => props.click(1)}>Cancel</span>
          <button onClick={handleSubmit} className="button">
            <span style={{fontSize: '15px', color: '#fff', marginRight: 10,fontWeight: '700'}}>Submit Vote</span>
            <img style={{width: '7px', height: '11px'}} alt="" src={chevronIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteView;