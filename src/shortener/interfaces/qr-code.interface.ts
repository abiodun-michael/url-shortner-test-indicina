export interface IQRCodeGenerator {
  generateQRCode(text: string): Promise<string>;
} 