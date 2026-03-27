import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../../models/models';
import { VehiclesDataStore } from '../../signal-store/vehicles.datasource';
@Component({
  selector: 'app-vehicle-details',
  imports: [JsonPipe],
  templateUrl: './vehicle-details.html',
  styleUrl: './vehicle-details.scss',
})
export class VehicleDetails implements OnDestroy {
  private vehiclesDataStore = inject(VehiclesDataStore);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  vehicle!: Vehicle | null;
  paramId: number;
  constructor() {
    this.paramId = +this.activatedRoute.snapshot.params['id'];
    this.vehiclesDataStore.selectById(this.paramId);
    this.vehicle = this.vehiclesDataStore.selectedEntity();
  }
  ngOnDestroy(): void {
    this.vehiclesDataStore.clearSelection();
  }
}
