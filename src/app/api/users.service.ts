import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EXAMPLE_USER_DATA } from '../users/store/users.mock';
import { User } from '../users/models/models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // private api = 'https://jsonplaceholder.typicode.com/users'; 
  private users: BehaviorSubject<User[]> = new BehaviorSubject(EXAMPLE_USER_DATA);

  getUsers(): Observable<User[]> {
    // return this.http.get<any[]>(this.api);
    // API CALL 
    return this.users.asObservable();
  }

  update(user: User) {
    const newPersistedState = this.users.getValue().map(u => u.id === user.id ? user : u); // Mock API mutation    
    this.users.next(newPersistedState);
    return of(user);
  }
  deleteById(id:number){
    
  }
}
