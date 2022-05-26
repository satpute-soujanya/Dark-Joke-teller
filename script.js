const button = document.getElementById('buttonID')
const audioElement = document.getElementById('audioElement')

// Toggle disable not disable
function DisableToggle() {
  button.disabled = !button.disabled
}
// Passing joke to voice RSS
function tellMe(joke) {
  VoiceRSS.speech({
    key: 'd469a1ab4c1a4ae6b32fc157ab1a822b',
    src: `${joke}`,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  })
}

// Get jokes from joke API
async function getJoke() {
  const APIURL = 'https://v2.jokeapi.dev/joke/Dark'
  let joke = ''
  try {
    const response = await fetch(APIURL)
    const data = await response.json()
    if (data.setup) {
      joke = `${data.setup}...${data.delivery}`
    } else {
      joke = data.joke
    }
    tellMe(joke)
    console.log(joke)
    // disabled button
    DisableToggle()
  } catch (error) {
    console.log('whoops', error)
  }
}

button.addEventListener('click', getJoke)

audioElement.addEventListener('ended', DisableToggle)
