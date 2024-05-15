import { DOCUMENT } from '@angular/common';
import { Component, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupsService } from 'src/app/shared/services/Lookups/lookups.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { PaymentsService } from 'src/app/shared/services/payment/payments.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';
declare var Flex: any;
@Component({
  selector: 'app-payment-checkout',
  templateUrl: './payment-checkout.component.html',
  styleUrls: ['./payment-checkout.component.scss']
})
export class PaymentCheckoutComponent {

  paymentTransModel: any = {
    Flag: 1,
    ItemId: 14,
    TransactionId: '',
    TransientTokenJwt: '',
    ExpireMonth: '',
    ExpireYear: '',
    MoneyToCharge: 400
  }

  lang = "labelEn"
  // modal: any = {
  //   "amount": "130",
  //   "cartNumber": "4000000000001091",
  //   "cvv": "838",
  //   "expireMonth": "12",
  //   "expireYear": "2026",
  //   // "captureId": "string",
  //   // "TransactionId":""
  // }



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


  // // Arab Anas
  modal: any = {
    "amount": "1",
    "cartNumber": "4475135074529233",
    "cvv": "670",
    "expireMonth": "12",
    "expireYear": "2028",
    // "captureId": "string",
    // "TransactionId":""
  }
  constructor(private lookupsService: LookupsService, private paymentsService: PaymentsService, private thirdPartytoastyService: ThirdPartytoastyService, private route: ActivatedRoute) {
  }
  // loadScript(url: string): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     const renderer = this.rendererFactory.createRenderer(null, null);
  //     const script = renderer.createElement('script');
  //     script.src = url;
  //     script.onload = () => {
  //       resolve();
  //     };
  //     script.onerror = (error: any) => {
  //       reject(error);
  //     };
  //     renderer.appendChild(this.document.body, script);
  //   });
  // }

  lstData = []
  ngOnInit(): void {
    this.GenerateCaptureContext()
    this.lstExpireYears = this.getNextSevenYears();
  }

  save() {

  }

  lstExpireMonths = [
    { 'value': '01', 'label': '01' },
    { 'value': '02', 'label': '02' },
    { 'value': '03', 'label': '03' },
    { 'value': '04', 'label': '04' },
    { 'value': '05', 'label': '05' },
    { 'value': '06', 'label': '06' },
    { 'value': '07', 'label': '07' },
    { 'value': '08', 'label': '08' },
    { 'value': '09', 'label': '09' },
    { 'value': '10', 'label': '10' },
    { 'value': '11', 'label': '11' },
    { 'value': '12', 'label': '12' }
  ]
  lstExpireYears: any = []
  isPaid = false
  getNextSevenYears() {
    let currentYear = new Date().getFullYear();
    let years = [];
    for (let i = 0; i < 7; i++) {
      years.push({ 'value': currentYear + i + '', 'label': currentYear + i + '', selected: i == 0 });
    }
    return years;
  }

  captureContextRes: any = "";
  GenerateCaptureContext() {
    this.paymentsService.GenerateCaptureContext().subscribe(z => {
      this.captureContextRes = z;

      this.captureContextRes['decodedJwt'].flx = JSON.parse(this.captureContextRes['decodedJwt'].flx)
      this.captureContextRes['decodedJwt'].ctx = JSON.parse(this.captureContextRes['decodedJwt'].ctx)
      this.createFlexToken()
    })
  }
  // addJsToElement(src: string): HTMLScriptElement {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = src;
  //   this.renderer.appendChild(document.body, script);
  //   return script;
  // }
  // SetupCompletionWithCardNumber() {
  //   this.paymentsService.SetupCompletionWithCardNumber(this.modal).subscribe(z => {
  //     this.modal['consumerAuthenticationInformation'] = z['consumerAuthenticationInformation']
  //     this.modal['referenceId'] = z['consumerAuthenticationInformation']['referenceId']


