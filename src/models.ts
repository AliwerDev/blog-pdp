export interface ISurvey {
  id: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  published: boolean;
  questions?: IQuestion[];
}

export interface IQuestion {
  id: string;
  text: string;
  type: string;
  surveyId: string;
  required: boolean;
  answers?: IAnswer[];
}

export interface IAnswer {
  id: string;
  questionId: string;
  text: string;
  hasDescription?: boolean;
}
