import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constants';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Signos } from '../_model/signos';

@Injectable({
  providedIn: 'root'
})
export class SignosService {

  signosCambio = new Subject<Signos[]>();
  mensajeCambio = new Subject<string>();
  url: String = `${HOST}/signos`;
  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Signos[]>(`${this.url}`);
  }

  listarPageable(p:number, s:number){
    return this.http.get(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarPorId(idSignos : number){
    return this.http.get<Signos>(`${this.url}/${idSignos}`);
  }

  registrar(signos : Signos){
    return this.http.post(`${this.url}`,signos);
  }

  modificar(signos :Signos){
    return this.http.put(`${this.url}`,signos);
  }

  eliminar(idSignos :number){
    return this.http.delete(`${this.url}/${idSignos}`);
  }
}