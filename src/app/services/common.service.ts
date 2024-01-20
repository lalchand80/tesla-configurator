import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarModel, CarOption, CarSummary } from '../models/car-model.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public carSummary = new BehaviorSubject<CarSummary>({
    code: '',
    description: '',
    color: {
      code: '',
      description: '',
      price: 0
    },
    config: {id: 0,
      description: '',
      range: 0,
      speed: 0,
      price: 0},
    towHitch: false,
    yoke: false
});

  constructor(private http: HttpClient) { }

  getCarModels(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>('/models');
  }

  getCarOptions(carModel: string): Observable<CarOption> {
    return this.http.get<CarOption>(`/options/${carModel}`);
  }

  setCarSummary(carSummary: CarSummary){
    this.carSummary.next(carSummary);
  }

  getCarSummary(){
    return this.carSummary;
  }
}
