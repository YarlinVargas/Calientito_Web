export interface DataExam {
  id: number;
  idRequest: number;
  idPatient: number;
  requestNumber: string;
  idPatient_Exam: number;
  idExam: number;
  examName: string;
  requestStatus: string;
  open: boolean;
}

export interface DataDetail {
  idExam: number;
  idPatientExam: number;
  idRequest: number;
  examName: string;
  detail: string;
  date: string;
  result: DataResult[];
}

export interface DataResult {
  idRequest: number,
  idAnalyte: number,
  analyteCode: string,
  analyteName: string,
  referenceValue: string,
  results: string
}
