import { Component } from '@angular/core';
import { PhotoSlider } from 'app/photo-slider/photo-slider';
import { Slide } from 'app/photo-slider/photo-slider.model';

@Component({
  selector: 'app-about-me',
  imports: [PhotoSlider],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {
  public slideShowWidth = 500;
  private isMobile = false;

  ngOnInit() {
    this.updateWidth();
    window.addEventListener('resize', () => this.updateWidth());
  }

  updateWidth() {
    this.isMobile = window.innerWidth < 700;
    this.slideShowWidth = this.isMobile ? 300 : 500;
  }

  slides: Slide[] = [
    {
      url: '../../assets/images/about-me-slide/disneyFamily.jpeg',
      title: 'My family - Disney 2025',
    },
    {
      url: '../../assets/images/about-me-slide/stateBasketball.jpeg',
      title: 'Michigan State Basketball',
    },
    {
      url: '../../assets/images/about-me-slide/niagraFalls.jpeg',
      title: 'Niagara Falls, Canada - Summer 2025',
    },
    {
      url: '../../assets/images/about-me-slide/chicagoChristmas.jpeg',
      title: 'Christkindlemarket in Chicago',
    },
    {
      url: '../../assets/images/about-me-slide/macinacIsland.jpeg',
      title: 'Macinac Island, Michigan with my husband',
    },
    {
      url: '../../assets/images/about-me-slide/swordAndStone.jpeg',
      title: `Proof that Disney magic doesn't grant super strength.`,
    },
    {
      url: '../../assets/images/about-me-slide/fallBoyneBridge.jpeg',
      title: `Views for days at Boyne Mountain Sky Bridge`,
    },
  ];
}
