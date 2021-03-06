import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../models/product.model';
import {OrderService} from '../../services/order.service';
import {OrderConverter} from '../../converters/order.converter';
import {PaymentDto} from '../../models/payment.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() products: Array<Product>;

  count: number;

  total = 0;

  paymentBasket = [];

  googlePaymentDataRequest = {
    environment: 'TEST',
    apiVersion: 2,
    apiVersionMinor: 0,
    merchantInfo: {
      merchantName: 'Example Merchant'
    },
    allowedPaymentMethods: [{
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['MASTERCARD', 'VISA']
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId'
        }
      }
    }, ]
  };

  constructor(private router: Router, private orderService: OrderService, private converter: OrderConverter) {
  }

  ngOnInit() {
  }

  payButtonClicked() {
    if ((window as any).PaymentRequest) {
      const request = this.initPaymentRequest();
      this.onBuyClicked(request);
      this.initPaymentRequest();
    } else {
      this.router.navigateByUrl('/checkout');
    }
  }

  removeItemFromCart(gift: Product) {
    this.count = 0;
    while (gift.imageUrl !== this.products[this.count].imageUrl) {
      this.count++;
    }
    this.products.splice(this.count, 1);
  }

  creatingBasketItems() {
    for (const item of this.products) {
      this.total = +this.total + +item.price;
      this.paymentBasket.push({
        label: item.titleNl + '',
        amount: {currency: 'EUR', value: item.price + ''},
      });
    }
    this.paymentBasket.push({
      label: 'Free shipping',
      amount: {currency: 'EUR', value: '0.00'}
    });
  }

  initPaymentRequest() {
    const supportedInstruments = [{
      supportedMethods: 'basic-card',
      data: {supportedNetworks: ['visa', 'mastercard', 'maestro']},
    }, {supportedMethods: 'https://google.com/pay', data: this.googlePaymentDataRequest},
      {
        supportedMethods: 'https://apple.com/apple-pay',
        data: {
          version: 3,
          merchantIdentifier: 'merchant.com.example',
          merchantCapabilities: ['supports3DS', 'supportsCredit', 'supportsDebit'],
          supportedNetworks: ['amex', 'discover', 'masterCard', 'visa'],
          countryCode: 'US',
        }
      }
    ];

    this.creatingBasketItems();

    const details = {
      total: {label: 'Total', amount: {currency: 'EUR', value: this.total + ''}},
      displayItems: this.paymentBasket,
      shippingOptions: [
        {
          id: 'free',
          label: 'Free shipping',
          amount: {currency: 'EUR', value: '0.00'},
          selected: true
        },
        {
          id: 'premium',
          label: 'Premium shipping',
          amount: {currency: 'EUR', value: '7.99'},
          selected: false
        }
      ]
    };

    const options = {
      requestPayerName: true,
      requestPayerPhone: true,
      requestPayerEmail: true,
      requestShipping: true
    };

    const paymentRequest = new PaymentRequest(supportedInstruments, details, options);

    paymentRequest.addEventListener(
      'shippingoptionchange',
      (event) => this.onShippingOptionChange(event, details)
    );

    return paymentRequest;
  }

  onShippingOptionChange(event, previousDetails) {
    const paymentRequest = event.target;
    let shippingOption;
    console.log(`Received a 'shippingoptionchange' event, change to: `,
      paymentRequest.shippingOption);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < previousDetails.shippingOptions.length; i++) {
      shippingOption = previousDetails.shippingOptions[i];
      shippingOption.selected =
        shippingOption.id === paymentRequest.shippingOption;
    }

    let selectedShippingOption;

    if (paymentRequest.shippingOption === 'free') {
      previousDetails.total.amount.value = +previousDetails.total.amount.value - 7.99;
      this.total -= 7.99;
      selectedShippingOption = {
        label: 'Free shipping',
        amount: {currency: 'EUR', value: '0.00'}
      };
    } else if (paymentRequest.shippingOption === 'premium') {
      previousDetails.total.amount.value = +previousDetails.total.amount.value + 7.99;
      this.total += 7.99;
      selectedShippingOption = {
        label: 'Premium shipping',
        amount: {currency: 'EUR', value: '7.99'}
      };
    }

    previousDetails.displayItems.splice(this.products.length, this.paymentBasket.length, selectedShippingOption);
    event.updateWith(previousDetails);
  }

  onBuyClicked(request) {
    if (request.canMakePayment) {
      request.show().then((instrumentResponse) => {
        this.sendPaymentToServer(instrumentResponse);
      })
        .catch((err) => {
          this.paymentBasket.splice(0);
          this.total = 0;
        });
    }
  }

  sendPaymentToServer(instrumentResponse) {
    window.setTimeout(() => {
      instrumentResponse.complete('success')
        .then(() => {
          const payment = new PaymentDto(instrumentResponse.methodName);
          this.orderService.addOrder(this.converter.productToStringArray(this.products), payment);
        })
        .catch((err) => {

        }).finally(() => {
        console.log('Betaald');
        this.router.navigateByUrl('/transaction');
      });
    }, 2000);
  }

  instrumentToJsonString(instrument) {
    const details = instrument.details;
    console.log(instrument);
    console.log(instrument.methodName);
    console.log(instrument.payerName);
    details.cardNumber = 'XXXX-XXXX-XXXX-' + details.cardNumber.substr(12);
    details.cardSecurityCode = '***';
    return details;
  }
}


