export interface Training {
  id: number;
  dateTime: string;
  duration: number;
  studioId: number;
  trainingTypeId: number;
  trainerId: number;
  trainees: number[];
}
