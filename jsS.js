const app = () =>{
 const song = document.querySelector('.song');
 const play = document.querySelector('.play');
 const outline = document.querySelector('.moving-outline circle');
 const video = document.querySelector('.vid-container video');
 let volumeS = document.getElementById("jcp-volume");
 
 const sounds = document.querySelectorAll('.sound-picker button');
 
 const timeDisplay = document.querySelector('.time-display');
 const timeSelect = document.querySelectorAll('.time-select button');
 // outline length
 const outlineLength = outline.getTotalLength();
 
 let duration = 600;
 
 outline.style.strokeDasharray = outlineLength;
 outline.style.strokeDashoffset = outlineLength;
 
 
 // pick diff sounds
 sounds.forEach(sound =>{
	 sound.addEventListener('click', function(){
		 song.src = this.getAttribute('data-sound');
		 video.src = this.getAttribute('data-video');
		 checkPlaying(song);
	    });
	 });
 play.addEventListener('click', ()=> {
	 checkPlaying(song);
 });
 

 // select sound
 timeSelect.forEach(option =>{
	 option.addEventListener("click", function(){
		 duration = this.getAttribute("data-time");
		 timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(
		 duration % 60
		 )}`;
	 });
 });
 
volumeS.addEventListener("mousemove", setvolume, false);

function setvolume()
{
  song.volume = volumeS.value / 10;
};
 

 const checkPlaying = song=>{
	 if(song.paused){
	 song.play();
	 video.play();
	 play.src = 'svg/pause.svg';
 }else{
	 song.pause();
	 video.pause();
	 play.src = 'svg/play.svg';
	 
 }
 };
 // circle animation
 song.ontimeupdate = () =>{
	  let currentTime = song.currentTime;
	  let elapsed = duration - currentTime;
	  let seconds = Math.floor(elapsed % 60);
	  let minutes = Math.floor(elapsed / 60);
	// circle animation part 2
 let progress = outlineLength - (currentTime/duration)*outlineLength;
 outline.style.strokeDashoffset = progress;
	
	// animate the text
	timeDisplay.textContent = `${minutes}:${seconds}`;
	
	if(currentTime >= duration){
		song.pause();
		song.currentTime = 0;
		play.src = 'svg/play.svg';
		video.pause();
	}
 };
};

app();