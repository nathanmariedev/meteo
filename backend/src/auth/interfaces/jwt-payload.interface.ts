export interface JwtPayload {
  iss: string;
  sub: string;
  type: 'reset' | 'access' | 'activation';
  nonce?: string;
}
