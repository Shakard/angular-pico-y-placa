import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DayService } from 'src/app/services/day.service';
import { SweetMessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.scss']
})
export class PredictorComponent implements OnInit {
  formChair: FormGroup;
  minute: number;
  hour: number;
  time: number;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private dayService: DayService,
    private messageService: SweetMessageService
  ) { }

  ngOnInit(): void {
    this.buildFormChair();
  }

  buildFormChair() {
    this.formChair = this.formBuilder.group({
      plate: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      date: [null, Validators.required],
      time: [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formChair.controls;
  }

  onSubmitChair() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formChair.invalid) {
      return;
    }
    this.getTime();
    this.predictor();
  }

  searchDayValue(value: number) {
    return this.dayService.getWeekDays().filter(x => x.value == value)[0];
  }

  getTime() {
    this.time = ((this.formChair.get(`time`)?.value.getMinutes()) * 0.01) + this.formChair.get(`time`)?.value.getHours()
  }

  predictor() {
    const selectedDay = this.searchDayValue(this.formChair.get(`date`)?.value.getDay())    
    var plateNumber = this.formChair.get('plate')?.value;
    var plateNumber = plateNumber.slice(plateNumber.length - 1);    
     
    if (selectedDay.name == "Sunday" || selectedDay.name == "Saturday") {
      this.messageService.canDriveMessage();
    } else {
      if (((this.time >= selectedDay.morningTime[0] && this.time <= selectedDay.morningTime[1]) || (this.time >= selectedDay.nightTime[0] && this.time <= selectedDay.nightTime[1])) && (selectedDay.lastNumber[0] == plateNumber || selectedDay.lastNumber[1] == plateNumber)) {
        this.messageService.canNotDriveMessage();
      } else {
        this.messageService.canDriveMessage();
      }
    }
  }
}
