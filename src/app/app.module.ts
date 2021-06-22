import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PruebaComponent } from './prueba/prueba.component';

import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './views/common/header/header.component';
import { FooterComponent } from './views/common/footer/footer.component';
import { LoginComponent } from './views/login/login.component';
import { NuevoDestinatarioComponent } from './views/nuevo-destinatario/nuevo-destinatario.component';
import { ListaDestinatariosComponent } from './views/lista-destinatarios/lista-destinatarios.component';
import { TransferirComponent } from './views/transferir/transferir.component';
import { MovimientosComponent } from './views/movimientos/movimientos.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    NuevoDestinatarioComponent,
    ListaDestinatariosComponent,
    TransferirComponent,
    MovimientosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
