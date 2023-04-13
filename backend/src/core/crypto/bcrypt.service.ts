import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BCryptService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(15);
    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(password, hash);
    return isEqual;
  }
}
