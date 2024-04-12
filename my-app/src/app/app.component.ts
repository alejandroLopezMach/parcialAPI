import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { catchError, retry, throwError, Observable} from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  characters: any;

  constructor(
    private http: HttpClient,
  ) { }
  ngOnInit(): void {
    this.GetCharacters();
  }
  GetCharacters(): void {
    this.getCharactersService().subscribe((data:any)=>{
      this.characters = data.results
    })
   }

  //gettzing rick and morty characters
  getCharactersService(): Observable<any> {
    const urlApi = `https://rickandmortyapi.com/api/character`;
    return this.http
      .get<any>(urlApi)
      .pipe(
        retry(1),
        catchError((error) => throwError(() => error))
      );
  }
}
