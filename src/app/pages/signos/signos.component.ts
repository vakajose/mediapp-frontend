import { SignosService } from './../../_service/signos.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Signos } from 'src/app/_model/signos';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-signos',
  templateUrl: './signos.component.html',
  styleUrls: ['./signos.component.css']
})
export class SignosComponent implements OnInit {

  
  displayedColumns = ['idSigno', 'paciente','temperatura','pulso','ritmo','fecha','acciones'];
  dataSource : MatTableDataSource<Signos>;
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  cantidad : number;

  constructor(private signosService:SignosService, private snackBar : MatSnackBar, public route : ActivatedRoute) { }

  ngOnInit() {
    this.listar();
    this.signosService.signosCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.signosService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, "AVISO",{
        duration: 2000
      });
    });
  }

  listar(){
    /* this.pacienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }); */
   this.pedirPaginado();
  }
  
  eliminar(idSigno : number){
    this.signosService.eliminar(idSigno).subscribe(()=>{
      this.signosService.listar().subscribe(data =>{
        this.signosService.signosCambio.next(data);
        this.signosService.mensajeCambio.next("Se Elimino");
      });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  mostrarMas(e :any){
    this.pedirPaginado(e);
  }

  pedirPaginado( e? :any){
    let pageIndex =0;
    let pageSize=10;
    if(e!=null ){
      pageIndex = e.pageIndex;
      pageSize= e.pageSize;
    }
    this.signosService.listarPageable(pageIndex,pageSize).subscribe((data: any)=>{
      let signos = data.content;
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(signos);
      this.dataSource.sort = this.sort;
    });
  }
}
