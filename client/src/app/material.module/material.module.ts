import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatInputModule, MatStepperModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatStepperModule,
    MatCardModule,
    ScrollDispatchModule,
    MatToolbarModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatStepperModule,
    MatCardModule,
    ScrollDispatchModule,
    MatToolbarModule,
  ]
})
export class MaterialModule {}
