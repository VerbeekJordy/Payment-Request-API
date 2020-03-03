import {Component, Input, OnInit} from '@angular/core';
import {Gift} from '../../models/gift.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() gifts: Array<Gift>;
  count: number;
  total = 0;
  paymentBasket = [];
  googlePaymentDataRequest = {
    environment: 'TEST',
    apiVersion: 2,
    apiVersionMinor: 0,
    merchantInfo: {
      // A merchant ID is available after approval by Google.
      // @see {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist}
      // merchantId: '01234567890123456789',
      merchantName: 'Example Merchant'
    },
    allowedPaymentMethods: [{
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA']
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        // Check with your payment gateway on the parameters to pass.
        // @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
        parameters: {
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId'
        }
      }
    }]
  };

  constructor(private router: Router) {
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

  removeItemFromCart(gift: Gift) {
    this.count = 0;
    while (gift.id !== this.gifts[this.count].id) {
      this.count++;
    }
    this.gifts.splice(this.count, 1);
  }

  creatingBasketItems() {
    for (const item of this.gifts) {
      this.total = +this.total + +item.price;
      this.paymentBasket.push({
        label: item.description + '',
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
        data: {supportedNetworks: ['visa', 'mastercard', 'jcb']},
      }, {supportedMethods: 'https://google.com/pay', data: this.googlePaymentDataRequest}
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

    previousDetails.displayItems.splice(this.gifts.length, this.paymentBasket.length, selectedShippingOption);
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
          window.alert('' + err);
        });
    }
  }

  sendPaymentToServer(instrumentResponse) {
    window.setTimeout(() => {
      instrumentResponse.complete('success')
        .then(() => {
          document.getElementById('result').innerHTML =
            this.instrumentToJsonString(instrumentResponse);
        })
        .catch((err) => {

        }).finally(() => {
        console.log('Betaald');
        this.router.navigateByUrl('/confirmation');
      });
    }, 2000);
  }

  instrumentToJsonString(instrument) {
    const details = instrument.details;
    details.cardNumber = 'XXXX-XXXX-XXXX-' + details.cardNumber.substr(12);
    details.cardSecurityCode = '***';

    return JSON.stringify({
      methodName: instrument.methodName,
      details,
      payerName: instrument.payerName,
      payerPhone: instrument.payerPhone,
      payerEmail: instrument.payerEmail,
    }, undefined, 2);
  }
}

