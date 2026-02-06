import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, signal, untracked } from '@angular/core';
import { Slide } from './photo-slider.model';
import { ChevronLeftComponent } from 'core/UI/icons/chevron-left/chevron-left.component';
import { ChevronRightComponent } from 'core/UI/icons/chevron-right/chevron-right.component';

@Component({
  selector: 'app-photo-slider',
  imports: [CommonModule, ChevronLeftComponent, ChevronRightComponent],
  templateUrl: './photo-slider.html',
  styleUrl: './photo-slider.scss',
})
export class PhotoSlider {
  slides = input.required<Slide[]>();
  parentWidth = input.required<number>();

  public currentIndex = signal(0);
  slidesContainer = computed(() => ({
    width: `${this.parentWidth() * this.slides().length}px`,
    transform: `translateX(-${this.currentIndex() * this.parentWidth()}px)`,
  }));

  timeoutId = signal<number | undefined>(undefined);
  timeoutEffect = effect(() => {
    const index = this.currentIndex();
    const prevId = untracked(() => this.timeoutId());
    window.clearTimeout(prevId);
    const id = window.setTimeout(() => {
      this.goToNext();
    }, 4000);
    untracked(() => this.timeoutId.set(id));
  });

  getSlide = (slide: Slide) => ({
    backgroundImage: `url(${slide.url})`,
    width: `${this.parentWidth()}px`,
  });

  goToPrev(): void {
    const isFirst = this.currentIndex() === 0;
    const newIndex = isFirst ? this.slides().length - 1 : this.currentIndex() - 1;
    this.currentIndex.set(newIndex);
  }

  goToNext(): void {
    const isLast = this.currentIndex() === this.slides().length - 1;
    const newIndex = isLast ? 0 : this.currentIndex() + 1;
    this.currentIndex.set(newIndex);
  }

  goToSlide(index: number) {
    this.currentIndex.set(index);
  }
}
