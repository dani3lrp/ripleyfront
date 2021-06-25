import { Cliente, Movimiento, Transaccion } from './../../models/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MovimientoService } from 'src/app/services/movimiento.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface movimientoVista {
  nombre: string;
  numCuenta: string;
  egresoIngreso: string;
  monto: string;

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
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  title: string = 'Movimientos';
  spinner: boolean = true;

  @ViewChild('paginator') paginator: MatPaginator;
  _movimientos: movimientoVista[]=[];

  displayedColumns: string[] = ['nombre', 'numCuenta', 'egresoIngreso', 'monto'];
/*   dataSource = new MatTableDataSource(ELEMENT_DATA); */

dataSource: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private movimientoService: MovimientoService

  ) { }

  ngOnInit(): void {

    this.getMovimientos();

  }

  getMovimientos(){
    this.movimientoService.getCliente().subscribe((data:Cliente) => {

      for (let variable of data[0].movimientos) {

        let adx: movimientoVista = {nombre:'',numCuenta:'',egresoIngreso:'',monto:''};

        adx.nombre = variable.destinatario.nombre;
        adx.numCuenta = variable.destinatario.cuenta[0].numCuenta;
        adx.egresoIngreso = variable.destinatario.cuenta[0].transaccion[0].egresoIngreso;
        adx.monto = variable.destinatario.cuenta[0].transaccion[0].monto;

        if( adx.monto !== ""){
          this._movimientos.push(adx);
        }

      }

      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this._movimientos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data? this.spinner = false: this.spinner = true;
    },
    error => {  
      console.log('There was an error while retrieving Usuarios!' + error);

    });

    console.log('this._movimientos =>', this._movimientos)
  }

}
