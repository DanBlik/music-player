// Music node
const music = document.querySelector('audio')

// Player buttons
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Song props
const songTitle = document.getElementById('title')
const songArtist = document.getElementById('artist')
const songImg = document.querySelector('img')

// Progress
const progressNode = document.querySelector('.progress')
const progressContainerNode = document.querySelector('.progress-container')
const currentTimeNode = document.getElementById('current-time')
const durationNode = document.getElementById('duration')

// Music songs
const songs = [
  {
    title: 'Electric chill machine',
    artist: 'Jacinto',
    src: 'music/jacinto-1.mp3',
    img: 'img/jacinto-1.jpg',
  },
  {
    title: 'Electric chill machine 2',
    artist: 'Jacinto',
    src: 'music/jacinto-2.mp3',
    img: 'img/jacinto-2.jpg',
  },
  {
    title: 'Electric chill machine 3',
    artist: 'Jacinto',
    src: 'music/jacinto-3.mp3',
    img: 'img/jacinto-3.jpg',
  },
  {
    title: 'Some music',
    artist: 'Metric',
    src: 'music/metric-1.mp3',
    img: 'img/metric-1.jpg',
  },
]

// Player state
let isPlaying = false
let songIndex = 0

// Player props
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

// heplers
const setSongTimers = ({node, time}) => {
  const currentMinutes = Math.floor(time / 60)
  const currentSeconds = Math.floor(time - (currentMinutes * 60))
  const currentSecondsForView = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
  node.textContent = `${currentMinutes}:${currentSecondsForView}`
}

// Play or Pause
const playSong = () => {
  isPlaying = true
  music.play()
  playBtn.classList.replace(props.play.classIcon, props.pause.classIcon)
  playBtn.setAttribute('title', props.pause.title)
}

const pauseSong = () => {
  isPlaying = false
  music.pause()
  playBtn.classList.replace(props.pause.classIcon, props.play.classIcon)
  playBtn.setAttribute('title', props.play.title)
}

// Set music song
const setSong = () => {
  if (songIndex === -1) {
    songIndex = songs.length - 1
  } else if (songIndex === songs.length) {
    songIndex = 0
  }

  const {duration} = music

  const currentSong = songs[songIndex]
  songTitle.innerText = currentSong.title
  songArtist.innerText = currentSong.artist
  songImg.setAttribute('src', currentSong.img)
  music.setAttribute('src', currentSong.src)

  if (duration) {
    setSongTimers({node: durationNode, time: duration})
  }

  if (isPlaying) playSong()
}

// Progress bar
const updateProgressBar = event => {
  const { duration, currentTime } = event.srcElement
  const progressPercents = currentTime / duration * 100
  progressNode.style.width = `${progressPercents}%`

  if (currentTime && duration) {
    setSongTimers({node: currentTimeNode, time: currentTime})
    setSongTimers({node: durationNode, time: duration})
  }
}

const setProgressBar = (event) => {
  const {duration} = music
  const clickX = event.offsetX
  const barWidth = event.srcElement.scrollWidth

  music.currentTime = (clickX / barWidth) * duration
}

// Play/Pause btn listeners
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong())

// Prev and Next listeners
prevBtn.addEventListener('click', () => {
  songIndex--
  setSong()
})
nextBtn.addEventListener('click', () => {
  songIndex++
  setSong()
})

music.addEventListener('timeupdate', updateProgressBar)
music.addEventListener('ended', () => {
  songIndex++
  setSong()
})

progressContainerNode.addEventListener('click', setProgressBar)