import { Injectable, Logger } from '@nestjs/common';
import { IQRCodeGenerator } from '../interfaces/qr-code.interface';
import QRCode from 'qrcode';

@Injectable()
export class QRCodeGeneratorService implements IQRCodeGenerator {
  private readonly logger = new Logger(QRCodeGeneratorService.name);

  async generateQRCode(text: string): Promise<string> {
    try {
      const qrDataUrl = await QRCode.toDataURL(text);
      return qrDataUrl;
    } catch (error) {
      this.logger.error(`Failed to generate QR Code: ${error.message}`, error.stack);
      throw new Error(`Failed to generate QR Code: ${error.message}`);
    }
  }
} 