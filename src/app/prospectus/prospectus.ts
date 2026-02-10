import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-prospectus',
  standalone: true,
  imports: [CommonModule,NgxExtendedPdfViewerModule],
  templateUrl: './prospectus.html',
  styleUrl: './prospectus.css',
})
export class Prospectus {

  next_step = 0;

next() {
  this.next_step = 1;
}

closeViewer() {
  this.next_step = 0;
}
}