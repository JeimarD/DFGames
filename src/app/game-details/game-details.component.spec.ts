import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GameService } from '../services//GameService/game.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { GameDetailsComponent } from './game-details.component';
import { of } from 'rxjs';
import { GameDetails } from '../interfaces/game.interface';
import { HttpClientTestingModule } from "@angular/common/http/testing"

describe('GameDetailsComponent', () => {
  let component: GameDetailsComponent;
  let fixture: ComponentFixture<GameDetailsComponent>;
  let gameService: GameService;
  let location: Location;
  let activatedRoute: ActivatedRoute;
  let spinnerService: NgxSpinnerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSpinnerModule, HttpClientTestingModule],
      declarations: [GameDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' })
          }
        },
        { provide: Location, useValue: jasmine.createSpyObj('Location', ['back']) },
        { provide: NgxSpinnerService, useValue: jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']) }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailsComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
    location = TestBed.inject(Location);
    activatedRoute = TestBed.inject(ActivatedRoute);
    spinnerService = TestBed.inject(NgxSpinnerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve game details on ngOnInit', () => {
    const gameData: GameDetails = {
      id: 1,
      title: "Title",
      thumbnail: "img.png",
      status: "Active",
      short_description: "Description",
      description: "Long Description",
      game_url: "game.url",
      genre: "Action",
      platform: "PC",
      publisher: "Publihser",
      developer: "Developer",
      release_date: "DD/MM//YYYY",
      freetogame_profile_url: "game.url",
      minimum_system_requirements: {
        os: "os",
        processor: "proccessor",
        graphics: "graphics",
        storage: "storage"
      },
      screenshots: [{
        id: 1,
        image: "img.png"
      }],
    };
    
    const getDetailedGameDataSpy = spyOn(gameService, 'getDetailedGameData').and.returnValue(of(gameData));

    component.ngOnInit();

    expect(getDetailedGameDataSpy).toHaveBeenCalledWith(component.gameId);
    expect(component.loading).toBeFalse();
    expect(component.game).toBe(gameData);
    expect(spinnerService.hide).toHaveBeenCalled();
  });

  it('should navigate back on goBack', () => {
    component.goBack();

    expect(location.back).toHaveBeenCalled();
  });
});
