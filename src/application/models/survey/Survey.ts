export type Surveys = Survey[];
export type SurveyLabels = Record<string, string>;


export interface Survey {
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
  available: string;
  complete_answered: boolean;
  answered: boolean;
}

export interface Info {
  name: string;
}



export interface SurveySetting {
  id: number;
  event_id: number;
  tab: number;
  alerts: number;
  user_settings: number;
  display_poll: number;
  display_survey: number;
  tagcloud_shape: string;
  tagcloud_colors: string;
  projector_refresh_time: number;
  font_size: string;
  display_graph_logo: number;
  display_graph_question_heading: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  display_poll_module: number;
  display_survey_module: number;
  projector_attendee_count: number;
  display_leader_board_attendee_image: number;
  display_leader_board_attendee_title: number;
  display_leader_board_attendee_company: number;
  display_authority: number;
  authority_max_request_allowed: number;
  display_percentage: number;
  projector_setting: string;
  number_of_notification: number;
  notification_interval: number;
  notification_progress_bar: number;
  end_date: string;
  end_time: string;
  use_webview: number;
  enable_projectors: number;
  refresh_projector_view: number;
}

export interface SurveySubmitData {
  survey_id?: number;
  event_id: number;
  attendee_id: number;
  base_url: string;
  organizer_id: number;
  create_date: string;
  submitted_questions: SubmittedQuestion[];
}

export interface SubmittedQuestion {
  id: number;
  type: string;
  required: string;
  is_anonymous: number;
  comment?: string;
  original_answers?: OriginalAnswer[];
  answers?: Answer[];
}

export interface Answer {
  id: number | string | any;
}

export interface OriginalAnswer {
  id: number;
  correct?: number;
}