import { useEffect, useState } from 'react'
import api from '../api/axios'

function Dashboard() {
  const [account, setAccount] = useState(null)

  useEffect(() => {
    api.get('/accounts/account/me/')
      .then((res) => setAccount(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="container mt-4">
      <h4 className="fw-semibold mb-4">Dashboard</h4>
      {account && (
        <>
          <span className="badge bg-primary mb-3">ACC: {account.account_number} · Savings</span>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card p-3">
                <div className="text-muted mb-1" style={{ fontSize: '12px' }}>Total balance</div>
                <div className="fw-semibold fs-4">₹{account.balance}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3">
                <div className="text-muted mb-1" style={{ fontSize: '12px' }}>Account status</div>
                <div className={`fw-semibold fs-4 ${account.is_frozen ? 'text-danger' : 'text-success'}`}>
                  {account.is_frozen ? 'Frozen' : 'Active'}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3">
                <div className="text-muted mb-1" style={{ fontSize: '12px' }}>Account type</div>
                <div className="fw-semibold fs-4 text-primary">Savings</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard