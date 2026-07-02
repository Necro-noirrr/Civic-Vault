import { useEffect, useState } from 'react'
import api from '../api/axios'

function Transactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    api.get('/transactions/history/')
      .then((res) => setTransactions(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="container mt-4">
      <h4 className="fw-semibold mb-4">Transaction history</h4>
      <div className="card">
        <ul className="list-group list-group-flush">
          {transactions.map((t) => (
            <li key={t.id} className="list-group-item d-flex align-items-center justify-content-between">
              <div>
                <div className="fw-semibold" style={{ fontSize: '13px' }}>{t.sender_account} → {t.receiver_account}</div>
                <div className="text-muted" style={{ fontSize: '11px' }}>{t.note || 'No note'} · {new Date(t.timestamp).toLocaleDateString()}</div>
              </div>
              <span className="text-danger fw-semibold">-₹{t.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Transactions