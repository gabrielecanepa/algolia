/* global algoliasearch */

// Costants
const CSV_META = 'data:text/csv;charset=utf-8'
const APP_ID_STORAGE = 'algolia-app-id'
const API_KEY_STORAGE = 'algolia-api-key'

// Elements
const form = document.querySelector('form')
const appIdInput = form.querySelector('#app-id input')
const appIdSpinner = form.querySelector('#app-id .spinner')
const apiKeyInput = form.querySelector('#api-key input')
const apiKeySpinner = form.querySelector('#api-key .spinner')
const submit = form.querySelector('#submit')
const submitSpinner = submit.querySelector('.spinner')
const submitText = submit.querySelector('.btn-text')

// Variables
const submitTextContent = submitText.textContent.trim()

// Storage
appIdInput.value = localStorage.getItem(APP_ID_STORAGE) || ''
appIdSpinner.remove()
apiKeyInput.value = sessionStorage.getItem(API_KEY_STORAGE) || ''
apiKeySpinner.remove()

// Spinners
const showSubmitSpinner = () => {
  submit.disabled = true
  submitText.textContent = 'Exporting...'
  submitSpinner.style.display = 'inline-block'
}
const hideSubmitSpinner = () => {
  submit.disabled = false
  submitText.textContent = submitTextContent
  submitSpinner.style.display = 'none'
}

const showAlert = (message, type = 'danger') => {
  const alert = document.createElement('div')
  alert.role = 'alert'
  alert.classList.add('alert', `alert-${type}`)

  const container = document.createElement('div')
  container.classList.add('alert-container')
  container.textContent = message
  alert.appendChild(container)

  const close = document.createElement('button')
  close.type = 'button'
  close.classList.add('alert-close')
  close.innerHTML = '<span aria-hidden="true">&times;</span>'
  container.appendChild(close)

  close.addEventListener('click', () => alert.remove())
  setTimeout(() => alert.remove(), 3000)
  document.body.appendChild(alert)
}

const exportIndices = async e => {
  e.preventDefault()
  showSubmitSpinner()

  try {
    const appId = appIdInput.value
    const apiKey = apiKeyInput.value

    const client = algoliasearch(appId, apiKey)
    const { items } = await client.listIndices()

    localStorage.setItem(APP_ID_STORAGE, appId)
    sessionStorage.setItem(API_KEY_STORAGE, apiKey)

    const csv = [
      Object.keys(items[0]).slice(0, 6).join(','),
      ...items.map(item => Object.values(item).slice(0, 6).join(',')),
    ].join('\n')

    const link = document.createElement('a')
    link.download = `algolia-indices-${appId}.csv`
    link.href = `${CSV_META},${csv}`
    link.click()
    link.remove()
  } catch ({ message }) {
    showAlert(message)
  }

  hideSubmitSpinner()
}

form.addEventListener('submit', exportIndices)
