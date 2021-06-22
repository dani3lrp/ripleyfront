import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  miNombre: string = "Daniel Roa Petrasic";

  constructor() { }

  ngOnInit(): void {
  }

}
