import { TOKEN_NAME } from './_shared/var.constants';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { HttpClientModule } from '@angular/common/http';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MedicoComponent } from './pages/medico/medico.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { DialogoComponent } from './pages/medico/dialogo/dialogo.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { DialogoDetalleComponent } from './pages/buscar/dialogo-detalle/dialogo-detalle.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { Not401Component } from './pages/not401/not401.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SignosComponent } from './pages/signos/signos.component';
import { SignosEdicionComponent } from './pages/signos/signos-edicion/signos-edicion.component';

export function tokenGetter() {
  let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
  let token = tk != null ? tk.access_token : '';
  //console.log(token);
  return token;
}
@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    PacienteEdicionComponent,
    MedicoComponent,
    EspecialidadComponent,
    ExamenComponent,
    ConsultaComponent,
    ExamenEdicionComponent,
    EspecialidadEdicionComponent,
    DialogoComponent,
    EspecialComponent,
    BuscarComponent,
    DialogoDetalleComponent,
    ReporteComponent,
    LoginComponent,
    Not401Component,
    PerfilComponent,
    SignosComponent,
    SignosEdicionComponent,

  ],
  entryComponents: [
    DialogoComponent,
    DialogoDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
