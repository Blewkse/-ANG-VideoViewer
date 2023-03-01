import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'Video Recorder by Blewkse';
  videoSource = './assets/randomVideo.mp4';
  isVideoPlaying = false;
  isVideoFullscreen = false;
  isMuted = false;
  video!: HTMLVideoElement;
  videoContainer!: HTMLDivElement;
  sliderValue$!: BehaviorSubject<number>;

  ngOnInit() {
    this.sliderValue$ = new BehaviorSubject<number>(100);
  }
  ngAfterViewInit() {
    this.video = document.querySelector('#videoScreen') as HTMLVideoElement;
    this.videoContainer = document.querySelector(
      '#videoContainer'
    ) as HTMLDivElement;
    const slider = document.querySelector('#volume-slider') as HTMLInputElement;

    this.sliderValue$.subscribe((value) => {
      this.video.volume = value;
    });
  }
  toggleVideo() {
    this.isVideoPlaying = !this.isVideoPlaying;
    if (this.video) {
      this.isVideoPlaying ? this.video.play() : this.video.pause();
    }
  }

  toggleFullScreen() {
    this.isVideoFullscreen = !this.isVideoFullscreen;
    console.log(this.videoContainer);
    this.isVideoFullscreen
      ? this.videoContainer.requestFullscreen()
      : document.exitFullscreen();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.video.muted = !this.video.muted;
    console.log(this.video.muted);
  }

  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    this.sliderValue$.next(value);
  }
}
