import { MedicoService } from 'src/app/_service/medico.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Medico } from 'src/app/_model/medico';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  medico : Medico;

  constructor(private dialogoRef: MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Medico, 
    private medicoService: MedicoService) { }

  ngOnInit() {
    this.medico = new Medico();
    this.medico.idMedico = this.data.idMedico;
    this.medico.nombres = this.data.nombres;
    this.medico.apellidos = this.data.apellidos;
    this.medico.cmp = this.data.cmp;
    
  }

  cancelar(){
    this.dialogoRef.close();
  }

  operar(){
    if (this.medico != null && this.medico.idMedico > 0) {
      this.medicoService.modificar(this.medico).subscribe(data => {
        this.medicoService.listar().subscribe(medicos => {
          this.medicoService.medicosCambio.next(medicos);
          this.medicoService.mensajeCambio.next("Se modifico");
        });
      });
    } else {
      this.medicoService.registrar(this.medico).subscribe(data => {
        this.medicoService.listar().subscribe(medicos => {
          this.medicoService.medicosCambio.next(medicos);
          this.medicoService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogoRef.close();
  }

}
