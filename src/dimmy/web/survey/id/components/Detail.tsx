import React, { ChangeEvent, useEffect, useState } from 'react';
import { Question } from '../../../../../models/survey/Detail';
import UseAuthService from '../../../../../redux/store/services/useAuthServices';
import UseEventService from '../../../../../redux/store/services/useEventServices';
import UseEnvService from '../../../../../redux/store/services/useEnvServices';
import UseSurveyService from '../../../../../redux/store/services/useSurveyServices';

const SurveyDetail = ({ questions,surveyId }: { questions: Question[],surveyId:any }) => {
    const {SubmitSurvey}=UseSurveyService()
    const {event}=UseEventService()
    const {_env}=UseEnvService()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | number }>({});
  const { response  } = UseAuthService();
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  
  };


  

  const handleAnswers = (questionId: string | number, answerId: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];


  return (
    <div className="survey-detail">
      <div className="verificationArea" key={currentQuestion.id}>
        <h4>{currentQuestion.value ?? ""}</h4>
        {currentQuestion.answer.length > 0 && currentQuestion.answer.map((singleans) => (
          <SingleAnswer
            key={singleans.id}
            props={singleans}
            selectedAnswer={answers[currentQuestion.id]}
            handleAnswer={(answerId) => handleAnswers(currentQuestion.id, answerId)}
          />
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="button" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button className="button" onClick={handleNextQuestion}>
            {currentQuestionIndex === questions.length - 1 ? "Confirm" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetail;

function SingleAnswer({ props, selectedAnswer, handleAnswer }: { props: any, selectedAnswer: any, handleAnswer: (id: any) => void }) {
  const [single, setSingle] = useState({
    check: selectedAnswer === props.id,
    id: props.id
  });

  useEffect(() => {
    setSingle({ check: selectedAnswer === props.id, id: props.id });
  }, [selectedAnswer, props.id]);

  return (
    <div className="formRow" style={{ display: "flex", gap: "100px", alignItems: "center" }} key={props.id}>
      <label htmlFor={props.id} className="label" style={{ flex: 1 }}>{props.answer}</label>
      <input
        type="radio"
        className="input"
        id={props.id}
        name={`answer-${props.id}`}
        checked={single.check}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSingle({ check: e.target.checked, id: props.id });
          handleAnswer(props.id);
        }}
        style={{ height: 56, width: 56, borderColor: '#ddd', borderWidth: 1, borderRadius: 5, backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }}
      />
    </div>
  );
}
