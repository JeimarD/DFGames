import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentpageService {
  currentPage: number = 1;

  constructor() { }
}
