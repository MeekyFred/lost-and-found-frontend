export interface InputState {
  file: File | null;
  fileName: string;
  uploadView: string;
  progress: number;
  url: string | null;
}

export const initialState: InputState = {
  file: null,
  fileName: '',
  uploadView: 'upload',
  progress: 0,
  url: '',
};

export type Action =
  | { type: 'SET_FILE'; payload: File | null }
  | { type: 'SET_FILE_NAME'; payload: string }
  | { type: 'SET_UPLOAD_VIEW'; payload: string }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'SET_URL'; payload: string }
  | { type: 'RESET'; payload?: InputState };
