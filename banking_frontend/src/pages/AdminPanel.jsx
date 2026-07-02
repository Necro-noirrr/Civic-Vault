import { useEffect, useState } from 'react'
import api from '../api/axios'

function AdminPanel() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/transactions/admin/users/')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="container mt-4">
      <h4 className="fw-semibold mb-4">Admin panel</h4>
      <div className="card">
        <ul className="list-group list-group-flush">
          {users.map((u) => (
            <li key={u.account_number} className="list-group-item d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-semibold" style={{ width: '36px', height: '36px', fontSize: '13px' }}>
                  {u.user.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="fw-semibold" style={{ fontSize: '13px' }}>{u.user.username}</div>
                  <div className="text-muted" style={{ fontSize: '11px' }}>{u.account_number} · ₹{u.balance}</div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className={`badge ${u.is_frozen ? 'bg-danger' : 'bg-success'}`}>
                  {u.is_frozen ? 'Frozen' : 'Active'}
                </span>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => {
                  api.post(`/accounts/account/freeze/${u.account_number}/`)
                    .then(() => setUsers(users.map(acc =>
                      acc.account_number === u.account_number ? { ...acc, is_frozen: !acc.is_frozen } : acc
                    )))
                    .catch((err) => console.log(err))
                }}>
                  {u.is_frozen ? 'Unfreeze' : 'Freeze'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminPanel