import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './styles/app-material.module';

@NgModule({
  imports: [CommonModule, FormsModule, AppMaterialModule, ReactiveFormsModule],
  exports: [CommonModule, FormsModule, AppMaterialModule, ReactiveFormsModule]
})
export class SharedModule {}  
