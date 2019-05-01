import { Paciente } from './paciente';

export class Signos{
    idSigno:number;
    temperatura:string;
    pulso:string;
    ritmo:string;
    fecha: string; //ISODATE 2019-02-10T05:00:00
    paciente: Paciente;
}