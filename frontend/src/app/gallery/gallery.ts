import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
      categories = [
    'All',
    'Science Fair',
    'Annual Day',
    'Classrooms',
    'Drawing Competition',
    'Sports Day',
    'Independence Day'
  ];

  // 🔥 IMPORTANT: activeCategory define hona chahiye
  activeCategory: string = 'All';

  images = [
    { src: '/g1.jpeg', category: 'Science Fair' },
    { src: '/g2.jpeg', category: 'Science Fair' },
    { src: '/g3.jpeg', category: 'Annual Day' },
    { src: '/g4.jpeg', category: 'Classrooms' },
    { src: '/g5.jpeg', category: 'Sports Day' },
    { src: '/g6.jpeg', category: 'Drawing Competition' },
    { src: '/g7.jpeg', category: 'Independence Day' },
    { src: '/g8.jpeg', category: 'Annual Day' }
  ];

  // 🔥 IMPORTANT: setCategory function hona chahiye
  setCategory(category: string) {
    this.activeCategory = category;
  }

  filteredImages() {
    if (this.activeCategory === 'All') {
      return this.images;
    }
    return this.images.filter(
      img => img.category === this.activeCategory
    );
  }

}
