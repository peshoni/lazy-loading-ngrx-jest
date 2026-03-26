import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { VehiclesListDataSource } from './vehicles-list-datasource';
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Vehicle } from '../../models/models';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import * as VehiclesActions from './../../store/vehicles.actions';


@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.scss',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatIcon, MatMenuModule, MatButtonModule, AsyncPipe],
})
export class VehiclesListComponent implements AfterViewInit {
  private store: Store = inject(Store);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Vehicle>;
  dataSource: VehiclesListDataSource = new VehiclesListDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'brand', 'fuel', 'actions'];
  constructor() {
    //  this. dataSource  = new VehiclesListDataSource( );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  showDetails(row: any) { //
    // console.log(this.activatedRoute);
    this.router.navigate(['details/' + row.id], { relativeTo: this.activatedRoute });
  }
  deleteRow(row: Vehicle) {
    this.store.dispatch(VehiclesActions.removeById({ id: row.id }));
  }
}
