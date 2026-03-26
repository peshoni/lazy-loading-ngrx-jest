import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { MainOutletComponent } from "./main-outlet/main-outlet.component";
import { UsersService } from './api/users.service';

@Component({
  selector: 'app-root',
  imports: [MainOutletComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App { 
  count = 0;
  readonly greeting: WritableSignal<string | undefined> = signal(undefined);
  readonly name: WritableSignal<string | undefined> = signal(undefined);
  readonly computedGreeting: Signal<string | undefined> = computed(() => {
    if (this.greeting() && this.name()) {
      return this.greeting() + ', ' + this.name();
    }
    return undefined; 
  });

  increment() {
    this.count++;
  }
}
