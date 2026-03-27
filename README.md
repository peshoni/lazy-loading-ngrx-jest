# lazy-loading-ngrx-jest
Simple example for lazy-loaded domains, NgRx and Jest in Angular 21


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.3.


## Development server

To start a local development server, run:

```bash
ng serve
```
## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests 

```bash
npm test
```

## State Management Architecture
This project leverages a hybrid state management approach using NgRx, combining the power of the classic Redux pattern with the simplicity of modern Signals.

- Global State (Classic NgRx)
Used for cross-cutting concerns and complex application logic where event traceability is critical.
Store & Reducers: Handles global application state and immutable data flow.
Actions: Explicitly defines unique events across the system (e.g., Auth, Global Settings).
Effects: Manages side effects and complex asynchronous orchestrations.

- Reactive Data Services (NgRx SignalStore)
Used for entity-based state and individual API endpoints (e.g., Vehicles, Users) to reduce boilerplate.
Signal-Based: Built on Angular Signals for fine-grained reactivity and optimal performance without the need for the async pipe.
withEntities: Provides high-performance CRUD operations using an internal entityMap (O(1) lookup).
withComputed: Derives state automatically (e.g., filteredEntities, selectedEntity) with built-in memoization.
rxMethod: Handles asynchronous API calls in a declarative way, ensuring automatic cleanup and race-condition management.

- Why this Hybrid Approach?  
Scalability: Classic NgRx provides a clear audit trail for mission-critical logic.
Developer Experience: SignalStore drastically reduces boilerplate for standard CRUD modules.
Performance: Signals minimize change detection cycles, making the UI highly responsive.

 
