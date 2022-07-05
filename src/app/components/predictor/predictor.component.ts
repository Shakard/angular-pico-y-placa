import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeekDay } from 'src/app/models/week-day';
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
  plateNumber: number;
  selectedDay: WeekDay;
  // Needed services are injected
  constructor(
    private formBuilder: FormBuilder,
    private dayService: DayService,
    private messageService: SweetMessageService
  ) { }

  ngOnInit(): void {
    this.buildFormPredictor();
  }
  // First I create the predictor form with its fields and validations
  buildFormPredictor() {
    this.formPredictor = this.formBuilder.group({
      plate: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      date: [null, Validators.required],
      time: [null, Validators.required]
    });
  }
  // Convenience getter for easy access to form fields
  get formControl() {
    return this.formPredictor.controls;
  }
  // Get the hours and minutes of the input and join them
  getTime() {
    this.time = ((this.formPredictor.get(`time`)?.value.getMinutes()) * 0.01) + this.formPredictor.get(`time`)?.value.getHours()
  }
  // Get the last number of the license plate
  getPlateNumber() {
    const rawPlate = this.formPredictor.get('plate')?.value;
    this.plateNumber = rawPlate.slice(rawPlate.length - 1);
  }
  // Get the selected day
  getDay() {
    this.selectedDay = this.dayService.searchDayValue(this.formPredictor.get(`date`)?.value.getDay());
  }
  // Validates the morning time of the day
  canDriveMorning() {
    return this.dayService.canDrive(this.time, this.selectedDay.morningTime[0], this.selectedDay.morningTime[1]);
  }
  // Validates the night time of the day
  canDriveNight() {
    return this.dayService.canDrive(this.time, this.selectedDay.nightTime[0], this.selectedDay.nightTime[1]);
  }
  // Returns true if the day is weekend
  isWeekend() {
    return this.dayService.isWeekend(this.selectedDay.name);
  }
  // Returns true if the last number of the license is the same as the selected day
  isPlateLastNumber() {
    return this.dayService.isLastNumber(this.plateNumber, this.selectedDay.lastNumber[0], this.selectedDay.lastNumber[1]);
  }

  predictor() {
    // Discard Saturdays and Sundays, and check the conditions
    if (this.isWeekend()) {
      this.messageService.canDriveMessage();
    } else {
      if ((this.canDriveMorning() || this.canDriveNight()) && this.isPlateLastNumber()) {
        this.messageService.canNotDriveMessage();
      } else {
        this.messageService.canDriveMessage();
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formPredictor.invalid) {
      return;
    }
    this.getDay();
    this.getPlateNumber();
    this.getTime();
    this.predictor();
  }

  resetForm() {
    this.submitted = false;
    this.formPredictor.reset();
  }
}
