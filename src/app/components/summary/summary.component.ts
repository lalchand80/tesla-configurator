import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BASE_URL, CarSummary } from '../../models/car-model.model';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  public carSummary!: CarSummary;
  public selectedCarImageUrl: string = '';
  public totalCost: number = 0;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getCarSummary().subscribe(response => {
      this.carSummary = response;
      this.selectedCarImageUrl = `${BASE_URL}/${this.carSummary.code}/${this.carSummary?.color?.code}.jpg`
      this.calculateTotalCost();
    });
  }

  calculateTotalCost(){
    this.totalCost = (this.carSummary?.yoke && this.carSummary?.towHitch) ? (this.carSummary?.config?.price + this.carSummary?.color?.price + 2000) : (this.carSummary?.yoke || this.carSummary?.towHitch) ? (this.carSummary?.config?.price + this.carSummary?.color?.price + 1000) : (this.carSummary?.config?.price + this.carSummary?.color?.price);
  }
}
