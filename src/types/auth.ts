import { Document } from "mongoose";

export interface IUser extends Document {
  type_user: string;
  full_name: string;
  email: string;
  password: string;
  birthday: Date;
  languages?: Array<string>;
  province: string;
  city: string;
  profile_picture?: string;
  chat_id: number;
  chat_secret: string;
}

export interface IPicture {
  fieldname?: string;
  originalname?: string;
  encoding?: string;
  mimetype?: string;
  size?: number;
  bucket?: string;
  key?: string;
  acl?: string;
  contentType?: string;
  contentDisposition?: any;
  storageClass?: string;
  serverSideEncryption?: any;
  metadata?: { fieldName: string };
  location?: string;
  etag?: string;
  versionId?: any;
}

export type Reminder = {
  email: string;
  userId: string;
};

export type FilterGet = {
  type_user: string;
  province?: string;
  city?: string;
  languages?: string;
};

export interface Verify {
  full_name?: string;
  email?: string;
}

export const PROVINCES: Array<string> = [
  "alava",
  "albacete",
  "alicante",
  "almeria",
  "asturias",
  "avila",
  "badajoz",
  "barcelona",
  "burgos",
  "caceres",
  "cadiz",
  "cantabria",
  "castellon",
  "ciudad real",
  "cordoba",
  "a coruña",
  "cuenca",
  "girona",
  "granada",
  "guadalajara",
  "guipuzcoa",
  "huelva",
  "huesca",
  "baleares",
  "jaen",
  "leon",
  "lleida",
  "lugo",
  "madrid",
  "malaga",
  "murcia",
  "navarra",
  "ourense",
  "palencia",
  "las palmas",
  "pontevedra",
  "la rioja",
  "salamanca",
  "segovia",
  "sevilla",
  "soria",
  "tarragona",
  "santa cruz de tenerife",
  "teruel",
  "toledo",
  "valencia",
  "valladolid",
  "bizkaia",
  "zamora",
  "zaragoza",
  "ceuta",
  "melilla",
];