  //     // this.paymentsService.PostToAnyUrl(this.modal['consumerAuthenticationInformation'].deviceDataCollectionUrl).subscribe(a => {
  //     //   console.log(a)
  //     // })
  //   })
  // }
  SetupCompletionWithFlexTransientToken() {
    this.paymentsService.SetupCompletionWithFlexTransientToken({ ...this.modal, TransientToken: this.FlexInfo.jti }).subscribe(z => {
      if (z['errorInformation']) {
        alert(z['errorInformation']['message'])
        return
      }
      this.modal['consumerAuthenticationInformation'] = z['consumerAuthenticationInformation']
      this.modal['referenceId'] = z['consumerAuthenticationInformation']['referenceId']

      setTimeout(() => {
        this.submitDataCollectionForm()
      }, 500);
      // this.paymentsService.PostToAnyUrl(this.modal['consumerAuthenticationInformation'].deviceDataCollectionUrl).subscribe(a => {
      //   console.log(a)
      // })
    })
  }
  frameRedirected(event: any) {
    const iframeSrc = (event.target as HTMLIFrameElement).baseURI;
    const iframeFullPath = (event.target as HTMLIFrameElement).contentDocument?.URL!;
    const url = new URL(iframeSrc);
    const origin = url.origin;
    console.log('Iframe URL:', origin);
    if (iframeFullPath) {
      if (origin == window.location.origin && iframeFullPath.indexOf("?statusZ=") != -1) {
        if (iframeFullPath.indexOf("?statusZ=true") != -1) {
          alert("Success");
        } else {
          alert("Success");
        }
        delete this.modal['cai_Enroll']
      }
    }
    console.log("Form Redirect");
  }
  EnrollWithTransientToken() {
    this.paymentsService.EnrollWithTransientToken({ ...this.modal, TransientToken: this.FlexInfo.jti }).subscribe(z => {
      console.log(z)
      let key = "cai_Enroll"
      this.modal[key] = z['consumerAuthenticationInformation']
      this.modal['transactionId'] = this.modal[key]['authenticationTransactionId']
      this.paymentTransModel['TransactionId'] = this.modal[key]['authenticationTransactionId']
      if (this.modal[key]['pareq']) {
        this.modal[key]['setupUp_Window'] = this.decodeBase64AndParseJSON(this.modal[key]['pareq'])
        this.modal[key]['setupUp_Window']['s'] = this.checkWindowSize(this.modal[key]['setupUp_Window'])
        console.log('paymentTransModel', this.paymentTransModel)

        this.paymentsService.AddPaymentTransaction(this.paymentTransModel).subscribe(z => {
          console.log('AddPaymentTransaction', z)
          this.paymentTransModel['id'] = z.entityId
          this.paymentTransModel['amount'] = z.amount
          this.modal['amount'] = z.amount

          setTimeout(() => {
            this.submitForm("step-up-form");
          }, 200);
        })


      }
    })
  }
  lastCheckedTransactionId = ""
  ValidateAuthenticationResults() {
    // if (this.lastCheckedTransactionId != this.modal['transactionId']) {
    this.lastCheckedTransactionId = this.modal['transactionId']
    this.paymentsService.ValidateAuthenticationResults(this.modal).subscribe(z => {
      console.log(z)
    })
    // }
  }
  submitDataCollectionForm() {
    this.submitForm('cardinal_collection_form')

    window.addEventListener("message", (event) => {
      //testing only
      // if (event.origin === "https://centinelapistag.cardinalcommerce.com") {
      if (event.origin === "https://centinelapi.cardinalcommerce.com") {
        console.log("MMMMMMMMMM", event.data);
        this.EnrollWithTransientToken()
      }
    }, false);

  }
  CreatePayment() {
    this.paymentsService.CreatePayment(this.modal).subscribe(z => {
      this.modal['captureId'] = z['id']
      // this.isPaid = true
    })
  }
  submitForm(formId: string) {
    var from: any = document.querySelector(`#${formId}`);
    if (from) // form exists
      from.submit();
  }

  decodeBase64AndParseJSON(encodedString: string) {
    const decodedString = atob(encodedString);
    const decodedJSON = JSON.parse(decodedString);
    return decodedJSON;
  }
  checkWindowSize(windowObj: any) {
    var challengeWindowSize = windowObj.challengeWindowSize;

    if (challengeWindowSize == "01") return { w: '250px', h: '400px' }
    else if (challengeWindowSize == "02") return { w: '390px', h: '400px' }
    else if (challengeWindowSize == "03") return { w: '500px', h: '600px' }
    else if (challengeWindowSize == "04") return { w: '600px', h: '400px' }
    else if (challengeWindowSize == "05") return { w: '100vh', h: '100wh' }
    else throw "NOT Defined"
  }

  decodeJWT(token: string) {
    const [header, payload, signature] = token.split('.');
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload;
  }

