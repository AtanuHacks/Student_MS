import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-achievements',
  imports: [CommonModule],
  templateUrl: './achievements.html',
  styleUrl: './achievements.css'
})
export class Achievements {
  achievements = [
    {
      icon: 'fas fa-trophy',
      count: '120+',
      title: 'Academic Awards'
    },
    {
      icon: 'fas fa-medal',
      count: '75+',
      title: 'Sports Championships'
    },
    {
      icon: 'fas fa-user-graduate',
      count: '98%',
      title: 'Board Exam Success Rate'
    },
    {
      icon: 'fas fa-school',
      count: '25+',
      title: 'Years of Excellence'
    }
  ];

}
