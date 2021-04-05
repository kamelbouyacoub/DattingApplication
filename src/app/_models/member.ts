import { Photo } from "./photo";

export interface Member {
    id: number;
    userName: string;
    introduction: string;
    photoUrl: string;
    passwordHash: string;
    passwordSalt: string;
    age: number;
    knowAs?: any;
    created: Date;
    lastActive: string;
    gender: string;
    lookingFor: string;
    interest?: any;
    city: string;
    country: string;
    photos: Photo[];
  }
