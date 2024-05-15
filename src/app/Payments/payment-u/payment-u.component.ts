import { Component } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account/account.service';
declare var Accept: any;

@Component({
  selector: 'app-payment-u',
  templateUrl: './payment-u.component.html',
  styleUrls: ['./payment-u.component.scss']
})
export class PaymentUComponent {

  modal: any = {
    "amount": "130",
    "cartNumber": "4000000000001091",
    "cvv": "838",
    "expireMonth": "12",
    "expireYear": "2025",
    // "captureId": "string",
    // "TransactionId":""
  }



  // modal: any = {
  //   "amount": "1",
  //   "cartNumber": "4325847000139414",
  //   "cvv": "639",
  //   "expireMonth": "10",
  //   "expireYear": "2026",
  //   // "captureId": "string",
  //   // "TransactionId":""
  // }

  //Pal
  // modal: any = {
  //   "amount": "1",
  //   "cartNumber": "4013592021794691",
  //   "cvv": "930",
  //   "expireMonth": "12",
  //   "expireYear": "2024",
  //   // "captureId": "string",
  //   // "TransactionId":""
  // }
  constructor(private accountService: AccountService) {
  }

  UnifiedJwtInfo: any = {}
  GenerateUnifiedCheckout() {
    // this.accountService.GenerateUnifiedCheckout({ amount: 1 }).subscribe(z => {
    //   this.UnifiedJwtInfo['decoded'] = this.decodeJWT(z['jwt']);
    //   this.UnifiedJwtInfo['jwt'] = z['jwt'];
    //   console.log(this.UnifiedJwtInfo)

    //   setTimeout(() => {
    //     this.fetchAccept()
    //   }, 100);
    // })
  }


  decodeJWT(token: string) {
    const [header, payload, signature] = token.split('.');
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload;
  }


  fetchAccept() {
    let doc: any = document;
    var authForm = doc.getElementById("authForm");
    var transientToken = doc.getElementById("transientToken");
    var cc = this.UnifiedJwtInfo['jwt'];
    var showArgs = {
      containers: {
        paymentSelection: "#buttonPaymentListContainer"
      }
    };
    Accept(cc)
      .then((accept: any) => {
        return accept.unifiedPayments();
      })
      .then((up: any) => {
        return up.show(showArgs);
      })
      .then((tt: any) => {
        transientToken.value = tt;
        authForm.submit();
      });
  }
}
