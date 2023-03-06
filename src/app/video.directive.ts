import {
  Directive,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
} from '@angular/core';
import { interval } from 'rxjs';

@Directive({
  selector: 'video[video-events]',
})
export class VideoDirective {
  @Output() hoverFinishEvent = new EventEmitter<void>();
  @Output() hoveringEvent = new EventEmitter<void>();

  timeout: any;

  constructor() {}

  @HostListener('mousemove')
  onMouseOver() {
    this.hoveringEvent.emit();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.hoverFinishEvent.emit();
    }, 5000);
  }

  @HostListener('mouseout')
  onMouseOut() {
    console.log('Mouse out');
  }

  @HostListener('enterpictureinpicture')
  onEnterPictureInPicture() {
    console.log('enterpictureinpicture');
  }

  @HostListener('leavepictureinpicture')
  onLeavePictureInPicture() {
    console.log('leavepictureinpicture');
  }

  @HostListener('play')
  onPlay(video: HTMLVideoElement) {
    console.log('play');
  }

  @HostListener('pause')
  onPause() {
    console.log('pause');
  }

  @HostListener('ended')
  onEnded() {
    console.log('ended');
  }

  @HostListener('document:fullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  @HostListener('document:mozfullscreenchange')
  @HostListener('document:MSFullscreenChange')
  onFullScreenChange() {
    console.log('fullscreenchange');
  }

  @HostListener('volumechange')
  onVolumeChange() {
    console.log('volumechange');
  }
}
