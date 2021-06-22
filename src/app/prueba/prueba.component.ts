import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  map
} from 'rxjs/operators';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  title = 'app works!';

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  // Declare empty list of people
  people: any = [];

  constructor(private http: HttpClient) { }

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllPeople();
  }

  // Add one person to the API
  addPerson(name, age) {
    this.http.post(`${this.API}/users`, { name, age }).pipe(
      map(res => res)
    ).subscribe(() => {
      this.getAllPeople();
    });
  }

  // Get all users from the API
  getAllPeople() {
    this.http.get(`${this.API}/users`).pipe(
      map(res => res)
    ).subscribe(people => {
      console.log(people);
      this.people = people;
    });
  }

}
