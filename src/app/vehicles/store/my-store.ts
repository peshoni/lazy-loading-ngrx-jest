import { MemoizedSelector, Store } from "@ngrx/store";
import { Vehicle } from "../models/models";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class PepeStore<T> extends Store<T> {
    instant(selector: (state: T) => Vehicle | undefined): Vehicle | undefined {
        return this.selectSignal(selector)();
    } 
}