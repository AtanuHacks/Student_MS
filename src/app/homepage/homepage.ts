import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
  imports: [RouterLink]
})
export class Homepage implements AfterViewInit, OnDestroy {

  private slider!: HTMLElement;
  private slidesWrap!: HTMLElement;
  private slides!: HTMLElement[];
  private dotsWrap!: HTMLElement;
  private currentEl!: HTMLElement;
  private totalEl!: HTMLElement;
  private interval: any;

  private index = 1; // start from real first slide
  private slideCount = 0;

  ngAfterViewInit(): void {
    this.slider = document.getElementById('heroSlider')!;
    this.slidesWrap = this.slider.querySelector('.slides')!;
    this.dotsWrap = this.slider.querySelector('.dots')!;
    this.currentEl = this.slider.querySelector('#current')!;
    this.totalEl = this.slider.querySelector('#total')!;

    const originalSlides = Array.from(this.slidesWrap.children) as HTMLElement[];
    this.slideCount = originalSlides.length;

    /* ===== CLONE FOR INFINITE LOOP ===== */
    const firstClone = originalSlides[0].cloneNode(true) as HTMLElement;
    const lastClone = originalSlides[this.slideCount - 1].cloneNode(true) as HTMLElement;

    this.slidesWrap.appendChild(firstClone);
    this.slidesWrap.insertBefore(lastClone, originalSlides[0]);

    this.slides = Array.from(this.slidesWrap.children) as HTMLElement[];

    /* POSITION TO FIRST REAL SLIDE */
    this.slidesWrap.style.transform = `translateX(-100%)`;

    /* TOTAL COUNT */
    this.totalEl.textContent = String(this.slideCount).padStart(2, '0');

    /* CREATE DOTS */
    for (let i = 0; i < this.slideCount; i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(i + 1));
      this.dotsWrap.appendChild(dot);
    }

    /* ARROWS */
    this.slider.querySelector('.next')!
      .addEventListener('click', () => this.nextSlide());

    this.slider.querySelector('.prev')!
      .addEventListener('click', () => this.prevSlide());

    /* PAUSE ON HOVER */
    this.slider.addEventListener('mouseenter', () => this.stopAuto());
    this.slider.addEventListener('mouseleave', () => this.startAuto());

    this.startAuto();
    this.updateUI();
  }

  private updateUI(): void {
    this.slidesWrap.style.transition = 'transform 0.8s ease';
    this.slidesWrap.style.transform = `translateX(-${this.index * 100}%)`;

    const dots = this.dotsWrap.querySelectorAll('span');
    dots.forEach(d => d.classList.remove('active'));

    let realIndex = this.index - 1;
    if (realIndex < 0) realIndex = this.slideCount - 1;
    if (realIndex >= this.slideCount) realIndex = 0;

    dots[realIndex].classList.add('active');
    this.currentEl.textContent = String(realIndex + 1).padStart(2, '0');
  }

  private nextSlide(): void {
    this.index++;
    this.updateUI();

    if (this.index === this.slideCount + 1) {
      setTimeout(() => {
        this.slidesWrap.style.transition = 'none';
        this.index = 1;
        this.slidesWrap.style.transform = `translateX(-100%)`;
      }, 800);
    }
  }

  private prevSlide(): void {
    this.index--;
    this.updateUI();

    if (this.index === 0) {
      setTimeout(() => {
        this.slidesWrap.style.transition = 'none';
        this.index = this.slideCount;
        this.slidesWrap.style.transform = `translateX(-${this.slideCount * 100}%)`;
      }, 800);
    }
  }

  private goToSlide(i: number): void {
    this.index = i;
    this.updateUI();
  }

  private startAuto(): void {
    this.interval = setInterval(() => this.nextSlide(), 4000);
  }

  private stopAuto(): void {
    clearInterval(this.interval);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
