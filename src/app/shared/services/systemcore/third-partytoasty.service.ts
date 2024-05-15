import { DatePipe } from '@angular/common';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { LocalHttpClient } from './http-client.service';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

// import * as XLSX from 'xlsx'
// import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartytoastyService {
  private options: GlobalConfig;
  public modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, public datepipe: DatePipe, private router: Router, private sanitizer: DomSanitizer, private toastr: ToastrService, private localHttpClient: LocalHttpClient, private http: HttpClient) {
    this.options = this.toastr.toastrConfig;
  }


  info(title: string, msg: string) {
    this.toastr.info(msg, title, { progressBar: true });
  }
  success(title?: string, msg?: string) {
    this.toastr.success(msg ? msg : 'Success!', title ? title : 'We Done 👋',);
  }

  error(msg?: string, title?: string) {
    this.toastr.error(title ? title : 'Error', msg ? msg : 'Error!');
  }
  dFormat = 'yyyy-MM-dd';
  dateFormat(val: string) {
    return val ? this.datepipe.transform(val, this.dFormat) : '';
  }
  tFormat = 'HH:mm:ss';
  timeFormat(val: string) {
    return val ? this.datepipe.transform(val, this.tFormat) : '';
  }
  navigateTo(link: string) {
    this.router.navigate([link])
  }

  openSepareteLinkInApp(link: string) {
    window.open(location.origin + "/#/" + link, '_blank');
  }

  openSepareteLink(link: string) {
    window.open(link, '_blank');
  }
  ShowModel(template: any, custom?: any) {
    this.modalRef = this.modalService.show(template, custom);
  }
  CloseModelTemp(template: any) {
    template?.hide()
  }
  CloseModel(modelId: string) {
    let doc: any = document;
    doc.querySelector('#' + modelId).classList.remove('md-show');
  }
  sanitizerHtml(txt: string) {
    return this.sanitizer.bypassSecurityTrustHtml(txt);
  }
  sanitizeriFrame(txt: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(txt);
  }
  ShowError(txt: string) {
    // Swal.fire({ icon: 'error', text: txt })
  }

  getAttachemntUrl(imgName: string, defaultImgUrl = "") {
    if (imgName && imgName != 'Not Defined') {
      return `${this.localHttpClient.baseUrlWithoutApi}/Resources/${imgName}`
    } else {
      return `${this.localHttpClient.baseUrlWithoutApi}/Resources/${defaultImgUrl}`
    }
  }
  getAttachmentUploadUrl() {
    return `${this.localHttpClient.baseUrlWithoutApi}/api/Attachments/singleUpload`
  }
  makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
  extractStringUntilFirstDot(inputString: string) {
    const dotIndex = inputString.indexOf('.');
    if (dotIndex !== -1) {
      return [
        inputString.substring(0, dotIndex),
        inputString.substring(dotIndex + 1, inputString.length),
      ];
    } else {
      return inputString;
    }
  }

  checkValidation(obj: any, props: string[], indexToFail: any = null) {
    let isValid = true;
    let failerFields: any[] = []
    props.forEach(key => {
      if (key.indexOf(".") == -1) {
        if (!Array.isArray(obj)) {
          if (!this.checkRowValidation(obj, key)) {
            isValid = false;
            failerFields.push({ key: key })
          }
        } else {
          obj.forEach((r: any, i) => {
            if (!this.checkRowValidation(r, key)) {
              isValid = false;
              failerFields.push({ key: key, i: i })
            }
          })
        }
      }
      else if (!Array.isArray(obj) && key.indexOf(".") != -1) {
        let splittedKeys = this.extractStringUntilFirstDot(key);
        let newSubObj = obj[splittedKeys[0]]
        let validationRes: any = this.checkValidation(newSubObj, [splittedKeys[1]])
        if (!validationRes.isValid) {
          isValid = false;
          failerFields.push(...validationRes.failerFields)
        }
      }
      else if (Array.isArray(obj) && key.indexOf(".") != -1) {
        obj.forEach((row: any, i) => {
          let splittedKeys = this.extractStringUntilFirstDot(key);
          let newSubObj = row[splittedKeys[0]]
          if (newSubObj) {
            let validationRes: any = this.checkValidation(newSubObj, [splittedKeys[1]])
            if (!validationRes.isValid) {
              isValid = false;
              failerFields.push(...validationRes.failerFields)
            }
          } else {
            isValid = false;
            failerFields.push({ key: splittedKeys[0], i: i })
          }

        })
      }
    })
    return { isValid: isValid, failerFields: failerFields };
  }
  checkRowValidation(obj: any, z: any) {
    return obj[z];
  }
  saveFiles(file: any) {
    let randomKey = this.makeid(5);
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file, file.name);

      // if (filesControl && filesControl.value && filesControl.value.length > 0) {
      //   // <File>filesControl.value.forEach(fileToUpload => {
      //   //   formData.append('file', fileToUpload, fileToUpload.name);
      //   // });
      //   filesControl.setValue([]);
      // } else {
      //   
      // }
      this.http.post(this.getAttachmentUploadUrl(), formData, { reportProgress: true, observe: 'events', headers: this.httpOptions.headers })
        .subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          }
          else if (event.type === HttpEventType.Response) {
            resolve(event.body.data);
          }
        }, e => {
          console.log(e);
        });
    });

  }
  progress: any
  httpOptions = {
    headers: new HttpHeaders({
    })
  };
  authenticatedHttp() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem("lebwoiubpaneltoken")
      })
    };
  }
  LoadExcelTemplate() {

  }
  // s2ab(s) {
  //   var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  //   var view = new Uint8Array(buf);  //create uint8array as viewer
  //   for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
  //   return buf;
  // }
  // export(lstCols, lstData, exportType) {
  //   if (exportType == "excel") {
  //     this.exportToExcel(lstCols, lstData)
  //   } else if (exportType == "csv") {
  //     this.exportToCSV(lstCols, lstData)
  //   }
  // }
  // extractData(lstCols, lstData) {
  //   var ws_data = [];
  //   //Headers
  //   let colsRow = [];
  //   lstCols.forEach(col => {
  //     colsRow.push(col.label);
  //   });
  //   ws_data.push(colsRow)
  //   //Data

  //   lstData.forEach((d, i) => {
  //     let dataRow = [];
  //     lstCols.forEach(col => {
  //       let fieldVal = col.prop == "INDEX" ? i + 1 : d[col.prop];
  //       if (col.type == "date") {
  //         fieldVal = this.dateFormat(fieldVal)
  //       }

  //       if (col.prop.indexOf(".") != -1) {
  //         let props = col.prop.split(".")
  //         fieldVal = d[props[0]][props[1]]
  //       }
  //       dataRow.push(fieldVal);
  //     });
  //     ws_data.push(dataRow)
  //   });
  //   return ws_data
  // }
  // exportToExcel(lstCols, lstData) {
  //   var wb = XLSX.utils.book_new();
  //   wb.Props = {
  //     Title: "Forecast Template",
  //     Subject: "Forecast Template",
  //     Author: "Bahjat Badarin",
  //     CreatedDate: new Date()
  //   };
  //   wb.SheetNames.push("Test Sheet");

  //   let ws_data = this.extractData(lstCols, lstData)
  //   var ws = XLSX.utils.aoa_to_sheet(ws_data);
  //   wb.Sheets["Test Sheet"] = ws;
  //   var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  //   saveAs(new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }), `ExportData${new Date()}.xlsx`);
  // }
  // exportToCSV(lstCols, lstData) {
  //   var wb = XLSX.utils.book_new();
  //   wb.Props = {
  //     Title: "Forecast Template",
  //     Subject: "Forecast Template",
  //     Author: "Bahjat Badarin",
  //     CreatedDate: new Date()
  //   };
  //   let ws_data = this.extractData(lstCols, lstData)
  //   var ws = XLSX.utils.aoa_to_sheet(ws_data);
  //   var csv = XLSX.utils.sheet_to_csv(ws);
  //   saveAs(new Blob([this.s2ab(csv)], { type: "application/octet-stream" }), "sheetjs.csv");
  // }


  combineDateTime(dateInput: any, timeInput: any) {
    const [year, month, day] = dateInput.split('-').map(Number);
    const [hours, minutes] = timeInput.split(':').map(Number);
    //+2 important to fix the combination
    const combinedDateTime = new Date(year, month - 1, day, hours + 2, minutes);
    return combinedDateTime;
  }
  getCurrentDayLkpKey(date: any) {
    return this.lstDaysLkps.find(z => z.relatedDayIndex == date.getDay())?.value
  }
  addMinuteToDateTime(myDate: any, durationInMin: any) {
    let date = new Date(myDate)
    return date.setMinutes(date.getMinutes() + durationInMin);
  }

  calculateAge(birthdate: Date) {
    let currentDate = new Date()
    const birthDateObj = new Date(birthdate);
    const currentDateObj = new Date(currentDate);

    const yearsDiff = currentDateObj.getFullYear() - birthDateObj.getFullYear();
    const monthsDiff = currentDateObj.getMonth() - birthDateObj.getMonth();
    const daysDiff = currentDateObj.getDate() - birthDateObj.getDate();

    let ageYears = yearsDiff;
    let ageMonths = monthsDiff;
    let ageDays = daysDiff;

    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      ageYears--;
      ageMonths = monthsDiff + 12;
      ageDays = daysDiff + new Date(currentDateObj.getFullYear(), currentDateObj.getMonth(), 0).getDate();
    }

    return `${ageYears} Year(s), ${ageMonths} Month(s), ${ageDays} Day(s)`;
  }


  lstActiveStatusLkps = [
    { 'value': '', 'label': 'All' },
    { 'value': true, 'label': 'Active Only' },
    { 'value': false, 'label': 'Not Active' }
  ]
  lstUsersTypesLkps = [
    { 'value': '1', 'label': 'Users' },
    { 'value': '2', 'label': 'Patients' },
    { 'value': '3', 'label': 'Doctors' }
  ]
  lstDaysLkps = [
    { 'value': 0, relatedDayIndex: 6, 'label': 'Saturday' },
    { 'value': 1, relatedDayIndex: 0, 'label': 'Sunday' },
    { 'value': 2, relatedDayIndex: 1, 'label': 'Monday' },
    { 'value': 3, relatedDayIndex: 2, 'label': 'Tuesday' },
    { 'value': 4, relatedDayIndex: 3, 'label': 'Wednesday' },
    { 'value': 5, relatedDayIndex: 4, 'label': 'Thursday' },
    { 'value': 6, relatedDayIndex: 5, 'label': 'Friday' }
  ]



  fullPatientComponentView = {
    view: 'full',
    showNavs: true,
    showButtons: true,
    lstFieldsToShow:
    {
      'id': {},
      'manualUserId': {},
      'nameEn1': {},
      'nameEn2': {},
      'nameEn3': {},
      'nameEn4': {},
      'nameAr1': {},
      'nameAr2': {},
      'nameAr3': {},
      'nameAr4': {},
      'idNumber': {},
      'addressAr': {},
      'addressEn': {},
      'birthDate': {},
      'genderId': {},
      'stateId': {},
      'countryId': {},
      'cityId': {},
      'phone1': {},
      'phone2': {},
      'email': {},
      'tel1': {},
      'tel2': {},
      'website': {},
      'isActive': {},
      'allowToLogin': {},
      'userName': {},
      'password': {}
    }
  }


  quickPatientComponentView = {
    view: 'quick',
    showNavs: false,
    lstFieldsToShow:
    {
      'id': {},
      'manualUserId': {},
      'nameEn1': {},
      'nameEn2': {},
      'nameEn3': {},
      'nameEn4': {},
      'nameAr1': {},
      'nameAr2': {},
      'nameAr3': {},
      'nameAr4': {},
      'idNumber': {},
      'addressAr': {},
      'addressEn': {},
      'birthDate': {},
      'genderId': {},
      'stateId': {},
      'countryId': {},
      'cityId': {},
      'phone1': {},
      'phone2': {},
      'email': {},
      'tel1': {},
      'tel2': {},
      'website': {},
      'isActive': {},
      'allowToLogin': {},
      'userName': {},
      'password': {}
    }
  }
}
