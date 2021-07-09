export enum Days {
  Lunes = "Lunes",
  Martes = "Martes",
  Miercoles = "Miercoles",
  Jueves = "Jueves",
  Viernes = "Viernes",
  Sabado = "Sabado",
  Domingo = "Domingo",
}

export interface AvailableDays {
  nameDay: Days;
  available_hours: Array<number>;
}
// PROFESOR
export interface Teacher {
  full_name: string;
  email: string;
  password: string;
  birthday: string;
  languages: Array<string>;
  province: string;
  city: string;
  availability?: Array<AvailableDays>;
}
// ALUMNO
export interface Client {
  full_name: string;
  email: string;
  password: string;
  birthday: string;
  province: string;
  city: string;
}