  FlexInfo: any
  createFlexToken() {
    var form: any = document.querySelector('#fillableForm');
    var payButton: any = document.querySelector('#pay-button');
    var flexResponse = document.querySelector('#flexresponse');
    var expMonth = document.querySelector('#expMonth');
    var expYear = document.querySelector('#expYear');
    var errorsOutput = document.querySelector('#errors-output');

    // the capture context that was requested server-side for this transaction
    var captureContext = this.captureContextRes.jwt;
    // custom styles that will be applied to each field we create using Microform
    var myStyles = {
      'input': {
        'font-size': '14px',
        'font-family': 'helvetica, tahoma, calibri, sans-serif',
        'color': '#555'
      },
      ':focus': { 'color': 'blue' },
      ':disabled': { 'cursor': 'not-allowed' },
      'valid': { 'color': '#3c763d' },
      'invalid': { 'color': '#a94442' }
    };
    // setup Microform
    var flex = new Flex(captureContext);
    var microform = flex.microform({ styles: myStyles });
    var number = microform.createField('number', { placeholder: 'Enter card number' });

    number.on('change', (data: any) => {
      console.log(data)
    });

    var securityCode = microform.createField('securityCode', { placeholder: '•••' });
    number.load('#number-container');
    securityCode.load('#securityCode-container');


    // Configuring a Listener for the Pay button	
    payButton.addEventListener('click', () => {
      let doc: any = document;

      // Compiling MM & YY into optional paramiters	 
      var options = {
        expirationMonth: doc.querySelector('#expMonth').value,
        expirationYear: doc.querySelector('#expYear').value
      };
      this.paymentTransModel['ExpireMonth'] = options.expirationMonth;
      this.paymentTransModel['ExpireYear'] = options.expirationYear;
      //  
      microform.createToken(options, (err: any, token: any) => {
        if (err) {
          // handle error
          // console.error(err);
          if (err['message']) {
            alert(err['message'])
            return
          }
        } else {
          // At this point you may pass the token back to your server as you wish.
          // In this example we append a hidden input to the form and submit it.      
          console.log(JSON.stringify(token));
          this.FlexInfo = this.decodeJWT(token)
          this.modal['transientTokenJwt'] = token
          this.paymentTransModel['TransientTokenJwt'] = token
          this.SetupCompletionWithFlexTransientToken()
          // form.submit();
          //eyJraWQiOiIwM21pcVlCYUVJZkVtN1oxd2h6dTJrRGF1REhxS1RmSCIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJGbGV4LzA0IiwiZXhwIjoxNzEyODc5NTA3LCJ0eXBlIjoibWYtMi4wLjAiLCJpYXQiOjE3MTI4Nzg2MDgsImp0aSI6IjFDM01WSFVJNTlORTBTM1dFUkVUQUNXNkFPUDlHWUo4MzAwT09NT09TQVVNSTBXWFZYSkc2NjE4Nzc5MzA4Q0MiLCJjb250ZW50Ijp7InBheW1lbnRJbmZvcm1hdGlvbiI6eyJjYXJkIjp7ImV4cGlyYXRpb25ZZWFyIjp7InZhbHVlIjoiMjAyOCJ9LCJudW1iZXIiOnsiZGV0ZWN0ZWRDYXJkVHlwZXMiOlsiMDAxIl0sIm1hc2tlZFZhbHVlIjoiWFhYWFhYWFhYWFhYOTIzMyIsImJpbiI6IjQ0NzUxMyJ9LCJzZWN1cml0eUNvZGUiOnt9LCJleHBpcmF0aW9uTW9udGgiOnsidmFsdWUiOiIxMiJ9fX19fQ.m8LpK46sH60sd7szXzL2CYufb127Oa9ogD4aJ6z2vYhZpEWKnVWCiulk5X4qIGcZ_X25iXGSDyPP70EHhpVufXheh352ZR1YkNIp4YnadAhEVsj3W0qtYlX76R7M5WwKB6ZXuiMJGGhLDWttxTT5NN9rbWDg2SgmCqe7ylRJkD71akmldgRE47LidRmI5s8Iez0oJ0uWhd1wDxS2PU4TFVaHTXg1zayunPMK33hd6-7QG22E0fNNybDGLS0FaTpJe7SSBeIQZnQhANN-alo1uETg99kVdW5k-Q97FgpZ23iBrhmFwc3MUI48sPqQxl5RbVPm188m3G0sf6omkPOVwQ
        }
      });
    });

  }


