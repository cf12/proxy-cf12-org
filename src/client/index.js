import 'normalize.css'
import './index.scss'

document.querySelector('head > base').setAttribute('href', window.location.origin)

const urlBar = document.querySelector('.___url-bar')
const form = document.querySelector('.___url-bar__form')
const url = document.querySelector('.___url-bar__form__url')
const content = document.querySelector('.___content')

const loadURL = (url) => {
  if (!url.match(/^(http|https):\/\//g))
    url = 'https://' + url

  console.log('Visiting: ' + url)

  urlBar.className += ' ___url-bar--active'

  fetch(`/proxy?u=${btoa(url)}`)
    .then(data => data.text())
    .then(data => {
      content.innerHTML = data
    })
}

if (window.location.hash) {
  loadURL(window.location.hash.substr(1))
}

form.addEventListener('submit', e => {
  e.preventDefault()
  loadURL(url.value)
  window.location.hash = url.value
})