import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonItem } from '../table/table-datasource';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input()
  selected: Observable<PokemonItem>;

  pokemon: PokemonItem = '';

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    // this.apollo.subscribe({
    //   query: gql`
    //   {
    //     pokemon() {

    //     }
    //   }`
    // });

    this.selected.subscribe(p => {
      this.pokemon = p;
    });
  }
}