  payWithSavedToken(token = "eyJraWQiOiJ3ZiIsImFsZyI6IlJTMjU2In0.eyJmbHgiOnsicGF0aCI6Ii9mbGV4L3YyL3Rva2VucyIsImRhdGEiOiJONWx6MHZFK21rb1lmYitJZURDQjBSQUFFSjRSVmJkTGx6Sm81MEIreEY2VGh1WEVaRWFPbjd3enhORnZZVWZOaENXR2Jrb0NIUXBjS0dWbGpLbmlwenZBNllzamhUOUpTQkZjTjJJWkRhMklveVlUZUhRd0QzVGI0MmdRaGd3ZFZHMU0iLCJvcmlnaW4iOiJodHRwczovL2ZsZXguY3liZXJzb3VyY2UuY29tIiwiandrIjp7Imt0eSI6IlJTQSIsImUiOiJBUUFCIiwidXNlIjoiZW5jIiwibiI6InFWdWpPQklLWXIxRWRpS3d6RF9CS2RzUDRFRUpabDZjVFFfWWFsYk96dUE0ODR6M2pOWTZfbGF4a0NYVlJpX0plbWJHV0JoX0RmVjBxbWpObzVQZXpZRlM4eHBJQ3hHbVNYVWJtUW1EUGV1TzlfYlZSZjVLc2hjTEhVWnU3Y3BLSXVxd3VCcFUzTUt2UHZFelhxOHhoNWxnejZQM1lhNjcxV1dtbDNJb1ZKYmJFYWZoeGE1YWkxYjkzaVk2dlJyaGlnVllKQnFuRFpCNjQtSTBsek5IMXNQNERLYjJUMmJYZTRVR0lQSktFMXFla1pfREpiQUdVUVpmdHZOM2FuV2tQa2FiN09PT0lqeWJmb04zU0QxRTRGV2F0cWE1Zm9ldV85TEVRVzBpSHZ5X2pwR3FuSFJZRWtYMEdNNEgxNGsyOVN4NEc4ajZqbGs0WE9tQzY2WG1wUSIsImtpZCI6IjAzdjBxQklpM2VyT09sTVBJWTZWeE5nR1VWeXJ4M3pXIn19LCJjdHgiOlt7ImRhdGEiOnsiY2xpZW50TGlicmFyeSI6Imh0dHBzOi8vZmxleC5jeWJlcnNvdXJjZS5jb20vbWljcm9mb3JtL2J1bmRsZS92Mi4wL2ZsZXgtbWljcm9mb3JtLm1pbi5qcyIsImFsbG93ZWRDYXJkTmV0d29ya3MiOlsiVklTQSJdLCJ0YXJnZXRPcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCIsImh0dHA6Ly9sb2NhbGhvc3Q6NTA0MiJdLCJtZk9yaWdpbiI6Imh0dHBzOi8vZmxleC5jeWJlcnNvdXJjZS5jb20ifSwidHlwZSI6Im1mLTIuMC4wIn1dLCJpc3MiOiJGbGV4IEFQSSIsImV4cCI6MTcxMjg4MDUwOCwiaWF0IjoxNzEyODc5NjA4LCJqdGkiOiJpYlNuYUVWMjBUNVE2endnIn0.GgJX6tAuUuQGuyRtWYq08rrTni7Tda7eI6ksqM3FcqOOE6ZMGLLJZskqzCpqNW_4lM0jbiLWqlDXVCrMmQmKBMLf4Lc1FO37ebSRqgkPTuHZyqEi5-xtkrI-0bOxAH8VTzIZMUaJIkNp-5FfCJq9voL9ZGdh5Sq-zy0e1iszsDxIY3LSYJz9d4xDTK4QwNYB4L4pjP9iQ5QBh7a9sU2J4mkJ1213WDnILY_yqn82DxVLJC8W3i78tQWKao9XDc3YGLcXA47vcb_4ziVya95bGBvgBl4_IczCBfKWjyn8k3ahzc2ij13u_09vV7B7O78VOyetcOsl6KtnPTIeB2Up-Q") {
    console.log(JSON.stringify(token));
    this.FlexInfo = this.decodeJWT(token)
    this.modal['transientTokenJwt'] = token
    this.SetupCompletionWithFlexTransientToken()
  }


}
