export interface JwtPayload {
  iss: string;
  email: string;
  sub: string;
  type: 'reset' | 'access' | 'activation';
  nonce?: string;
}
