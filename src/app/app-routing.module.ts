import { MovimientosComponent } from './views/movimientos/movimientos.component';
import { TransferirComponent } from './views/transferir/transferir.component';
import { ListaDestinatariosComponent } from './views/lista-destinatarios/lista-destinatarios.component';
import { NuevoDestinatarioComponent } from './views/nuevo-destinatario/nuevo-destinatario.component';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [

  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'nuevoDestinatario', component: NuevoDestinatarioComponent, data: { title: 'Nuevo destinatario' } },
  { path: 'ListaDestinatarios', component: ListaDestinatariosComponent, data: { title: 'Lista destinatarios' } },
  { path: 'Transferir', component: TransferirComponent, data: { title: 'Transferir' } },
  { path: 'Movimientos', component: MovimientosComponent, data: { title: 'Movimientos' } },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
