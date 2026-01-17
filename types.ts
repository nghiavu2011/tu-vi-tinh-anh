export enum SchoolStyle {
  THAI_THU_LANG = 'THAI_THU_LANG',
  THIEN_LUONG = 'THIEN_LUONG'
}

export interface AnalysisRequest {
  image: File | null;
  notes: string;
  school: SchoolStyle;
}

export interface AnalysisResult {
  text: string;
  school: SchoolStyle;
}

export interface Part {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}