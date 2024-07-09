export interface MySurveyResult {
  survery: MySurveyResultSurvey;
  total_score: TotalScore[];
  total_points: number;
}
export interface MySurveyResultSurvey {
  id: number;
  start_date: string;
  end_date: string;
  event_id: number;
  status: number;
  is_anonymous: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  allow_attendee: string;
  info: Info;
  question: Question[];
}

export interface Question {
  id: number;
  question_type: string;
  result_chart_type: string;
  anonymous: string;
  required_question: string;
  enable_comments: string;
  is_anonymous: number;
  sort_order: number;
  start_date: string;
  end_date: string;
  survey_id: number;
  status: number;
  max_options: number;
  min_options: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  allow_attendee: string;
  is_participants_multiple_times: number;
  entries_per_participant: number;
  info: Info2;
  answer: Answer[];
  matrix: Matrix[];
  results: Result[];
  result_score: Resultscore[];
}

export interface Resultscore {
  id: number;
  score: number;
  survey_id: number;
  attendee_id: number;
  event_id: number;
  question_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Result {
  id: number;
  answer: string;
  comment: string;
  event_id: number;
  survey_id: number;
  question_id: number;
  answer_id: number;
  attendee_id: number;
  status: number;
  is_updated: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Matrix {
  id: number;
  name: string;
  sort_order: number;
  question_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  value: string;
}

export interface Answer {
  id: number;
  sort_order: number;
  correct: number;
  question_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  info: Info3;
}

export interface Info3 {
  answer: string;
}

export interface Info2 {
  question: string;
}

export interface Info {
  name: string;
}

interface TotalScore {
  id: number;
  score: string;
  survey_id: number;
  attendee_id: number;
  event_id: number;
  question_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}