import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gamesUrl = environment.gamesUrl;
  private detailedGameUrl = environment.detailedGameUrl;

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<any> {
    return this.http.get(this.gamesUrl);
  }

  getDetailedGameData(id: number): Observable<any> {
    return this.http.get(`${this.detailedGameUrl}/?id=${id}`);
  }

  getFilteredGames(apiUrl: string): Observable<any> {
    return this.http.get(`${this.gamesUrl}?${apiUrl}`);
  }
}
