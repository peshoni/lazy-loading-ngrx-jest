import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { map, switchMap } from 'rxjs/operators';
import { Observable, merge, of } from 'rxjs';
import { Vehicle } from '../../models/models';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { page, selectVehicles, sortVehicles } from './../../store/vehicles.selectors'; 

export class VehiclesListDataSource extends DataSource<Vehicle> {
  private store: Store = inject(Store);
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  vehicles$: Observable<Vehicle[]>;

  constructor() {
    super();
    this.vehicles$ = this.store.select(selectVehicles);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Vehicle[]> {
    if (this.paginator && this.sort) {
      return merge(this.vehicles$, this.paginator.page, this.sort.sortChange).pipe(
        switchMap((fromWhere) => {
          if (Object.hasOwn(fromWhere, 'direction')) { // Sorting
            const sort: Sort = fromWhere as Sort;
            if (this.paginator) {
              const { startIndex, endIndex } = this.getIndexes(this.paginator);
              return this.store.select(sortVehicles<Vehicle>(sort.active as keyof Vehicle, sort.direction, startIndex, endIndex));
            }
          } else if (Object.hasOwn(fromWhere, 'previousPageIndex')) { // Pagination
            const pageEvent: PageEvent = fromWhere as PageEvent;
            const { startIndex, endIndex } = this.getIndexes(pageEvent);
            return this.store.select(page(startIndex, endIndex));
          } else if (this.paginator) {
            const { startIndex, endIndex } = this.getIndexes(this.paginator);
            return this.store.select(page(startIndex, endIndex));
          }

          return of(fromWhere as Vehicle[]);
        }),
        map((result: Vehicle[]) => result));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  private getIndexes(arg: { pageIndex: number, pageSize: number; }) {
    const startIndex = arg.pageIndex * arg.pageSize;
    const endIndex = startIndex + arg.pageSize;
    return { startIndex, endIndex };
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }
}
