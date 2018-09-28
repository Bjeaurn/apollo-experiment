import { Component } from '@angular/core';
import { PokemonItem } from './table/table-datasource';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selections: Subject<PokemonItem> = new Subject<PokemonItem>();
}
