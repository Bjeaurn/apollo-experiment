import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DataSource } from '@angular/cdk/table';
import { TableDataSource, PokemonItem } from './table-datasource';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() selections: Subject<PokemonItem>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  dataSource: TableDataSource;

  selectedPokemon: PokemonItem;

  constructor(private apollo: Apollo) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'classification', 'types'];

  ngOnInit() {
    this.dataSource = new TableDataSource(this.paginator, this.sort);
    this.apollo
      .watchQuery<Response>({
        query: gql`
          {
            pokemons(first: 151) {
              number,
              name,
              types,
              classification
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        this.dataSource.data = result.data.pokemons;
        console.log(result);
      });
  }

  select(row: PokemonItem) {
    this.selectedPokemon = row;
    this.selections.next(row);
  }
}

interface Response {
  pokemons: PokemonItem[];
}
