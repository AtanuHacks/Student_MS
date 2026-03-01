import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notices.html',
  styleUrl: './notices.css',
})
export class Notices implements OnInit {

  noticeValue: string | null = null;

  constructor(private route: ActivatedRoute) {}

  // ===============================
  // Notice Page Logic
  // ===============================

  activeTab: 'student' | 'parent' | 'teacher' = 'student';
  currentPage = 1;
  pageSize = 3;

  notices: any = {

    student: [
      { title: 'Admission Open 2026', description: 'Admission Are Open for 2026-27 Academic Year.', date: 'March 15, 2026', icon: '📘', isNew: true , isapply: true},
      { title: 'PTM Schedule', description: 'PTM On April 15th.', date: 'Apr 15, 2024', icon: '🏕️', isNew: false },
      { title: 'Exam Schedule', description: 'Final Exam Schedule is available.', date: 'Apr 09, 2024', icon: '⚽', isNew: false },
      { title: 'Result Announcement', description: 'Final Results are now available.', date: 'Apr 08, 2024', icon: '📚', isNew: false }
    ],

    parent: [
      { title: 'PTM Schedule', description: 'PTM On April 15th.', date: 'Apr 15, 2024', icon: '🏕️', isNew: false },
      { title: 'Fee Reminder', description: 'Submit fees before due date.', date: 'Apr 07, 2024', icon: '💳', isNew: false }
    ],

    teacher: [
      { title: 'Staff Meeting', description: 'Mandatory meeting at 2 PM.', date: 'Apr 11, 2024', icon: '👩‍🏫', isNew: true },
      { title: 'Syllabus Submission', description: 'Submit by April 20.', date: 'Apr 06, 2024', icon: '📋', isNew: false }
    ]
  };

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      const notice = params['notice'];

      // 🔁 Always reset first (VERY IMPORTANT)
      this.activeTab = 'student';
      this.currentPage = 1;
      this.noticeValue = null;

      if (!notice) return;

      this.noticeValue = notice;

      const lowerTitle = notice.toLowerCase();

      for (const tab of ['student', 'parent', 'teacher'] as const) {

        const index = this.notices[tab].findIndex(
          (n: any) => n.title.toLowerCase() === lowerTitle
        );

        if (index !== -1) {

          this.activeTab = tab;
          this.currentPage = Math.floor(index / this.pageSize) + 1;

          break;
        }
      }

    });

  }

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



// Modal state
isModalOpen = false;
selectedNotice: any = null;

// Open modal from View button
openModal(notice: any) {
  this.selectedNotice = notice;
  this.isModalOpen = true;
  document.body.style.overflow = 'hidden'; // prevent scroll
}

// Close modal
closeModal() {
  this.isModalOpen = false;
  this.selectedNotice = null;
  document.body.style.overflow = 'auto';
}


}
