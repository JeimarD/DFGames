import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { GameService } from '../services//GameService/game.service';
import { CurrentpageService } from '../services/PageService/currentpage.service';
import { of } from 'rxjs';
import { Game } from '../interfaces/game.interface';
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { ReactiveFormsModule } from '@angular/forms';

import { GamesListComponent } from './games-list-component';

describe('GamesListComponent', () => {
  let component: GamesListComponent;
  let fixture: ComponentFixture<GamesListComponent>;
  let gameService: GameService;
  let pageService: CurrentpageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesListComponent],
      providers: [GameService, CurrentpageService, FormBuilder],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesListComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    pageService = TestBed.inject(CurrentpageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve games on initialization', () => {
    const games: Game[] = [
      {
        id: 1,
        title: "title1",
        thumbnail: "thumbnail.png",
        short_description: "short description",
        game_url: "url.url",
        genre: "Action",
        platform: "PC",
        publisher: "Publisher",
        developer: "Developer",
        release_date: "DD/MM/YYYY",
        freetogame_profile_url: "profile.url",
      },
      {
        id: 2,
        title: "title2",
        thumbnail: "thumbnail2.png",
        short_description: "short description 2",
        game_url: "url.url2",
        genre: "Shooter",
        platform: "PC",
        publisher: "Publisher2",
        developer: "Deeveloper",
        release_date: "DD/MM/YYYY",
        freetogame_profile_url: "profile.url2",
      },
    ];
    spyOn(gameService, 'getAllGames').and.returnValue(of(games));

    component.ngOnInit();

    expect(gameService.getAllGames).toHaveBeenCalled();
    expect(component.games).toEqual(games);
    expect(component.filteredGames).toEqual(games);
    expect(component.isLoading).toBeFalse();
  });

  it('should filter games based on form values', () => {
    const games : Game[] = [
      { id: 1, title: 'Game 1', genre: 'Action', platform: 'PC', thumbnail: '', short_description: '', game_url: '', publisher: '', developer: '', release_date: '', freetogame_profile_url: '' },
    { id: 2, title: 'Game 2', genre: 'Adventure', platform: 'Xbox', thumbnail: '', short_description: '', game_url: '', publisher: '', developer: '', release_date: '', freetogame_profile_url: '' },
    ];

    component.games = games;

    const formValue = { search: 'Game 1', genre: 'Action', platform: 'PC' };
    component.filterForm.setValue(formValue);

    component.filterGames().subscribe((filteredGames) => {
      expect(filteredGames).toEqual([games[0]]);
    });
  });

  it('should update the current page value', () => {
    const page = 2;

    component.setPageValue(page);

    expect(pageService.currentPage).toBe(page);
  });
});
