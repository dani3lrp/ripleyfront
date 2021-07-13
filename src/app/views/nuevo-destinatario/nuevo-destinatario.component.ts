import { Banco, Bank } from './../../models/banco';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputMaskAngularModule } from 'input-mask-angular';

import * as validarRUT from '../../util/validarRUT';

/* import {FormControl} from '@angular/forms'; */

import { ListaBancosService } from '../../services/lista-bancos.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare var validarRUT: any;

@Component({
  selector: 'app-nuevo-destinatario',
  templateUrl: './nuevo-destinatario.component.html',
  styleUrls: ['./nuevo-destinatario.component.css']
})
export class NuevoDestinatarioComponent implements OnInit {

  title = "Nuevo destinatario";
  _bancos: string[] = [];
  _tipoCuentas: string[] = ['Cuenta Corriente', 'Cuenta de Ahorro' , 'Cuenta Vista' , 'Cuenta Rut']

  destinatarioForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  rutRegx = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/

  constructor(
    private formBuilder: FormBuilder,
    private listaBancosService: ListaBancosService,
    public dialogo: MatDialog
  ) { 

  }

  ngOnInit() {
    this.destinatarioForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      rut: [null, [Validators.required, Validators.pattern(this.rutRegx)]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      telefono: [null, Validators.required],
      banco: [null, Validators.required],
      tipoCuenta: [null, Validators.required],
      numCuenta: [null, Validators.required]
    });

    this.getBancos();

  }

  submit() {
    if (this.destinatarioForm.valid) {

      console.log(this.destinatarioForm.value);

      this.destinatarioForm.reset();
      return;
    }

    
    
  }

  getBancos(){
    this.listaBancosService.getBancos().subscribe((data:Banco )=> {

        for (let variable of data.banks) {  
          this._bancos.push(variable['name'])
        }

    });
  }

  mostrarDialogo(): void {

    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Confirma a ${ this.destinatarioForm.value.nombre } como nuevo destinatario para transferencias? `  
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {      
          alert("¡Destinatario agregado!");
          this.submit();
        } else {
          alert("Cancelado");
        }
      });
  }

  //https://palabrasalcierre.wordpress.com/2009/11/24/formateo-y-validacion-de-runjava-script/

}

@Component({
  selector: 'dialog-confirmacion',
  template: `
<h1 mat-dialog-title>Confirmación</h1>
<div mat-dialog-content>
    <p>{{ mensaje }}</p>
</div>
<div mat-dialog-actions>
    <button mat-raised-button color="primary" style="margin: 10px" (click)="cerrarDialogo()">No</button>
    <button mat-raised-button color="primary" style="margin: 10px" (click)="confirmado()" cdkFocusInitial>Sí</button>
</div>
  `
})
export class DialogoConfirmacionComponent {

  constructor(
    public dialogo: MatDialogRef<DialogoConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }


}
