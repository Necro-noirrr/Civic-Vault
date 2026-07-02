import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: '360px' }}>
        <h4 className="mb-1 fw-semibold">Welcome back</h4>
        <p className="text-muted mb-4" style={{ fontSize: '13px' }}>Login to your Civic Vault account</p>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <label className="form-label text-muted" style={{ fontSize: '12px' }}>Username</label>
        <input className="form-control mb-3" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />

        <label className="form-label text-muted" style={{ fontSize: '12px' }}>Password</label>
        <input type="password" className="form-control mb-4" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-dark w-100" onClick={() => {
          api.post('/accounts/login/', { username, password })
            .then((res) => { localStorage.setItem('access', res.data.access); navigate('/dashboard') })
            .catch(() => setError('Invalid username or password'))
        }}>Login</button>

        <p className="text-center text-muted mt-3" style={{ fontSize: '13px' }}>
          No account? <a href="/register" className="text-primary">Register</a>
        </p>
      </div>
    </div>
  )
}

export default Login