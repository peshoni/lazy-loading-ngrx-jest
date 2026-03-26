import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgClass } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, take } from 'rxjs/operators';
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-main-outlet',
  templateUrl: './main-outlet.component.html',
  styleUrl: './main-outlet.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    NgClass,
    AsyncPipe,
    RouterOutlet,
    NgClass 
],
})
export class MainOutletComponent {  
  private breakpointObserver = inject(BreakpointObserver);
  private router: Router = inject(Router);
  currentPath:string = ''; 
  constructor(){
    this.router.events.pipe(
      filter(e=>e instanceof NavigationEnd),
      take(1)
    ).subscribe(e=>{
      const segments = e.url.split('/'); 
      this.currentPath = segments[1]
    })
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );
}
