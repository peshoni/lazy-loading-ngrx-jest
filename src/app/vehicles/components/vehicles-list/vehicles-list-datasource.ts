import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { map, switchMap } from 'rxjs/operators';
import { Observable, merge, of } from 'rxjs';
import { Vehicle } from '../../models/models';
import { inject } from '@angular/core';
import { VehiclesDataStore } from '../../signal-store/vehicles.datasource';
import { sortItems } from '../../../shared/util-functions';

export class VehiclesListDataSource extends DataSource<Vehicle> {
  readonly vehiclesDataStore = inject(VehiclesDataStore);
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  vehicles$: Observable<Vehicle[]>;

  constructor() {
    super();
    this.vehicles$ = this.vehiclesDataStore.getCurrentState$();//.loadAll();// this.store.select(selectVehicles);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Vehicle[]> {
    if (this.paginator && this.sort) {
      // const a: Observable<Vehicle[]> = of(this.vehiclesDataStore.entities());
      return merge(this.vehiclesDataStore.getCurrentState$(), this.paginator.page, this.sort.sortChange).pipe(
        switchMap((fromWhere) => {
          const entities: Vehicle[] = this.vehiclesDataStore.entities();
          if (Object.hasOwn(fromWhere, 'direction')) { // Sorting
            const sort: Sort = fromWhere as Sort;
            if (this.paginator) {
              const { startIndex, endIndex } = this.getIndexes(this.paginator);
              return of(sortItems(sort.active, this.vehiclesDataStore.entities(), sort.active as keyof Vehicle, startIndex, endIndex));
              // return  sortItems<Vehicle> ( ) this.vehiclesDataStore.sortVehicles(sort.active as keyof Vehicle, sort.direction, startIndex, endIndex)
              // this.store.select(sortVehicles<Vehicle>(sort.active as keyof Vehicle, sort.direction, startIndex, endIndex));
            }
          } else if (Object.hasOwn(fromWhere, 'previousPageIndex')) { // Pagination
            const pageEvent: PageEvent = fromWhere as PageEvent;
            const { startIndex, endIndex } = this.getIndexes(pageEvent);
            // const vehicles:Vehicle[] = this.vehiclesDataStore.entities();
            return of(entities.slice(startIndex, endIndex));// this.store.select(page(startIndex, endIndex));
          } else if (this.paginator) {
            const { startIndex, endIndex } = this.getIndexes(this.paginator);
            return of(this.vehiclesDataStore.entities().slice(startIndex, endIndex)); //this.store.select(page(startIndex, endIndex));
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
