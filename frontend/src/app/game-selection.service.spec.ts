import { TestBed } from '@angular/core/testing';

import { GameSelectionService } from './game-selection.service';

describe('GameSelectionService', () => {
  let service: GameSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
