import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameService } from './services/GameService/game.service';
import { GamesListComponent } from './games-list/games-list-component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GameDetailsComponent } from './game-details/game-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component'
import { ReactiveFormsModule } from "@angular/forms"
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    GameDetailsComponent,
    PageNotFoundComponent,
    HomeComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CarouselModule
    
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
