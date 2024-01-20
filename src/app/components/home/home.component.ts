import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CommonService } from '../../services/common.service';
import { BASE_URL, CarColor, CarModel, CarSummary } from '../../models/car-model.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public carModels!: CarModel[];
  subs: Subscription = new Subscription;
  // carModels!: Observable<CarModel[]>;
  public carSummary!: CarSummary;
  public selectedCarModel!: CarModel;
  public selectedCarImageUrl: string = '';

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    // this.carModels = this.commonService.getCarModels();

    this.subs = this.commonService.getCarModels().subscribe((response: CarModel[]) => {
      this.carModels = response;

      this.commonService.getCarSummary().subscribe(response => {
        this.carSummary = response;
        if (this.carSummary?.code != '') {
          let tempCarModel = this.carModels?.find(element => element?.code === this.carSummary?.code);
          if (tempCarModel != undefined) {
            this.selectedCarModel = tempCarModel;
            this.selectedCarImageUrl = this.createCarImageURL(this.carSummary?.code, this.carSummary?.color?.code);
          }
        }
      });
    });
  }

  onModelSelect(carModelCode: string) {
    let tempCarModel = this.carModels?.find(element => element?.code === carModelCode);
    if (tempCarModel != undefined) {
      this.selectedCarModel = tempCarModel;

      this.carSummary.code = this.selectedCarModel?.code;
      this.carSummary.description = this.selectedCarModel?.description;
      this.carSummary.color = this.selectedCarModel?.colors[0];
      this.carSummary.config = {id: 0, description: '', range: 0, speed: 0, price: 0};
      this.carSummary.towHitch = false;
      this.carSummary.yoke = false;

      this.selectedCarImageUrl = this.createCarImageURL(this.carSummary.code, this.carSummary?.color?.code);
      this.commonService.setCarSummary(this.carSummary);
    }
  }

  onColorSelect(colorCode: string){
    let colorObj = this.selectedCarModel?.colors?.find(element => element.code === colorCode);
    this.selectedCarImageUrl = this.createCarImageURL(this.selectedCarModel?.code, colorCode);
    if (colorObj != undefined) {
      this.carSummary.color = colorObj;
      this.commonService.setCarSummary(this.carSummary);
    }
  }

  createCarImageURL(cmCode: string, ccCode: string){
    return `${BASE_URL}/${cmCode}/${ccCode}.jpg`;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  
}