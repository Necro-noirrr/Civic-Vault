import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-semibold">🏦 Civic Vault</span>
      <div className="d-flex gap-2 align-items-center">
        <Link to="/dashboard" className="text-secondary text-decoration-none px-2">Dashboard</Link>
        <Link to="/transfer" className="text-secondary text-decoration-none px-2">Transfer</Link>
        <Link to="/transactions" className="text-secondary text-decoration-none px-2">Transactions</Link>
        <Link to="/admin-panel" className="text-secondary text-decoration-none px-2">Admin</Link>
        <button className="btn btn-danger btn-sm" onClick={() => { localStorage.removeItem('access'); navigate('/login') }}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar


