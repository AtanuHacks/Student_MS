import { Component, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
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
  private isInitialized = false;

  // Track window resize to reinitialize if needed
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // If the slider is initialized and window is resized significantly, 
    // we might need to recalculate positions
    if (this.isInitialized) {
      this.updateSliderPosition();
    }
  }

  ngAfterViewInit(): void {
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => this.initializeSlider(), 100);
  }

  private initializeSlider(): void {
    try {
      this.slider = document.getElementById('heroSlider')!;
      
      if (!this.slider) {
        console.error('Slider element not found');
        return;
      }

      this.slidesWrap = this.slider.querySelector('.slides')!;
      this.dotsWrap = this.slider.querySelector('.dots')!;
      this.currentEl = this.slider.querySelector('#current')!;
      this.totalEl = this.slider.querySelector('#total')!;

      const originalSlides = Array.from(this.slidesWrap.children) as HTMLElement[];
      this.slideCount = originalSlides.length;

      if (this.slideCount === 0) {
        console.error('No slides found');
        return;
      }

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
      this.currentEl.textContent = '01';

      /* CREATE DOTS */
      this.dotsWrap.innerHTML = ''; // Clear existing dots
      for (let i = 0; i < this.slideCount; i++) {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => this.goToSlide(i + 1));
        this.dotsWrap.appendChild(dot);
      }

      /* ARROWS */
      const nextBtn = this.slider.querySelector('.next');
      const prevBtn = this.slider.querySelector('.prev');
      
      if (nextBtn) {
        nextBtn.addEventListener('click', () => this.nextSlide());
      }
      
      if (prevBtn) {
        prevBtn.addEventListener('click', () => this.prevSlide());
      }

      /* PAUSE ON HOVER (desktop) and touch (mobile) */
      this.slider.addEventListener('mouseenter', () => this.stopAuto());
      this.slider.addEventListener('mouseleave', () => this.startAuto());
      this.slider.addEventListener('touchstart', () => this.stopAuto());
      this.slider.addEventListener('touchend', () => this.startAuto());

      this.isInitialized = true;
      this.startAuto();
      this.updateUI();
      
    } catch (error) {
      console.error('Error initializing slider:', error);
    }
  }

  private updateSliderPosition(): void {
    if (!this.slidesWrap) return;
    this.slidesWrap.style.transform = `translateX(-${this.index * 100}%)`;
  }

  private updateUI(): void {
    if (!this.slidesWrap || !this.dotsWrap || !this.currentEl) return;
    
    this.slidesWrap.style.transition = 'transform 0.8s ease';
    this.slidesWrap.style.transform = `translateX(-${this.index * 100}%)`;

    const dots = this.dotsWrap.querySelectorAll('span');
    dots.forEach(d => d.classList.remove('active'));

    let realIndex = this.index - 1;
    if (realIndex < 0) realIndex = this.slideCount - 1;
    if (realIndex >= this.slideCount) realIndex = 0;

    if (dots[realIndex]) {
      dots[realIndex].classList.add('active');
    }
    
    this.currentEl.textContent = String(realIndex + 1).padStart(2, '0');
  }

  private nextSlide(): void {
    if (!this.isInitialized) return;
    
    this.index++;
    this.updateUI();

    if (this.index === this.slideCount + 1) {
      setTimeout(() => {
        if (this.slidesWrap) {
          this.slidesWrap.style.transition = 'none';
          this.index = 1;
          this.slidesWrap.style.transform = `translateX(-100%)`;
          
          // Force reflow
          this.slidesWrap.offsetHeight;
        }
      }, 800);
    }
  }

  private prevSlide(): void {
    if (!this.isInitialized) return;
    
    this.index--;
    this.updateUI();

    if (this.index === 0) {
      setTimeout(() => {
        if (this.slidesWrap) {
          this.slidesWrap.style.transition = 'none';
          this.index = this.slideCount;
          this.slidesWrap.style.transform = `translateX(-${this.slideCount * 100}%)`;
          
          // Force reflow
          this.slidesWrap.offsetHeight;
        }
      }, 800);
    }
  }

  private goToSlide(i: number): void {
    if (!this.isInitialized) return;
    
    this.index = i;
    this.updateUI();
  }

  private startAuto(): void {
    this.stopAuto(); // Clear any existing interval
    this.interval = setInterval(() => this.nextSlide(), 4000);
  }

  private stopAuto(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  ngOnDestroy(): void {
    this.stopAuto();
    this.isInitialized = false;
  }
}