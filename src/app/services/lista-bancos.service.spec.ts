import { TestBed } from '@angular/core/testing';

import { ListaBancosService } from './lista-bancos.service';

describe('ListaBancosService', () => {
  let service: ListaBancosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaBancosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
