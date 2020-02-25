import {Component, Input, OnInit} from '@angular/core';
import {Gift} from '../../models/gift.model';
import {isBoolean, isString} from 'util';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() gifts: Array<Gift>;
  count: number;
  total: number;

  constructor() {
  }

  ngOnInit() {
    for (const val of  this.gifts) {
    }
  }

  payButtonClicked() {
    let request = initPaymentRequest();

    onBuyClicked(request);
    request = initPaymentRequest();
  }

  removeItemFromCart(gift: Gift) {
    this.count = 0;
    while (gift.id !== this.gifts[this.count].id) {
      this.count++;
    }
    this.gifts.splice(this.count, 1);
  }


}

function initPaymentRequest() {
  const networks = ['amex', 'diners', 'discover', 'jcb', 'mastercard', 'unionpay',
    'visa', 'mir', 'maestro'];
  const types = ['debit', 'credit', 'prepaid'];
  const supportedInstruments = [{
    supportedMethods: 'basic-card',
    data: {supportedNetworks: networks, supportedTypes: types},
  }];


  const details = {
    total: {label: 'Total', amount: {currency: 'EUR', value: '55.00'}},
    displayItems: [
      {
        label: 'Original donation amount',
        amount: {currency: 'EUR', value: '65.00'},
      },
      {
        label: 'Friends and family discount',
        amount: {currency: 'EUR', value: '-10.00'},
      },
    ],
  };

  const options = {
    requestPayerName: true,
    requestPayerPhone: true,
    requestPayerEmail: true,
  };

  return new PaymentRequest(supportedInstruments, details, options);
}

function onBuyClicked(request) {
  request.show().then((instrumentResponse) => {
    sendPaymentToServer(instrumentResponse);
  })
    .catch((err) => {

    });
}

function sendPaymentToServer(instrumentResponse) {
  // There's no server-side component of these samples. No transactions are
  // processed and no money exchanged hands. Instantaneous transactions are not
  // realistic. Add a 2 second delay to make it seem more real.
  window.setTimeout(() => {
    instrumentResponse.complete('success')
      .then(() => {
        document.getElementById('result').innerHTML =
          instrumentToJsonString(instrumentResponse);
      })
      .catch((err) => {

      });
  }, 2000);
}

function instrumentToJsonString(instrument) {
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


