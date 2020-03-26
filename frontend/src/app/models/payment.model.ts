export class PaymentDto {
  paymentMethod: string;
  paymentStatus: string;

  constructor(paymentMethod: string) {
    this.paymentMethod = paymentMethod;
  }
}
