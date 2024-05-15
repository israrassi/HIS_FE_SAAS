import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';
import { HISLogicService } from 'src/app/shared/services/HIS_Logic/HISLogic.service';
import { LookupsService } from 'src/app/shared/services/Lookups/lookups.service';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent {
  pageSetup: any = {
    selectedCalendarGroupView: 0,
  }

  @ViewChild('addAppointment') addAppointmentModal?: TemplateRef<HTMLDivElement>;
  options?: CalendarOptions;

  calendarEvents: any[] = [
    // { title: 'Event 1', start: '2024-03-10T04:49:00', end: '2024-03-10T05:49:00' },
    // { title: 'Event 2', start: '2024-03-10T05:30:00', end: '2024-03-10T06:49:00' },
  ];
  handleDateSelect(arg: any) {
    this.AddAppointment(arg.event._def.extendedProps.relatedAppointmentId)
  }

  constructor(public thirdPartytoastyService: ThirdPartytoastyService, private HISLogicService: HISLogicService, private lookupsService: LookupsService) {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialDate: new Date(),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      events: [
        { title: 'Meeting', start: new Date() }
      ],
      eventClick: this.handleDateSelect.bind(this)
    };
    this.loadLookups()
  }
  lstKeysRequiredOnInventoryLookups = ['Branches', 'Gender', 'Clinics'];
  lstInventoryLookupsByKey: any = {}
  loadLookups() {
    this.lstKeysRequiredOnInventoryLookups.forEach(key => {
      this.lookupsService.Lookups(key).subscribe(z => {
        this.lstInventoryLookupsByKey[key] = z;


        if (key == "Branches") {
          if (this.lstInventoryLookupsByKey['Branches'].length > 0) {
            this.pageSetup.selectedBranchId = this.lstInventoryLookupsByKey['Branches'][0].value
            this.selectedBranchChanged()
          }
          else {
            alert("Error, Please check branch id");
          }
        }
      })
    })
    this.searchPatients()

    // this.lstInventoryLookupsByKey['CalendarGroups'] = [
    //   { value: 0, label: "Basic" },
    //   { value: 1, label: "Doctors Grouping" },
    //   { value: 2, label: "Departments Grouping" },
    // ]
  }

  addAppointmentModel: any = {}
  AddAppointment(id: any = null) {
    if (!this.pageSetup.selectedBranchId) {
      this.thirdPartytoastyService.error("Select branch", "Error")
      return
    }
    if (id) {
      this.HISLogicService.AppointmentDetails(id).subscribe(z => {
        this.addAppointmentModel = z
        this.selectPatient()
        this.addAppointmentModel['startDate'] = this.thirdPartytoastyService.dateFormat(this.addAppointmentModel['fromDate'])
        this.addAppointmentModel['startTime'] = this.thirdPartytoastyService.timeFormat(this.addAppointmentModel['fromDate'])
        this.selectedDepartmentChanged()
        this.getRelatedAppointment()
      })
    } else {
      this.addAppointmentModel = { branchId: this.pageSetup.selectedBranchId }
      this.setInitPatient()
    }
    this.relatedDoctorAppointmentSetup = {}
    this.thirdPartytoastyService.ShowModel(this.addAppointmentModal, { class: 'modal-xl', backdrop: 'static' })
  }
  setInitPatient(patientObj: any = null) {
    if (patientObj) {
      patientObj['birthDate'] = this.thirdPartytoastyService.dateFormat(patientObj['birthDate'])
      this.addAppointmentModel['patient'] = patientObj
    } else {
      this.addAppointmentModel['patient'] = { isActive: true, userType: 3 }
    }
  }
  parseAddAppointmentToServer() {
    let model = JSON.parse(JSON.stringify(this.addAppointmentModel));
    if (model['patientId']) {
      delete model['patient']
    }

    if (this.relatedDoctorAppointmentSetup && this.relatedDoctorAppointmentSetup.durationInMin) {
      model['toDate'] = this.thirdPartytoastyService.addMinuteToDateTime(model['fromDate'], this.relatedDoctorAppointmentSetup.durationInMin)
      if (model['toDate']) {
        model['toDate'] = new Date(model['toDate'])
      }
    }
    return model
  }
  closeAddAppointment(save: boolean = false) {
    if (save) {
      this.saveAppointment()
    } else {
      this.thirdPartytoastyService.modalRef?.hide()
    }

    this.lstInventoryLookupsByKey['lstDoctors'] = []
  }

  reqFields: any = ['branchId', 'departmentId', 'doctorId', 'startDate', 'startTime', 'patient.nameEn1', 'patient.nameAr1', 'patient.nameEn4', 'patient.nameAr4', 'patient.phone1']
  saveAppointment() {
    let validRes = this.thirdPartytoastyService.checkValidation(this.addAppointmentModel, this.reqFields);
    if (validRes.isValid) {
      let objToServer = this.parseAddAppointmentToServer()
      this.HISLogicService.AddAppointment(objToServer).subscribe(z => {
        if (z.status) {
          this.thirdPartytoastyService.success();
          this.AppointmentSearch()
          this.thirdPartytoastyService.modalRef?.hide()
        }
      })
    } else {
      this.thirdPartytoastyService.error("Fill required fields")
    }
  }
  selectedBranchChanged() {
    this.AppointmentSearch()
    this.MasterDepartmentChanged()
    if (this.pageSetup.selectedBranchId) {
      this.searchDepartments(this.pageSetup.selectedBranchId)
    } else {
      this.lstInventoryLookupsByKey['lstDoctors'] = []
    }
  }
  selectedCalendarGroupViewChanged() {
    setTimeout(() => {
      this.fetchCalendarEvents()
    }, 1);
  }

  fetchCalendarEvents() {
    this.calendarEvents = this.lstAppointments.map((a: any) => {
      return { title: `Doctor: ${a.doctorName} - Patient: ${a.patientName}`, start: a.fromDate, end: a.toDate, relatedAppointmentId: a.id }
    })

    // this.options = undefined;
    // setTimeout(() => {

    // this.calendarEvents = []
    // if (this.pageSetup.selectedCalendarGroupView == 0) {
    // this.calendarEvents = this.lstAppointments.map((a: any) => {
    //   return { title: `Doctor: ${a.doctorName} - Patient: ${a.patientId}`, start: a.fromDate, end: a.toDate }
    // })
    // this.options = {
    //   plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    //   initialDate: new Date(),
    //   headerToolbar: {
    //     left: 'prev,next today',
    //     center: 'title',
    //     right: 'dayGridMonth,timeGridWeek,timeGridDay',
    //   },
    //   initialView: 'dayGridMonth',
    //   editable: true,
    //   selectable: true,
    //   selectMirror: true,
    //   dayMaxEvents: true,
    //   events: [
    //     { title: 'Meeting', start: new Date() }
    //   ],
    // };
    //   } else if (this.pageSetup.selectedCalendarGroupView == 1) {
    //     this.calendarEvents = this.lstAppointments.map((a: any) => {
    //       return { title: `Patient: ${a.patientId}`, start: a.fromDate, end: a.toDate }
    //     })
    //     this.options = {
    //       plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    //       initialDate: new Date(),
    //       headerToolbar: {
    //         center: 'customTitle',
    //       },
    //       initialView: 'dayGridDay',
    //       editable: true,
    //       selectable: true,
    //       selectMirror: true,
    //       dayMaxEvents: true,
    //       events: [
    //         { title: 'Meeting', start: new Date() }
    //       ],
    //       customButtons: {
    //         customTitle: {
    //           text: "this.dynamicTitle", // Dynamically set the title text
    //           click: () => {
    //           }
    //         }
    //       }
    //     };

    //   }
    // }, 10);
  }
  selectPatient() {
    setTimeout(() => {
      if (this.addAppointmentModel.patientId) {
        this.HISLogicService.AppointmentPatientDetails(this.addAppointmentModel.patientId).subscribe(z => {
          this.setInitPatient(z)
        })
      } else {
        this.setInitPatient()
      }
    }, 1);
  }
  MasterDepartmentChanged(fromDom: any = false) {
    setTimeout(() => {
      // if (this.pageSetup.departmentId) {
      this.lookupsService.LookupsWithObj({ categoryCode: 'UserBasedType', userTypeId: 2, departmentId: this.pageSetup.departmentId ?? "", branchId: this.pageSetup.selectedBranchId }).subscribe(z => {
        this.lstInventoryLookupsByKey['lstMasterDoctors'] = z;
      })
      if (fromDom) {
        this.AppointmentSearch()
      }
      // } else {
      //   this.lstInventoryLookupsByKey['lstDoctors'] = []
      // }
    }, 1);
  }
  selectedDepartmentChanged() {
    setTimeout(() => {
      if (this.pageSetup.selectedBranchId) {
        this.searchDoctors(this.addAppointmentModel.departmentId, this.addAppointmentModel.branchId)
      } else {
        this.lstInventoryLookupsByKey['lstDoctors'] = []
      }
    }, 1);
  }
  searchDoctors(departmentId: any, branchId: any) {
    this.lookupsService.LookupsWithObj({ categoryCode: 'UserBasedType', userTypeId: 2, departmentId: departmentId, branchId: branchId }).subscribe(z => {
      this.lstInventoryLookupsByKey['lstDoctors'] = z;
    })
  }
  searchPatients() {
    this.lookupsService.LookupsWithObj({ categoryCode: 'UserBasedType', userTypeId: 3 }).subscribe(z => {
      this.lstInventoryLookupsByKey['lstPatients'] = z;
    })
  }
  searchDepartments(branchId: number) {
    this.lookupsService.LookupsWithObj({ categoryCode: 'Departments', branchId: branchId }).subscribe(z => {
      this.lstInventoryLookupsByKey['Departments'] = z;
    })
  }

  AppointmentDatesChanged() {
    if (this.addAppointmentModel.startDate && this.addAppointmentModel.startTime) {
      this.addAppointmentModel.fromDate = this.thirdPartytoastyService.combineDateTime(this.addAppointmentModel.startDate, this.addAppointmentModel.startTime)
    }
    this.fetchRelatedAppointmentSetup(this.relatedDoctorAppointmentSetup)
  }
  relatedDoctorAppointmentSetup: any = {}
  lstDoctorAvailableAppointments: any = []
  getRelatedAppointment() {
    let selectedDate: any = this.addAppointmentModel['startDate'] ? new Date(this.addAppointmentModel['startDate']) : new Date()
    this.HISLogicService.DoctorAvailableAppointments(this.addAppointmentModel.branchId, this.addAppointmentModel.departmentId, this.addAppointmentModel.doctorId, this.thirdPartytoastyService.dateFormat(selectedDate)).subscribe(z => {
      z.lstData.forEach((e: any) => {
        e['label'] = `${e['fromTime']} - ${e['toTime']}`;
        if (e.relatedAppointmentId && (e.fromTime != this.addAppointmentModel['startTime'])) {
          e['disabled'] = true
          e['label'] += " Reserved"
        } else {
          // e['isActive'] = false
        }
        
      });
      this.lstDoctorAvailableAppointments = z.lstData
    })
    this.HISLogicService.AppointmentSetupDetails({
      doctorId: this.addAppointmentModel.doctorId,
      departmentId: this.addAppointmentModel.departmentId,
      branchId: this.addAppointmentModel.branchId
    }).subscribe(z => {
      this.relatedDoctorAppointmentSetup = z;
      this.fetchRelatedAppointmentSetup(this.relatedDoctorAppointmentSetup)
    })
  }
  fetchRelatedAppointmentSetup(z: any) {
    setTimeout(() => {
      let appointmentDate = this.addAppointmentModel['startDate'] ? new Date(this.addAppointmentModel['startDate']) : new Date()
      if (z) {
        let currentDayValue = this.thirdPartytoastyService.getCurrentDayLkpKey(appointmentDate);
        let currentDay = this.thirdPartytoastyService.lstDaysLkps.find(z => z.value == currentDayValue)
        let relatedDayDetails = this.relatedDoctorAppointmentSetup.lstDetails.find((d: any) => d.inDay == currentDayValue);
        if (relatedDayDetails) {
          this.relatedDoctorAppointmentSetup['relatedDayDetails'] = relatedDayDetails
          this.relatedDoctorAppointmentSetup['currentDay'] = currentDay
        }
      }
    }, 1);
  }
  lstAppointments: any = []
  AppointmentSearch() {
    let currentViewDates = this.getCurrentDays()
    this.HISLogicService.AppointmentsList(1, 1000, '', currentViewDates.start, currentViewDates.end, this.pageSetup.selectedBranchId, this.pageSetup.departmentId ?? "", this.pageSetup.doctorId ?? "").subscribe(z => {
      this.lstAppointments = z.lstData;
      this.fetchCalendarEvents()
    })
  }


  @ViewChild('fullcalendar') fullcalendar: any;
  getCurrentDays() {
    const calendarApi = this.fullcalendar.getApi();
    const view = calendarApi.view;
    const start = view.activeStart;
    const end = view.activeEnd;
    const daysInCurrentView = this.getDaysArray(start, end);
    return { start: this.thirdPartytoastyService.dateFormat(start), end: this.thirdPartytoastyService.dateFormat(end) }
  }


  getDaysArray(start: Date, end: Date) {
    const days = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }


}
