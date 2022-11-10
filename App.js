import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import './App.css'
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from './components/characters'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './components/message'

function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [Uppercase, setUppercase] = useState(false)
  const [Lowercase, setLowercase] = useState(false)
  const [Numbers, setNumbers] = useState(false)
  const [Symbols, setSymbols] = useState(false)

  const handleGeneratePassword = (e) => {
    if (
      !Uppercase &&
      !Lowercase &&
      !Numbers &&
      !Symbols
    ) {
      notify('You must Select atleast one option', true)
    }
    let characterList = ''

    if (Lowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (Uppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (Numbers) {
      characterList = characterList + numbers
    }

    if (Symbols) {
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('Nothing To Copy', true)
    } else {
      copyToClipboard()
      notify(COPY_SUCCESS)
    }
  }

  return (
    <div className='App'>
      <div className='container'>
        <div className='generator'>
          <h2 className='generator__header'>Password Generator</h2>
          <div className='generator__password'>
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className='copy__btn'>
              <i className='far fa-clipboard'></i>
              <img src="/src/copy.png" alt="copy" />
            </button>
          </div>

          <div className='form-group'>
            <label htmlFor='password-strength'>Password length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type='number'
              id='password-strength'
              name='password-strength'
              max='20'
              min='8'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='uppercase-letters'>Uppercase Letters</label>
            <input
              checked={Uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              type='checkbox'
              id='uppercase-letters'
              name='uppercase-letters'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='lowercase-letters'>Lowercase Letters</label>
            <input
              checked={Lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              type='checkbox'
              id='lowercase-letters'
              name='lowercase-letters'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='include-numbers'>Numbers</label>
            <input
              checked={Numbers}
              onChange={(e) => setNumbers(e.target.checked)}
              type='checkbox'
              id='include-numbers'
              name='include-numbers'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='include-symbols'>Symbols</label>
            <input
              checked={Symbols}
              onChange={(e) => setSymbols(e.target.checked)}
              type='checkbox'
              id='include-symbols'
              name='include-symbols'
            />
          </div>

          <button onClick={handleGeneratePassword} className='generator__btn'>
            Generate Password
          </button>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  )
}

export default App