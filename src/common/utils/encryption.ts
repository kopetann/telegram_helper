import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'crypto';
import { Config } from '../config';

const alg = 'aes-256-ctr';
let key = new Config().get('ENCRYPTION_KEY');
key = createHash('sha256').update(String(key)).digest('base64').substr(0, 32);

export const encryptData: (data: string) => string = (data: string) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv(alg, key, iv);
  return Buffer.concat([iv, cipher.update(data), cipher.final()]).toString(
    'base64',
  );
};

export const decryptData: (data: string) => string = (data: string) => {
  let buffer = Buffer.from(data, 'base64');
  const iv = buffer.slice(0, 16);
  buffer = buffer.slice(16);
  const decipher = createDecipheriv(alg, key, iv);
  return Buffer.concat([decipher.update(buffer), decipher.final()]).toString(
    'ascii',
  );
};
