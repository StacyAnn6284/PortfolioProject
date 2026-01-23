import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private geocodKey = environment.geocodApiKey;

  constructor(private http: HttpClient) {}

  convertToLatAndLong(location: string): Observable<{ lat: number; lng: number }> {
    const url = `https://api.geocod.io/v1.7/geocode?q=${encodeURIComponent(
      location,
    )}&api_key=${this.geocodKey}`;

    return this.http.get<any>(url).pipe(
      map((data) => {
        if (!data.results || data.results.length === 0) {
          throw new Error('No geocoding results found');
        }

        const { lat, lng } = data.results[0].location;
        return { lat, lng };
      }),
    );
  }

  getWeatherPoint(lat: number, lng: number): Observable<any> {
    return this.http.get<any>(`https://api.weather.gov/points/${lat},${lng}`);
  }

  getForecastFromPoint(pointData: any): Observable<any> {
    const forecastUrl = pointData.properties.forecast;
    return this.http.get<any>(forecastUrl);
  }

  getForecast(location: string): Observable<any> {
    return this.convertToLatAndLong(location).pipe(
      switchMap(({ lat, lng }) => this.getWeatherPoint(lat, lng)),
      switchMap((pointData) => this.getForecastFromPoint(pointData)),
    );
  }
}
