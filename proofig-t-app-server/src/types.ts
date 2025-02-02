export interface Article {
  title: string;
  fileName: string;
  dateSubmitted: string;
  stage: string;
  note: string;
  imageAnalysis: {
    status: string;
    totalImages: number;
    duplications: number;
    fullReport: string;
  };
  textAnalysis: {
    status: string;
    similaritiesFound: boolean;
    fullReport: string;
  };
  citationsAnalysis: {
    totalCitations: number;
    suspicious: number;
    bad: number;
    status: string;
    fullReport: string;
  };
}
