import { Component, inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WeatherApiService } from './services/weather-api.service';
import { ForecastPeriod } from './models/weatherPeriod.model';
import { ProjectArrowComponent } from '../project-arrow/project-arrow';

@Component({
  selector: 'app-weather-app',
  templateUrl: 'weather-app.html',
  styleUrl: 'weather-app.scss',
  imports: [ReactiveFormsModule, ProjectArrowComponent],
})
export class WeatherAppComponent implements OnInit {
  public weatherSearchForm!: FormGroup;
  private _formbuilder = inject(FormBuilder);
  public forecastPeriods: ForecastPeriod[] = [];
  public expanded: boolean[] = [];
  public tempToF: number = 0;

  constructor(private formBuilder: FormBuilder) {}
  private weatherApi = inject(WeatherApiService);

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: new FormControl(''),
    });
  }

  public weatherLocation = '';
  public currentWeather: any;

  sendToWeatherApi() {
    const location = this.weatherSearchForm.value.location ?? '';
    this.weatherLocation = location;

    this.weatherApi.getWeather(location).subscribe({
      next: (weather) => {
        console.log(weather);
        this.currentWeather = weather;
        this.tempToF = Math.round((weather.main.temp - 273.15) * (9 / 5) + 32);
      },
      error: (err) => console.error('Weather error:', err),
    });
    this.weatherApi.getForecast(location).subscribe({
      next: (forecast) => {
        this.forecastPeriods = forecast.properties?.periods ?? [];
        this.expanded = this.forecastPeriods.map(() => false);
      },
      error: (err) => console.error('Forecast error:', err),
    });
  }

  toggle(index: number) {
    this.expanded[index] = !this.expanded[index];
  }

  //if shortForecast contains.... snow - show snow, sunny, show sun, etc.
}
