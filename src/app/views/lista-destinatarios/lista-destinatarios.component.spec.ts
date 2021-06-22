import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDestinatariosComponent } from './lista-destinatarios.component';

describe('ListaDestinatariosComponent', () => {
  let component: ListaDestinatariosComponent;
  let fixture: ComponentFixture<ListaDestinatariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDestinatariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDestinatariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
