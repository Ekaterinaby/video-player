 const player = document.querySelector('.player');

 const video = player.querySelector('.viewer');
 const togglernav = player.querySelector('.play2');
 const toggler = player.querySelector('.toggle');
 const mutebtn = player.querySelector('.mute');



 /* PLAY PAUSE */


 function togglePlay() {
     const method = video.paused ? 'play' : 'pause';
     video[method]();
 }



 const volumeIcons = document.querySelectorAll('mute');
 const volumeButton = document.getElementById('mute-button');
 const imgMute = document.getElementById('mute-on').classList;
 const volumeMute = document.getElementById('mute-off').classList;
 const volume = document.getElementById('volume');

 function updateVolume() {
     if (video.muted) {
         video.muted = false;
     } else {
         video.volume = volume.value;
     }
 }

 function updateVolumeIcon() {

     volumeButton.setAttribute('data-title', 'Mute (m)');

     if (video.muted || video.volume === 0) {
         imgMute.add("hidden");
         volumeMute.remove("hidden");
         volumeButton.setAttribute('data-title', 'Unmute (m)');
     } else {
         imgMute.remove("hidden");
         volumeMute.add("hidden");
     }
 };



 function toggleMute() {
     video.muted = !video.muted;

     if (video.muted) {
         volume.setAttribute('data-volume', volume.value);
         volume.value = 0;

         imgMute.add("hidden");
         volumeMute.remove("hidden");

     } else {
         volume.value = volume.dataset.volume;
         imgMute.remove("hidden");
         volumeMute.add("hidden");
     }
 }
 document.body.onkeypress = function(e) {
     if (e.which == 32) {
         // stops default behaviour of space bar. Stop page scrolling down
         e.preventDefault();
         play_pause_video();
     }
 }

 function play_pause_video() {
     if (video.paused) {
         video.play();
     } else {
         video.pause();
     }
 }

 function updateButton() {
     const icon = this.paused ? '►' : '||';
     const icon_nav = this.paused ? '►' : '■';
     toggler.textContent = icon;
     togglernav.textContent = icon_nav;
     toggler.classList.toggle("anibtn");
     togglernav.classList.toggle("anibtn_nav");
 }

 /* FULLSCREEN */

 const fullscreenButton = document.getElementById('fullscreen-button');
 const videoContainer = document.getElementById('video_block');

 function toggleFullScreen() {
     if (document.fullscreenElement) {
         document.exitFullscreen();
     } else if (document.webkitFullscreenElement) {
         // Need this to support Safari
         document.webkitExitFullscreen();
     } else if (videoContainer.webkitRequestFullscreen) {
         // Need this to support Safari
         videoContainer.webkitRequestFullscreen();
     } else {
         videoContainer.requestFullscreen();
     }
 }
 fullscreenButton.onclick = toggleFullScreen;

 const fullscreenIcons = fullscreenButton.querySelectorAll('use');

 function updateFullscreenButton() {
     fullscreenIcons.forEach(icon => icon.classList.toggle('hidden'));

     if (document.fullscreenElement) {
         fullscreenButton.setAttribute('data-title', 'Exit full screen (f)')
     } else {
         fullscreenButton.setAttribute('data-title', 'Full screen (f)')
     }
 }



 /*PROGRESS-BAR*/
 const timeElapsed = document.getElementById('time-elapsed');
 const duration = document.getElementById('duration');
 const progressBar = document.getElementById('progress-bar');
 const seek = document.getElementById('seek');
 const seekTooltip = document.getElementById('seek-tooltip');

 function formatTime(timeInSeconds) {
     const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
     return {
         minutes: result.substr(3, 2),
         seconds: result.substr(6, 2),
     };
 }

 // initializeVideo sets the video duration, and maximum value of the
 // progressBar
 function initializeVideo() {
     const videoDuration = Math.round(video.duration);
     seek.setAttribute('max', videoDuration);
     progressBar.setAttribute('max', videoDuration);
     const time = formatTime(videoDuration);
     duration.innerText = `${time.minutes}:${time.seconds}`;
     duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
 }


 function updateTimeElapsed() {
     const time = formatTime(Math.round(video.currentTime));
     timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
     timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
 }

 // updateProgress indicates how far through the video
 // the current playback is by updating the progress bar
 function updateProgress() {
     seek.value = Math.floor(video.currentTime);
     progressBar.value = Math.floor(video.currentTime);
 }

 // updateSeekTooltip uses the position of the mouse on the progress bar to
 // roughly work out what point in the video the user will skip to if
 // the progress bar is clicked at that point
 function updateSeekTooltip(event) {
     const skipTo = Math.round(
         (event.offsetX / event.target.clientWidth) *
         parseInt(event.target.getAttribute('max'), 10)
     );
     seek.setAttribute('data-seek', skipTo);
     const t = formatTime(skipTo);
     seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
     const rect = video.getBoundingClientRect();
     seekTooltip.style.left = `${event.pageX - rect.left}px`;
 }


 // skipAhead jumps to a different point in the video when the progress bar
 // is clicked
 function skipAhead(event) {
     const skipTo = event.target.dataset.seek ?
         event.target.dataset.seek :
         event.target.value;
     video.currentTime = skipTo;
     progressBar.value = skipTo;
     seek.value = skipTo;
 }



 /*VOLUME*/



 let muteBtn = document.getElementById('mute-button');




 function mute() {
     if (video.muted) {
         mute.innerHTML = '<i class="flaticon-sound64"></i>';
         video.muted = false;
         volumeBtn.value = 5;
     } else {
         mute.innerHTML = '<i class="flaticon-volumecontrol"></i>';
         video.muted = true;
         volumeBtn.value = 0;
     }
 }


 function animatePlayback() {
     playbackAnimation.animate(
         [{
                 opacity: 1,
                 transform: 'scale(1)',
             },
             {
                 opacity: 0,
                 transform: 'scale(1.3)',
             },
         ], {
             duration: 500,
         }
     );
 }



 // shortkey
 function keyboardShortcuts(event) {
     const { key } = event;
     switch (key) {
         case 'k':
             togglePlay();
             animatePlayback();

             break;
         case 'm':
             toggleMute();
             break;
         case 'f':
             toggleFullScreen();
             break;
         case 'p':
             togglePip();
             break;
     }
 }










 /*const progress = player.querySelector('.progress');
 const progressBar = player.querySelector('.progress__filled');*/

 const skipButtons = player.querySelectorAll('[data-skip]');
 const ranges = player.querySelectorAll('.player__slider');

 /* Build out functions */


 function skip() {
     video.currentTime += parseFloat(this.dataset.skip);
 }

 function handleRangeUpdate() {
     video[this.name] = this.value;
 }



 function scrub(e) {
     const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
     video.currentTime = scrubTime;
 }


 video.addEventListener('click', togglePlay);
 mutebtn.addEventListener('click', toggleMute);
 video.addEventListener('volumechange', updateVolumeIcon);
 volume.addEventListener('input', updateVolume);
 video.addEventListener('play', updateButton);
 video.addEventListener('play2', updateButton);
 video.addEventListener('pause', updateButton);
 document.addEventListener('keyup', keyboardShortcuts);
 video.addEventListener('timeupdate', updateProgress);
 video.addEventListener('loadedmetadata', initializeVideo);
 video.addEventListener('timeupdate', updateTimeElapsed);
 toggler.addEventListener('click', togglePlay);
 togglernav.addEventListener('click', togglePlay);
 skipButtons.forEach(button => button.addEventListener('click', skip));
 ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
 ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


 videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);
 video.addEventListener('click', animatePlayback);
 seek.addEventListener('input', skipAhead);
 fullscreenButton.addEventListener('click', toggleFullScreen);