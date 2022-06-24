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
  plateNumber: number;
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
  // I search for the day of the week by its value
  searchDayValue(value: number) {
    return this.dayService.getWeekDays().filter(x => x.value == value)[0];
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

  predictor() {
    // Get the selected day from the date input, discard Saturdays and Sundays, and check the conditions
    const selectedDay = this.searchDayValue(this.formPredictor.get(`date`)?.value.getDay())
    if (selectedDay.name == "Sunday" || selectedDay.name == "Saturday") {
      this.messageService.canDriveMessage();
    } else {
      if (((this.time >= selectedDay.morningTime[0] && this.time <= selectedDay.morningTime[1]) || (this.time >= selectedDay.nightTime[0] && this.time <= selectedDay.nightTime[1])) && (selectedDay.lastNumber[0] == this.plateNumber || selectedDay.lastNumber[1] == this.plateNumber)) {
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
    this.getPlateNumber();
    this.getTime();
    this.predictor();
  }

  resetForm() {
    this.submitted = false;
    this.formPredictor.reset();
  }
}
