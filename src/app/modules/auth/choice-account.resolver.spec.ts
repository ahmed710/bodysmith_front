import { TestBed } from '@angular/core/testing';

import { ChoiceAccountResolver } from './choice-account.resolver';

describe('ChoiceAccountResolver', () => {
  let resolver: ChoiceAccountResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ChoiceAccountResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
