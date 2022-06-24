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
  formPredictor: FormGroup;
  minute: number;
  time: number;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private dayService: DayService,
    private messageService: SweetMessageService
  ) { }

  ngOnInit(): void {
    this.buildFormPredictor();
  }

  buildFormPredictor() {
    this.formPredictor = this.formBuilder.group({
      plate: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      date: [null, Validators.required],
      time: [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get formControl() {
    return this.formPredictor.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formPredictor.invalid) {
      return;
    }
    this.getTime();
    this.predictor();
  }

  searchDayValue(value: number) {
    return this.dayService.getWeekDays().filter(x => x.value == value)[0];
  }

  getTime() {
    this.time = ((this.formPredictor.get(`time`)?.value.getMinutes()) * 0.01) + this.formPredictor.get(`time`)?.value.getHours()
  }

  predictor() {
    const selectedDay = this.searchDayValue(this.formPredictor.get(`date`)?.value.getDay())
    var plateNumber = this.formPredictor.get('plate')?.value;
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
