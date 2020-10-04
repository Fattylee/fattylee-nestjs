import { AuthGraphqlGuard } from './auth-graphql.guard';

describe('AuthGraphqlGuard', () => {
  it('should be defined', () => {
    expect(new AuthGraphqlGuard()).toBeDefined();
  });
});
