import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeekDay } from 'src/app/models/week-day';
import { DayService } from 'src/app/services/day.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private dayService: DayService,
    ) { }

  ngOnInit(): void {
    this.buildFormChair();   
  }

  buildFormChair() {
    this.formChair = this.formBuilder.group({
      id: [null],
      plate: [null],
      date: [null],
      time: [null]
    });
  }

  get userIdField() {
    return this.formChair.get('date');
  }

  onSubmitChair() {
    this.getTime();
    this.predictor();
  }

  searchDayValue(value: number) {
    return this.dayService.getWeekDays().filter(x => x.value == value)[0];
  }

  getTime() {
    this.time = ((this.formChair.get(`time`)?.value.getMinutes())*0.01) + this.formChair.get(`time`)?.value.getHours()
    console.log(this.time);    
  }

  predictor() {
    const selectedDay = this.searchDayValue(this.formChair.get(`date`)?.value.getDay())
    if (selectedDay.name == "Sunday" || selectedDay.name == "Saturday") {
      console.log('Happy Driving');      
    } else {
      console.log(selectedDay);      
      if ((this.time >= selectedDay.morningTime[0] && this.time <= selectedDay.morningTime[1]) || (this.time >= selectedDay.nightTime[0] && this.time <= selectedDay.nightTime[1])) {
        console.log('Cant Drive');
      } else {
        console.log('Lucky');                
      }
    }
  }
}
