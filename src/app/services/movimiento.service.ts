import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private clienteURL: string = 'https://apibancoripley.herokuapp.com/api/cliente';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { 
      this.getCliente();
    }

    getCliente(): Observable<any>{
      return this.http.get(this.clienteURL)
      .pipe(
        catchError(this.handleError<any>('getBancos', []))
      );
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    };

      /** Log a BancoService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ListaBancoService: ${message}`);
  }


}
