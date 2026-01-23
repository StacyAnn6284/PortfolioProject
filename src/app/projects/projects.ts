import { Component } from '@angular/core';
import { WeatherAppComponent } from './weather-app/weather-app';

@Component({
  selector: 'app-projects',
  imports: [WeatherAppComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {}
