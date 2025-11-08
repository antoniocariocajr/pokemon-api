import { TestBed } from '@angular/core/testing';

import { GetPokemon } from './get-pokemon';

describe('GetPokemon', () => {
  let service: GetPokemon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPokemon);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
