import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GameService } from '../services/GameService/game.service';
import { GameDetails } from '../interfaces/game.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
})
export class GameDetailsComponent implements OnInit {
  gameId: number = 0;
  game: GameDetails | null = null;
  loading: boolean = true;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private location : Location,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.gameId = id ? +id : 0;
    });
    this.gameService
      .getDetailedGameData(this.gameId)
      .subscribe(
        (data: GameDetails) => {
          this.loading = false;
          this.game = data;
          this.spinner.hide();
        },
        (error) => {
          this.router.navigate(['/404']);
        }
      );
  }

  goBack(): void {
    this.location.back();
  }
}
