import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommonService } from '../../services/common.service';
import { BASE_URL, CarConfig, CarOption, CarSummary } from '../../models/car-model.model';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {
  
  public carOption!: CarOption;
  subs: Subscription = new Subscription;
  // carModels!: Observable<CarModel[]>;
  public carSummary!: CarSummary;
  public selectedCarConfig!: CarConfig;
  public selectedCarImageUrl: string = '';

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    // this.carModels = this.commonService.getCarModels();

    this.commonService.getCarSummary().subscribe(response => {
      this.carSummary = response;
      this.selectedCarImageUrl = `${BASE_URL}/${this.carSummary.code}/${this.carSummary?.color?.code}.jpg`

      this.subs = this.commonService.getCarOptions(this.carSummary.code).subscribe((response: CarOption) => {
        this.carOption = response;
        if (this.carSummary?.config?.description != '') {
          let tempCarConfig = this.carOption?.configs?.find(element => element?.description === this.carSummary?.config?.description);
          if (tempCarConfig != undefined) {
            this.selectedCarConfig = tempCarConfig;
          }  
        }
      });
    });
  }

  onConfigSelect(carConfigDesc: string) {
    let tempCarConfig = this.carOption?.configs?.find(element => element?.description === carConfigDesc);
    if (tempCarConfig != undefined) {
      this.selectedCarConfig = tempCarConfig;

      this.carSummary.config = this.selectedCarConfig;
      this.commonService.setCarSummary(this.carSummary);
    }
  }

  onOptionsChecked(event: Event){
    const target = event?.target as HTMLInputElement;
    switch(target?.name){
      case 'towHitch':
        this.carSummary.towHitch = target?.checked;
        this.commonService.setCarSummary(this.carSummary);
        break;
      case 'yoke':
        this.carSummary.yoke = target?.checked;
        this.commonService.setCarSummary(this.carSummary);
        break;  
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
