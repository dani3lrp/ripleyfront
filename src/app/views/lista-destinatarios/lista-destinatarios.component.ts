import { Cliente } from './../../models/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MovimientoService } from 'src/app/services/movimiento.service';
import { MatSpinner } from '@angular/material/progress-spinner';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface destinatarioVista {
  nombre: string;
  banco: string;
  cuenta: string;
  tipo: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-lista-destinatarios',
  templateUrl: './lista-destinatarios.component.html',
  styleUrls: ['./lista-destinatarios.component.css']
})
export class ListaDestinatariosComponent implements OnInit {

  title: string = 'Destinatarios';
  spinner: boolean = true;

  @ViewChild('paginator') paginator: MatPaginator;
  _destinatarios: destinatarioVista[] =[];

  displayedColumns: string[] = ['nombre', 'banco', 'tipo', 'cuenta'];
  /* dataSource = new MatTableDataSource(this._destinatarios); */

  dataSource: any;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private movimientoService: MovimientoService
  ) {  }

  ngOnInit(): void {
    this.getDestinatarios();
  }

  getDestinatarios(){
    this.movimientoService.getCliente().subscribe((data:Cliente) => {

      for (let variable of data[0].movimientos) {

        let adx: destinatarioVista = {nombre:'',banco:'',cuenta:'',tipo:''};

        if(  variable.destinatario.activo == true){

        adx.nombre = variable.destinatario.nombre;
        adx.banco = variable.destinatario.cuenta[0].banco;
        adx.cuenta = variable.destinatario.cuenta[0].numCuenta;
        adx.tipo = variable.destinatario.cuenta[0].tipo;

        this._destinatarios.push(adx);

        }

      }

      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this._destinatarios;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data? this.spinner = false: this.spinner = true;
    },
    error => {  
      console.log('There was an error while retrieving Usuarios!' + error);

    });

    console.log('this._destinatarios =>', this._destinatarios)
  }

}


/* http://respagblog.azurewebsites.net/angular-material-datatable-con-angular-7/ */