export interface SurveyDetail {
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
  questions: Question[];
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
  name: string;
  value: string;
  display: string;
  answer: Answer[];
  matrix: Matrix[];
}
  
  export interface Matrix {
    id: number;
    name: string;
    sort_order: number;
    question_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  }
  
  export interface Answer {
    id: number;
    sort_order: number;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    answer: string;
    correct: number;
  }
  
  export interface Info {
    name: string;
  }

export type FormData = Record<string | number, any>
