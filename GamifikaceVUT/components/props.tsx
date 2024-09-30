export interface Question {
  /** ID otázky*/
  id: string;
  /** Názov otázky*/
  name: string;
  /** Text otázky*/
  text: string;
  /** Boolean vyznačujúci schválenie otázky*/
  approved: boolean;
  /** Boolean udavajuci či je otázka viditelná*/
  visible: boolean;
  /** ID uživateľa ktorý vytvoril otázku*/
  created_by: string;
  /** Počet likov otázky*/
  likes: Number;
  /** Dátum vytvorenia otázky*/
  created_at: Date;
  /** ID okruhu pod ktorý otázka patrý*/
  okruh: string;
  /** Boolean udávajúci či sa jedná o textovú otázku*/
  is_text_question: Boolean;
}
export interface Answer {
  id: string;
  text: string;
  answer_type: boolean;
  question: string;
}
export interface Okruh {
  /** ID okruhz*/
  id: string;
  /** Názov okruhu*/
  name: string;
  /** Boolean udávajúci či je otázka dostupná*/
  available: boolean;
  /** ID kurzu do ktorého otázka spadá*/
  course: string;
}

export interface Comment {
  /** ID komentáru*/
  id: string;
  /** Text komentáru*/
  text: string;
  /** Dátum vytvorenia komentáru*/
  created_at: Date;
  /** ID uživateľa ktorý vytvoril otázku*/
  created_by: string;
  /** Počet likov komentáru*/
  likes: number;
  /** ID otázky ku ktorej je komentár priradený*/
  question: string;
}
export interface User {
  /** Meno užívateľa*/
  username: string;
  /** Email užívateľa*/
  email: string;
  /** ID užívateľa*/
  id: string;
}
export interface Course {
  /** ID kurzu*/
  id: string;
  /** Zkratka názvu kurzu*/
  name: string;
  /** Celé meno kurzu*/
  full_name: string;
}
export interface Score {
  /** ID záznamu o skóre*/
  id: string;
  /** Počet bodoc*/
  points: number;
  /** ID užívateľa ktorému patrí bodové ohodnotenie*/
  user: string;
  /** Meno užívateľa ktorému patrí bodové ohodnotenie*/
  username: string;
  /** ID kurzu ktorému pod ktorý patrý bodové ohodnotenie*/
  coursename: string;
}
/** Rozhranie pre vytvorenie nového bodového stavu*/
export interface Score_POST {
  /** ID užívateľa*/
  user_id: string;
  /** ID kurzu*/
  courseID: string;
  /** Počet bodov*/
  point: number;
}
/** Rozhranie pre vytvorenie nového komentáru*/
export interface Comment_POST {
  /** ID užívateľa*/
  user_id: string;
  /** ID otázky*/
  question_id: string;
  /** Text komentáru*/
  text: string;
}
/** Rozhranie pre pridávanie navštevovaných predmetov*/
export interface Visited_POST {
  /** ID užívateľa*/
  userID: string;
  /** ID kurzu*/
  courseID: string;
}
