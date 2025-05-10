export interface TrainingMetadata {
  studios: Studio[];
  trainingTypes: TrainingType[];
}

export interface Studio {
  id: number;
  name: string;
}

export interface TrainingType {
  id: number;
  name: string;
}
