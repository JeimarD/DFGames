import { Component, OnInit } from '@angular/core';
import { Game } from '../interfaces/game.interface';
import { GameService } from '../services/GameService/game.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, map } from 'rxjs';
import { CurrentpageService } from '../services/PageService/currentpage.service';

@Component({
  selector: 'app-games-list-component',
  templateUrl: './games-list-component.html',
  styleUrls: ['./games-list-component.scss'],
})
export class GamesListComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  pageSize: number = 9;
  currentPage: number = 1;
  filterForm: FormGroup;
  isLoading: boolean = true;

  constructor(
    private gameService: GameService,
    private formBuilder: FormBuilder,
    private pageService: CurrentpageService,
  ) {
    this.filterForm = this.formBuilder.group({
      search: [''],
      genre: [''],
      platform: [''],
    });
    
    this.currentPage = pageService.currentPage;
  }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => this.filterGames())
      )
      .subscribe((filteredGames: Game[]) => {
        this.filteredGames = filteredGames;
        this.currentPage = 1;
      });

    this.getGames();
  }

  getGames(): void {
    this.gameService.getAllGames().subscribe((data: Game[]) => {
      this.games = data;
      this.filteredGames = data;
      this.isLoading = false;
      console.log(this.games);
    });
  }

  filterGames(): Observable<Game[]> {
    const { search, genre, platform } = this.filterForm.value;

    let apiUrl = '';
    if (genre) apiUrl += `&category=${genre}`;
    if (platform) apiUrl += `&platform=${platform}`;

    return this.gameService.getFilteredGames(apiUrl).pipe(
      map((games: Game[]) => {
        if (search) {
          const searchTerm = search.toLowerCase();
          return games.filter((game) =>
            game.title.toLowerCase().includes(searchTerm)
          );
        }
        return games;
      })
    );
  }

  setPageValue(page: number): void {
    this.pageService.currentPage = page;
  }

  notFound(): void {
    setTimeout(() => {
      if(this.isLoading) {
        this.isLoading = false;
      }
    }, 5000);
  }
}
