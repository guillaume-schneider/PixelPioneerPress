import { FirebaseSignUpErrorPipe } from './firebase-sign-up-error.pipe';

describe('FirebaseSignUpErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new FirebaseSignUpErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
