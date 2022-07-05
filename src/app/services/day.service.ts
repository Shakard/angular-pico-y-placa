import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeekDay } from '../models/week-day';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  // Local mock data
  private DAYS: WeekDay[] = [
    {
      "id": 1, "name": "Sunday", "lastNumber": [], "value": 0, "morningTime": [], "nightTime": []
    },
    {
      "id": 2, "name": "Monday", "lastNumber": [1, 2], "value": 1, "morningTime": [7, 9.3], "nightTime": [16, 19.3]
    },
    {
      "id": 3, "name": "Tuesday", "lastNumber": [3, 4], "value": 2, "morningTime": [7, 9.3], "nightTime": [16, 19.3]
    },
    {
      "id": 4, "name": "Wednesday", "lastNumber": [5, 6], "value": 3, "morningTime": [7, 9.3], "nightTime": [16, 19.3]
    },
    {
      "id": 5, "name": "Thursday", "lastNumber": [7, 8], "value": 4, "morningTime": [7, 9.3], "nightTime": [16, 19.3]
    },
    {
      "id": 6, "name": "Friday", "lastNumber": [9, 0], "value": 5, "morningTime": [7, 9.3], "nightTime": [16, 19.3]
    },
    {
      "id": 7, "name": "Saturday", "lastNumber": [], "value": 6, "morningTime": [], "nightTime": []
    },
  ];

  constructor(private http: HttpClient) { }
  // Service that returns the days of the week with their "pico y placa" configurations
  public getWeekDays(): WeekDay[] {
    return this.DAYS;
  }
  // I search for the day of the week by its value
  searchDayValue(value: number) {
    return this.getWeekDays().filter(x => x.value == value)[0];
  }
  // Validate if the time is in the range of the morning time
  canDrive(time: number, morningTime1: number, morningTime2: number): boolean {
    if (time >= morningTime1 && time <= morningTime2) {
      return true;
    }
    return false;
  }
  // Returns true if the day is weekend
  isWeekend(day: String): boolean {
    if (day == "Sunday" || day == "Saturday") {
      return true;
    }
    return false;
  }
  // Returns true if the last number of the license is the same as the selected day
  isLastNumber(plateNumber:number, lastNumber1: number, lastNumber2: number): boolean {
    if (lastNumber1 == plateNumber || lastNumber2 == plateNumber) {
    return true;
    }
    return false;
  }
}