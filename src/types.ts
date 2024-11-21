export interface Prize {
  id: string;
  name: string;
  quantity: number;
  image?: string;
  winners: string[];
}

export interface Participant {
  id: string;
  name: string;
  department: string;
}

export interface WinnerDisplay {
  name: string;
  department: string;
  prize: string;
  timestamp: string;
}