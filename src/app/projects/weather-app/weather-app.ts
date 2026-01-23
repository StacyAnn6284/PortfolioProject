import { Component, inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WeatherApiService } from './services/weather-api.service';
import { ForecastPeriod } from './models/weatherPeriod.model';

@Component({
  selector: 'app-weather-app',
  templateUrl: 'weather-app.html',
  styleUrl: 'weather-app.scss',
  imports: [ReactiveFormsModule],
})
export class WeatherAppComponent implements OnInit {
  public weatherSearchForm!: FormGroup;
  private _formbuilder = inject(FormBuilder);
  public forecastPeriods: ForecastPeriod[] = [];
  public expanded: boolean[] = [];

  constructor(private formBuilder: FormBuilder) {}
  private weatherApi = inject(WeatherApiService);

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: new FormControl(''),
    });
  }

  public weatherLocation = '';

  sendToWeatherApi() {
    const location = this.weatherSearchForm.value.location;
    this.weatherApi.getForecast(location).subscribe({
      next: (forecast) => {
        console.log(forecast);
        this.forecastPeriods = forecast.properties?.periods ?? [];

        this.expanded = this.forecastPeriods.map(() => false);
      },
      error: (err) => console.error(err),
    });
    this.weatherLocation = this.weatherSearchForm.value.location ?? '';
  }
  toggle(index: number) {
    this.expanded[index] = !this.expanded[index];
  }

  //if shortForecast contains.... snow - show snow, sunny, show sun, etc.
}
