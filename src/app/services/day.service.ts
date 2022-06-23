import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WeekDay } from '../models/week-day';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private DAYS: WeekDay[] = [
    {
      "id": 1, "name": "Sunday", "value": 0, "morningTime": [], "nightTime": []
    },
    {
      "id": 2, "name": "Monday", "value": 1, "morningTime": [ 7, 9.3 ], "nightTime": [ 16, 19.3 ]
    },
    {
      "id": 3, "name": "Tuesday", "value": 2, "morningTime": [ 7, 9.3 ], "nightTime": [ 16, 19.3 ]
    },
    {
      "id": 4, "name": "Wednesday", "value": 3, "morningTime": [ 7, 9.3 ], "nightTime": [ 16, 19.3 ]
    },
    {
      "id": 5, "name": "Thursday", "value": 4, "morningTime": [ 7, 9.3 ], "nightTime": [ 16, 19.3 ]
    },
    {
      "id": 6, "name": "Friday", "value": 5, "morningTime": [ 7, 9.3 ], "nightTime": [ 16, 19.3 ]
    },
    {
      "id": 7, "name": "Saturday", "value": 6, "morningTime": [], "nightTime": []
    },    
  ];

  constructor(private http: HttpClient) { }
  // Local mock data
  public getWeekDays(): WeekDay[] {
    return this.DAYS;
  }
}