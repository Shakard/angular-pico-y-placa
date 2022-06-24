import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WeekDay } from '../models/week-day';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private DAYS: WeekDay[] = [
    {
      "id": 1, "name": "Sunday", "lastNumber": [], "value": 0, "morningTime": [], "nightTime": []
    },
    {
      "id": 2, "name": "Monday", "lastNumber": [1, 2], "value": 1, "morningTime": [ 7, 9.3 ], "nightTime": [ 16, 19.3 ]
    },
    {
      "id": 3, "name": "Tuesday", "lastNumber": [3, 4], "value": 2, "morningTime": [ 7, 9.3 ], "nightTime": [ 16, 19.3 ]
    },
    {
      "id": 4, "name": "Wednesday", "lastNumber": [5, 6], "value": 3, "morningTime": [ 7, 9.3 ], "nightTime": [ 16, 19.3 ]
    },
    {
      "id": 5, "name": "Thursday", "lastNumber": [7, 8], "value": 4, "morningTime": [ 7, 9.3 ], "nightTime": [ 16, 19.3 ]
    },
    {
      "id": 6, "name": "Friday", "lastNumber": [9, 0], "value": 5, "morningTime": [ 7, 9.3 ], "nightTime": [ 16, 19.3 ]
    },
    {
      "id": 7, "name": "Saturday", "lastNumber": [], "value": 6, "morningTime": [], "nightTime": []
    },   
  ];

  constructor(private http: HttpClient) { }
  // Local mock data
  public getWeekDays(): WeekDay[] {
    return this.DAYS;
  }
}