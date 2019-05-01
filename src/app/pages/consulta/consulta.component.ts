import { ConsultaListaExamen } from './../../_model/consultaListaExamen';
import { Consulta } from './../../_model/consulta';
import { MatSnackBar } from '@angular/material';
import { ExamenService } from './../../_service/examen.service';
import { DetalleConsulta } from './../../_model/detalleConsulta';
import { Examen } from './../../_model/examen';
import { MedicoService } from './../../_service/medico.service';
import { EspecialidadService } from './../../_service/especialidad.service';
import { ConsultaService } from './../../_service/consulta.service';
import { Paciente } from './../../_model/paciente';
import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/_service/paciente.service';
import { Especialidad } from 'src/app/_model/especialidad';
import { Medico } from 'src/app/_model/medico';
import * as moment from 'moment';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes:Paciente[]=[];
  especialidades:Especialidad[]=[];
  medicos:Medico[]=[];
  examenes:Examen[]=[];
  idPacienteSeleccionado:number;
  idExamenSeleccionado:number;
  idMedicoSeleccionado:number;
  idEspecialidadSeleccionado:number;
  fechaSeleccionada:Date;
  maxFecha: Date = new Date();
  diagnostico:string;
  tratamiento:string;
  detalleConsulta:DetalleConsulta[]=[];
  examenesSeleccionados:Examen[]=[];
  mensaje:string;

  constructor(  private snackBar: MatSnackBar,private examenService:ExamenService, private consultaService : ConsultaService,private pacienteService : PacienteService, private especialidadService:EspecialidadService, private medicoService:MedicoService) { }

  ngOnInit() {
    this.listarPacientes();
    this.listarEspecilidad();
    this.listarMedicos();
    this.listarExamenes();
  } 

  listarPacientes( ){
    this.pacienteService.listar().subscribe(data =>{
      this.pacientes = data;
    });
  }
  listarEspecilidad() {
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    });
  }

  listarMedicos() {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    });
  }

  listarExamenes() {
    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    });
  }

  agregar(){
    if (this.diagnostico != null && this.tratamiento != null) {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);

      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.mensaje = `Debe agregar un diagnóstico y tramiento`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  removerDiagnostico(index:number){
    this.detalleConsulta.splice(index,1);
  }

  agregarExamen(){
    if (this.idExamenSeleccionado > 0) {

      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        let examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.idExamenSeleccionado) {
          cont++;
          break;
        }
      }

      if (cont > 0) {
        this.mensaje = 'El mensaje se encuentra en la lista';
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        let ex = new Examen();
        ex.idExamen = this.idExamenSeleccionado;
        this.examenService.listarExamenPorId(this.idExamenSeleccionado).subscribe(data => {
          ex.nombre = data.nombre;
          this.examenesSeleccionados.push(ex);
        });
      }
    } else {
      this.mensaje = `Debe agregar un examen`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  aceptar() {
    let medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;
    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;
    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;

    let consulta = new Consulta();
    consulta.especialidad = especialidad;
    consulta.paciente = paciente;
    consulta.medico = medico;

    //ver captura de hora
    consulta.fecha = moment(this.fechaSeleccionada).toISOString();
    consulta.detalleConsulta = this.detalleConsulta;

    let consultaListaExamen = new ConsultaListaExamen();
    consultaListaExamen.consulta = consulta;
    consultaListaExamen.lstExamen = this.examenesSeleccionados;

    this.consultaService.registrar(consultaListaExamen).subscribe(() => {
      this.snackBar.open("Se registró", "Aviso", { duration: 2000 });

      setTimeout(() => {
        this.limpiarControles();
      }, 2000);

    });
  }

  removerExamen(index: number) {
    this.examenesSeleccionados.splice(index, 1);
  }

  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.idEspecialidadSeleccionado === 0 || this.idMedicoSeleccionado === 0 || this.idPacienteSeleccionado === 0);
  }

  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.idPacienteSeleccionado = 0;
    this.idEspecialidadSeleccionado = 0;
    this.idMedicoSeleccionado = 0;
    this.idExamenSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
  }
}
