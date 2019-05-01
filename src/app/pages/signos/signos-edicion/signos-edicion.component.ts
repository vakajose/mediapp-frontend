import { Router, ActivatedRoute, Params } from '@angular/router';
import { Signos } from './../../../_model/signos';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { SignosService } from './../../../_service/signos.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';
import * as moment from 'moment';

@Component({
  selector: 'app-signos-edicion',
  templateUrl: './signos-edicion.component.html',
  styleUrls: ['./signos-edicion.component.css']
})
export class SignosEdicionComponent implements OnInit {

  form: FormGroup;
  myControlPaciente: FormControl = new FormControl();

  id:number;
  edicion:boolean;
  signos:Signos;
  pacientes: Paciente[] = [];
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  temperatura: string;
  pulso: string;
  ritmo:string;
  mensaje:string;

  filteredOptions: Observable<any[]>;
  pacienteSeleccionado: Paciente;

  constructor(private builder: FormBuilder, private pacienteService: PacienteService,
   private signosService : SignosService, private snackBar: MatSnackBar,private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.signos = new Signos();
    this.form = this.builder.group({
      'id': new FormControl(0),
      'paciente': this.myControlPaciente,
      'temperatura': new FormControl(),
      'pulso': new FormControl(''),
      'ritmo': new FormControl(''),
      'fecha': new FormControl(new Date()),
    });
    this.listarPacientes();
    
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      console.log(this.edicion);
      this.initForm();
    });
    this.filteredOptions = this.myControlPaciente.valueChanges.pipe(map(val => this.filter(val)));
  }
  initForm() {
    if (this.edicion) {
      //cargar la data del servicio hacia el form
      this.signosService.listarPorId(this.id).subscribe(data => {
        this.myControlPaciente.setValue(data.paciente);
        this.form = this.builder.group({
          'id': new FormControl(data.idSigno),
          'paciente': this.myControlPaciente,
          'temperatura': new FormControl(data.temperatura),
          'pulso': new FormControl(data.pulso),
          'ritmo': new FormControl(data.ritmo),
          'fecha': new FormControl(data.fecha)
        });
      });
    }
  }
  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }
  filter(val: any) {
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.dni.includes(val.dni));
    } else {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.dni.includes(val));
    }
  }
  displayFn(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }
  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }

  operar(){
    this.signos.idSigno = this.form.value['id'];
    this.signos.temperatura = this.form.value['temperatura'];
    this.signos.paciente = this.form.value['paciente']; //this.pacienteSeleccionado;
    this.signos.pulso = this.form.value['pulso'];
    this.signos.ritmo = this.form.value['ritmo'];
    this.signos.fecha = moment(this.fechaSeleccionada).toISOString();

    if(this.edicion){
      this.signosService.modificar(this.signos).subscribe(()=>{
        this.signosService.listar().subscribe(data =>{
          this.signosService.signosCambio.next(data);
          this.signosService.mensajeCambio.next("Se Registro");
        });
      });
    }else{
      this.signosService.registrar(this.signos).subscribe(() => {
        this.signosService.listar().subscribe(data =>{
          this.signosService.signosCambio.next(data);
          this.signosService.mensajeCambio.next("Se Registro");
        });
        /* setTimeout(() => {
          this.limpiarControles();
        }, 2000); */
      }); 
    }
    this.router.navigate(['signos']);
  }

}
