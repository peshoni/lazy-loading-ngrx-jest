import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../models/models';
import { selectById } from '../../store/users.selectors';
import { UserApiActions } from './../../store/users.actions';
import { PathSegments } from '../../../shared/path-segments.enum';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class UserDetailsComponent {
  private store: Store = inject(Store);
  private router: Router = inject(Router);
  private fb = inject(FormBuilder);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  paramId: number;
  form = this.fb.group({
    name: ['', Validators.required],
    family: ['', Validators.required],
  });

  constructor() {
    this.paramId = +this.activatedRoute.snapshot.params['id'];
    this.store.select(selectById(this.paramId)).subscribe(
      (user) => {
        if (user) {
          this.form.patchValue(user);
        }
      }
    );
  }

  onSubmit(): void {
    const user: User = {
      ...this.form.value,
      id: this.paramId
    } as User;
    if (this.paramId) {
      this.store.dispatch(UserApiActions['[Users]UpdateUser']({ user }));
      this.router.navigate([PathSegments.USERS]);
    } else {
      alert('Create new entry');
    }
  }
}
