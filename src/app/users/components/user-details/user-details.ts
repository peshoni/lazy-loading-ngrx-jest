import { Component, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UsersActions from './../../store/users.actions';
import { User } from '../../models/models';
import { selectById } from '../../store/users.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  private store: Store = inject(Store);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  user: Observable<User | undefined>;
  paramId: number;
  constructor() {
    this.paramId = +this.activatedRoute.snapshot.params['id'];
    this.user = this.store.select(selectById(this.paramId));
  }
}
