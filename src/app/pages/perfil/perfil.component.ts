import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME } from './../../_shared/var.constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

 username:string="";
 authorities : string[]=[];

  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();
    let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    const decodedToken = helper.decodeToken(tk.access_token);
    this.username = decodedToken.user_name;
    console.log(decodedToken);
    this.authorities = decodedToken.authorities;
  }

}
