import { Injectable } from '@nestjs/common';
import { customAlphabet } from 'nanoid';
import { IUrlEncoder } from '../interfaces/url-encoder.interface';

@Injectable()
export class NanoidEncoder implements IUrlEncoder {
  private readonly generateShortPath: (size?: number) => string;

  constructor() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.generateShortPath = customAlphabet(alphabet, 6);
  }

  encode(url: string): string {
    return this.generateShortPath();
  }
} 