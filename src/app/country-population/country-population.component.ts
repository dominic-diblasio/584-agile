import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CountryPopulation } from '../country-population';

@Component({
  selector: 'app-country-population',
  imports: [
    RouterLink
    /* Import Something Here to fetch ID */
  ],
  templateUrl: './country-population.component.html',
  styleUrl: './country-population.component.scss'
})
export class CountryPopulationComponent implements OnInit {

  public population: CountryPopulation | undefined;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.getCountryPopulation();
  }

  getCountryPopulation() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.http.get<CountryPopulation>(`${environment.baseUrl}api/Countries/GetPopulation/${id}`).subscribe({
      next: result => this.population = result,
      error: error => console.error(error)
    }
    );
  }
}
