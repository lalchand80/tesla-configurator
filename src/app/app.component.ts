import {Component, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonService } from './services/common.service';
import { CarSummary } from './models/car-model.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  public carSummary!: CarSummary;

  constructor(private commonService: CommonService){}
  
  ngOnInit(): void {
    this.commonService.getCarSummary().subscribe(response => {
      this.carSummary = response;
    });
  }
}
