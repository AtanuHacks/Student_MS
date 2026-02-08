import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notices.html',
  styleUrl: './notices.css',
})
export class Notices {
  activeTab: 'student' | 'parent' | 'teacher' = 'student';
  currentPage = 1;
  pageSize = 3;

  notices: any = {
    student: [
      { title: 'Midterm Exams Postponed', description: 'Exams moved to May 15.', date: 'Apr 15, 2024', icon: '📘', isNew: true },
      { title: 'Summer Camp Registration', description: 'Enroll before April 30.', date: 'Apr 10, 2024', icon: '🏕️', isNew: false },
      { title: 'Sports Day Practice', description: 'Practice starts tomorrow.', date: 'Apr 09, 2024', icon: '⚽', isNew: false },
      { title: 'Library Books Due', description: 'Return books by Friday.', date: 'Apr 08, 2024', icon: '📚', isNew: false }
    ],

    parent: [
      { title: 'PTM Scheduled', description: 'Meeting on April 15.', date: 'Apr 12, 2024', icon: '👨‍👩‍👧', isNew: true },
      { title: 'Fee Reminder', description: 'Submit fees before due date.', date: 'Apr 07, 2024', icon: '💳', isNew: false }
    ],

    teacher: [
      { title: 'Staff Meeting', description: 'Mandatory meeting at 2 PM.', date: 'Apr 11, 2024', icon: '👩‍🏫', isNew: true },
      { title: 'Syllabus Submission', description: 'Submit by April 20.', date: 'Apr 06, 2024', icon: '📋', isNew: false }
    ]
  };

  switchTab(tab: 'student' | 'parent' | 'teacher') {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.notices[this.activeTab].length / this.pageSize);
  }

  get paginatedNotices() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.notices[this.activeTab].slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}

