import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class HarryPotterApiService {
  private readonly baseUrl = 'https://hp-api.onrender.com/api';

  constructor(private readonly http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters`);
  }

  getCharactersByHouse(house: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters/house/${house}`);
  }

  getCharacterById(id: string): Observable<Character | null> {
    return this.http
      .get<Character[]>(`${this.baseUrl}/character/${id}`)
      .pipe(map((result) => (result.length > 0 ? result[0] : null)));
  }
}
