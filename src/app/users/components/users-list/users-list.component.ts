import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { UsersListDataSource } from './users-list-datasource';
import { MatMenu, MatMenuModule } from "@angular/material/menu";
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { User } from '../../models/models';
import { Store } from '@ngrx/store';
import * as UsersActions from './../../store/users.actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  providers: [],
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatMenu, MatIcon, MatMenuModule, MatButtonModule, AsyncPipe
  ],
})
export class UsersListComponent implements AfterViewInit {
  private store: Store = inject(Store);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  dataSource = new UsersListDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'family', 'actions'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  showDetails(row: any) {
    console.log(row);
    this.router.navigate(['details/' + row.id], { relativeTo: this.activatedRoute });
  }
  deleteRow(user: User) { 
    this.store.dispatch(UsersActions.removeById({id:user.id}));
  }
}
