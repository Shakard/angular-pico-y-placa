import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.scss']
})
export class PredictorComponent implements OnInit {
  formChair: FormGroup;
  
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.buildFormChair();
  }

  buildFormChair() {
    this.formChair = this.formBuilder.group({
      id: [null],
      plate: [null],
      date: [null],
    });
  }

  onSubmitChair() {
    console.log(this.formChair.value);
    console.log();    
  }

}
