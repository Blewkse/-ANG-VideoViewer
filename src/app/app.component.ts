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
  volumeContainer!: HTMLDivElement;
  videoControls!: HTMLDivElement;
  sliderValue$!: BehaviorSubject<number>;
  totalTime!: string;
  currentTime!: string;

  ngOnInit() {
    this.sliderValue$ = new BehaviorSubject<number>(100);
  }
  ngAfterViewInit() {
    this.video = document.querySelector('#videoScreen') as HTMLVideoElement;
    this.videoContainer = document.querySelector(
      '#videoContainer'
    ) as HTMLDivElement;
    const slider = document.querySelector('#volume-slider') as HTMLInputElement;
    this.volumeContainer = document.querySelector(
      '#volume-container'
    ) as HTMLDivElement;
    this.videoControls = document.querySelector(
      '#video-controls'
    ) as HTMLDivElement;

    this.sliderValue$.subscribe((value) => {
      this.video.volume = value;
    });
    this.totalTime = this.formatDuration(this.video.duration);
    this.currentTime = this.formatDuration(this.video.currentTime);
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
    console.log(this.video.duration);
  }

  onVideoHoverFinish() {
    this.volumeContainer.style.opacity = '0';
    this.videoControls.style.opacity = '0';
    this.video.style.filter = 'brightness(100%)';
    this.video.style.cursor = 'none';
  }
  onVideoHovering() {
    this.volumeContainer.style.opacity = '1';
    this.videoControls.style.opacity = '1';
    this.video.style.filter = 'brightness(50%)';
    this.video.style.cursor = 'default';
  }

  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    this.sliderValue$.next(value);
  }
  formatDuration(value: number): string {
    const seconds = Math.floor(value % 60);
    const minutes = Math.floor((value / 60) % 60);
    const hours = Math.floor(value / 3600);
    if (hours == 0) {
      return `${minutes}:${this.leadingZeroFormatter.format(seconds)}`;
    } else
      return `${hours}:${this.leadingZeroFormatter.format(
        minutes
      )}:${this.leadingZeroFormatter.format(seconds)}`;
  }
  leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });

  updateTime() {
    this.currentTime = this.formatDuration(this.video.currentTime);
    console.log(this.currentTime);
  }
  skip(duration: number) {
    this.video.currentTime += duration;
  }
}
