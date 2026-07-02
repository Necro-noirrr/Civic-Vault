import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: '360px' }}>
        <h4 className="mb-1 fw-semibold">Create account</h4>
        <p className="text-muted mb-4" style={{ fontSize: '13px' }}>Join Civic Vault today</p>

        <label className="form-label text-muted" style={{ fontSize: '12px' }}>Username</label>
        <input className="form-control mb-3" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />

        <label className="form-label text-muted" style={{ fontSize: '12px' }}>Email</label>
        <input className="form-control mb-3" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />

        <label className="form-label text-muted" style={{ fontSize: '12px' }}>Password</label>
        <input type="password" className="form-control mb-4" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-dark w-100" onClick={() => {
          api.post('/accounts/register/', { username, email, password })
            .then(() => navigate('/login'))
            .catch((err) => console.log(err))
        }}>Create account</button>

        <p className="text-center text-muted mt-3" style={{ fontSize: '13px' }}>
          Have an account? <a href="/login" className="text-primary">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register