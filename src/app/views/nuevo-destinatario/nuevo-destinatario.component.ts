import { Banco, Bank } from './../../models/banco';
import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as validarRUT from '../../util/validarRUT';

import { ListaBancosService } from '../../services/lista-bancos.service';

declare var validarRUT: any;

@Component({
  selector: 'app-nuevo-destinatario',
  templateUrl: './nuevo-destinatario.component.html',
  styleUrls: ['./nuevo-destinatario.component.css']
})
export class NuevoDestinatarioComponent implements OnInit {

  title = "Nuevo destinatario"
  _bancos: string[] = [];

  destinatarioForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private listaBancosService: ListaBancosService
  ) { }

  ngOnInit() {
    this.destinatarioForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      rut: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      telefono: [null, Validators.required],
      banco: [null, Validators.required],
      tipoCuenta: [null, Validators.required],
      numCuenta: [null, Validators.required]
    });

    this.getBancos();

    console.log('Lista de bancos =>', this._bancos);

  }

  submit() {
    if (!this.destinatarioForm.valid) {
      return;
    }
    console.log(this.destinatarioForm.value);
  }

  getBancos(){
    this.listaBancosService.getBancos().subscribe((data:Banco )=> {

        for (let variable of data.banks) {  
          this._bancos.push(variable['name'])
        }

    });
  }

  //https://palabrasalcierre.wordpress.com/2009/11/24/formateo-y-validacion-de-runjava-script/

}

/* 
• Nombre
• RUT
• Correo
• Número de teléfono
• Banco de Destino
• Tipo de cuenta
• Número de cuenta
 */