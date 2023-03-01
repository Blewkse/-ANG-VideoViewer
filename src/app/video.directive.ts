import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'video',
})
export class VideoDirective {
  constructor() {}
  @HostListener('mouseover')
  onMouseOver() {
    console.log('Mouse over');
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
  onPlay() {
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
