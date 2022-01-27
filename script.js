const music = document.querySelector('audio')
const prevBtn = document.getElementById('prev')
const play = document.getElementById('play')
const nextBtn = document.getElementById('next')

let isPlaying = false

const props = {
  play: {
    title: 'play',
    classIcon: 'fa-play'
  },
  pause: {
    title: 'pause',
    classIcon: 'fa-pause'
  }
}

const playSong = () => {
  isPlaying = true
  music.play()
  play.classList.replace(props.play.classIcon, props.pause.classIcon)
  play.setAttribute('title', props.pause.title)
}

const pauseSong = () => {
  isPlaying = false
  music.pause()
  play.classList.replace(props.pause.classIcon, props.play.classIcon)
  play.setAttribute('title', props.play.title)
}

play.addEventListener('click', () => isPlaying ? pauseSong() : playSong())