import { FormEvent, useRef } from 'react'
import axios from 'axios'

import './App.css'

axios.defaults.withCredentials = true

function App() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const response = await axios.post('http://localhost:3000/login', {
      email: emailRef.current?.value,
      password: passRef.current?.value,
    })

    console.log(response.data)
  }

  return (
    <>
      <h1>Login</h1>

      <form className="card" onSubmit={onSubmit}>
        <input
          ref={emailRef}
          type="text"
          className="input"
          placeholder="Email"
          defaultValue="andres@gmail.com"
        />
        <input
          ref={passRef}
          type="text"
          className="input"
          placeholder="Password"
          defaultValue="123456"
        />

        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </>
  )
}

export default App
