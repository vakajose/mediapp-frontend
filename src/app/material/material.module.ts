import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule, MatToolbarModule, MatPaginator, MatPaginatorModule, MatIconModule, MatButtonModule, MatSortModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSnackBarModule, MatSidenavModule, MatMenuModule, MatDividerModule, MatDialogModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatExpansionModule, MatAutocompleteModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatAutocompleteModule
  ],
  exports: [
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatAutocompleteModule
  ],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class MaterialModule { }
