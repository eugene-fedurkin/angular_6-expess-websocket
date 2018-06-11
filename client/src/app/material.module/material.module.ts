import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatStepperModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatStepperModule,
    MatCardModule,
    ScrollDispatchModule,
    MatToolbarModule,
    MatDialogModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatStepperModule,
    MatCardModule,
    ScrollDispatchModule,
    MatToolbarModule,
    MatDialogModule,
  ]
})
export class MaterialModule {}
