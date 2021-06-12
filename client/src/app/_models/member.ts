import { Photo } from "./photo";
import { Word } from "./word";

export interface Member {
  id: number;
  username: string;
  created: Date;
  lastActive: string;
  words: Word[];
  }
  
