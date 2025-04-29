import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MovieModel } from '../../models/movie.model';
import { NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-search',
  imports: [
    MatTableModule,
    NgIf,
    NgFor,
    MatButtonModule,
    LoadingComponent,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  displayedColumns: string[] = ['id', 'title', 'projection', 'actions',];
  dataSource: MovieModel[] | null = null
  allMovies: MovieModel[] = [];
  searchText: string = '';
  genreList: string[] []= []
  selectedGenre: string | null = null
  dateOptions: string[] = []
  selectedDate: string | null = null
  userInput: string = ''


  public constructor(public utils: UtilsService) {
    MovieService.getMovies(0)
      .then(rsp => this.dataSource = rsp.data.slice(0, 20))
  }

  public generateSearchCriteria(source: MovieModel[]) {
    // this.genreList = source.map(obj => obj.movieGenres.map(name => name.genre.name))
    //   .filter((dest: string, i: number, ar: any[]) => ar.indexOf(dest) === i)
    this.dateOptions = source.map(obj => obj.startDate)
      .map((obj: string) => obj.split('T')[0])
      .filter((date: string, i: number, ar: any[]) => ar.indexOf(date) === i)
  }

  public doReset() {
    this.userInput = ''
    // this.selectedGenre = null
    this.selectedDate = null
    this.dataSource = this.allMovies
    this.generateSearchCriteria(this.allMovies!)
  }

  public doFilterChain() {
    if (this.allMovies == null) return

    this.dataSource = this.allMovies!
      .filter(obj => {
        // Date Search
        if (this.selectedDate == null) return true
        const start = new Date(`${this.selectedDate}T00:00:01`)
        const end = new Date(`${this.selectedDate}T23:59:59`)
        const scheduled = new Date(obj.startDate)

        return (start <= scheduled) && (scheduled <= end)
      })

    this.generateSearchCriteria(this.dataSource)
  }
}
