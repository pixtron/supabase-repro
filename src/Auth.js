import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [signUp, setSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = signUp ?
        await supabase.auth.signUp({ email, password })
        :
        await supabase.auth.signIn({ email, password })

      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget" aria-live="polite">
        <h3>Authenticate</h3>
        <p></p>
        {loading ? (
          'Signing in...'
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="inputField"
              type="password"
              placeholder="Your password"
              value={password}
              minlength="6"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => setSignUp(true)} className="button block" aria-live="polite">
              Sign up
            </button>
            <button onClick={() => setSignUp(false)} className="button block" aria-live="polite">
              Sign in
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
