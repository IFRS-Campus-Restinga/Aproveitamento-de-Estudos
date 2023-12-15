import { TestBed } from '@angular/core/testing';

import { AlunoInterceptor } from './aluno.interceptor';

describe('AlunoInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AlunoInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AlunoInterceptor = TestBed.inject(AlunoInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
