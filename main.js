const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const currTime = document.querySelector("#currTime");
const durTime = document.querySelector("#durTime");

const quran = ["Al-Falaq", "An-Nas", "An-Nasr"];

let index = 0;

loadQuran(quran[index]);

function loadQuran(quran) {
  title.innerText = quran;
  audio.src = `Quran/${quran}.mp3`;
}

function play() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-pause");
  audio.play();
}

function pause() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-remove");
  audio.pause();
}

function prev() {
  index--;
  if (index < 0) {
    index = quran.length - 1;
  }

  loadQuran(quran[index]);
  play();
}

function next() {
  index++;
  if (index > quran.length - 1) {
    index = 0;
  }
  loadQuran(quran[index]);
  play();
}

function updatePrgoress(e) {
  const { duration, currentTime } = e.srcElement;
  console.log(duration, currentTime);
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

const loadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function curTime(e) {
  const { duration, currentTime } = e.srcElement;

  function durationTime(duration){

    const seconds = Math.floor(duration % 60);
    const minutes = Math.floor(duration / 60) % 60;
    durTime.textContent = `${loadingZeroFormatter.format(
      minutes
      )}:${loadingZeroFormatter.format(seconds)} `;
    }
    durationTime(duration)

    const seconds = Math.floor(currentTime % 60);
    const minutes = Math.floor(currentTime / 60) % 60;
    currTime.textContent = `${loadingZeroFormatter.format(
      minutes
      )}:${loadingZeroFormatter.format(seconds)}`;
    
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});

prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

audio.addEventListener("timeupdate", updatePrgoress);
audio.addEventListener("timeupdate", curTime);
audio.addEventListener("ended", next);
progressContainer.addEventListener("click", setProgress);
