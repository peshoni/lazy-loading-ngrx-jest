import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, merge, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { page, selectUsers, sortUsers } from '../../store/users.selectors';
import { User } from '../../models/models';


/**
 * Data source for the UsersList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersListDataSource extends DataSource<User> {
  private store: Store = inject(Store);
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  users$: Observable<User[]>;
  constructor() {
    super();
    this.users$ = this.store.select(selectUsers);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    if (this.paginator && this.sort) {
      return merge(this.users$, this.paginator.page, this.sort.sortChange).pipe(
        switchMap((fromWhere) => {
          if (Object.hasOwn(fromWhere, 'direction')) { // Sorting
            const sort: Sort = fromWhere as Sort;
            if (this.paginator) {
              const { startIndex, endIndex } = this.getIndexes(this.paginator);
              return this.store.select(sortUsers<User>(sort.active as keyof User, sort.direction, startIndex, endIndex));
            }
          } else if (Object.hasOwn(fromWhere, 'previousPageIndex')) { // Pagination
            const pageEvent: PageEvent = fromWhere as PageEvent;
            const { startIndex, endIndex } = this.getIndexes(pageEvent);
            return this.store.select(page(startIndex, endIndex));
          } else if (this.paginator) {
            console.log(fromWhere);
            const { startIndex, endIndex } = this.getIndexes(this.paginator);
            return this.store.select(page(startIndex, endIndex));
          }

          return of(fromWhere as User[]);
        }),
        map((result: User[]) => result));
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
