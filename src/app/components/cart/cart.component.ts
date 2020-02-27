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

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  payButtonClicked() {
    if ((window as any).PaymentRequest) {

      const request = this.initPaymentRequest();

      this.onBuyClicked(request);
      this.initPaymentRequest();
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
  }

  initPaymentRequest() {
    const networks = ['amex', 'diners', 'discover', 'jcb', 'mastercard', 'unionpay',
      'visa', 'mir', 'maestro'];
    const types = ['debit', 'credit', 'prepaid'];
    const supportedInstruments = [{
      supportedMethods: 'basic-card',
      data: {supportedNetworks: networks, supportedTypes: types},
    }];

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

  updateDetails({details, shippingOption, resolve, reject}: { details: any, shippingOption: any, resolve: any, reject: any }) {
    let selectedShippingOption;
    let otherShippingOption;
    if (shippingOption === 'standard') {
      selectedShippingOption = details.shippingOptions[0];
      otherShippingOption = details.shippingOptions[1];
      details.total.amount.value = '55.00';
    } else if (shippingOption === 'express') {
      selectedShippingOption = details.shippingOptions[1];
      otherShippingOption = details.shippingOptions[0];
      details.total.amount.value = '67.00';
    } else {
      reject('Unknown shipping option \'' + shippingOption + '\'');
      return;
    }
    selectedShippingOption.selected = true;
    otherShippingOption.selected = false;
    details.displayItems.splice(2, 1, selectedShippingOption);
    resolve(details);
  }

  onShippingOptionChange(event, previousDetails) {
    const paymentRequest = event.target;
    console.log(`Received a 'shippingoptionchange' event, change to: `,
      paymentRequest.shippingOption);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < previousDetails.shippingOptions.length; i++) {
      const shippingOption = previousDetails.shippingOptions[i];
      shippingOption.selected =
        shippingOption.id === paymentRequest.shippingOption;
    }
    // previousDetails = previousDetails.displayItems.splice(1, 1, previousDetails.shippingOptions[0]);
    event.updateWith(previousDetails);
  }

  onBuyClicked(request) {
    if (request.canMakePayment) {
      request.show().then((instrumentResponse) => {
        this.sendPaymentToServer(instrumentResponse);
      })
        .catch((err) => {
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


