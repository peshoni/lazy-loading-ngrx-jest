import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EXAMPLE_USER_DATA } from '../store/users.mock';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // private api = 'https://jsonplaceholder.typicode.com/users';

  // constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    // return this.http.get<any[]>(this.api);

    return of(EXAMPLE_USER_DATA);

    // EXAMPLE_USER_DATA.forEach(e => {
    //   this.store.dispatch(UsersActions.addUser({ user: { id: e.id, name: e.name, family: 'unknown' } }));
    // }); 
  }
}
