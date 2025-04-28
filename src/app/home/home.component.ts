import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { MovieModel } from '../../models/movie.model';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-home',
  imports: [JsonPipe, NgIf, NgFor, MatButtonModule, MatCardModule, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public movies: MovieModel[] | null = null
  public error: string | null = null

  constructor() {
    MovieService.getMovies()
.then(rsp => {
  console.log("API Response:", rsp.data);
  this.movies = rsp.data;
})
.catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`);


}}
