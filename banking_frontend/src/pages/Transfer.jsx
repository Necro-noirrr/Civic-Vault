import { useState } from 'react'
import api from '../api/axios'

function Transfer() {
  const [receiverAccount, setReceiverAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  return (
    <div className="container mt-4">
      <h4 className="fw-semibold mb-4">Send money</h4>
      <div className="card p-4" style={{ maxWidth: '400px' }}>
        {message && <div className={`alert ${isError ? 'alert-danger' : 'alert-success'} py-2`}>{message}</div>}

        <label className="form-label text-muted" style={{ fontSize: '12px' }}>Receiver account number</label>
        <input className="form-control mb-3" placeholder="e.g. 8758675859" onChange={(e) => setReceiverAccount(e.target.value)} />

        <label className="form-label text-muted" style={{ fontSize: '12px' }}>Amount (₹)</label>
        <input className="form-control mb-3" placeholder="e.g. 500" onChange={(e) => setAmount(e.target.value)} />

        <label className="form-label text-muted" style={{ fontSize: '12px' }}>Note (optional)</label>
        <input className="form-control mb-4" placeholder="e.g. Rent payment" onChange={(e) => setNote(e.target.value)} />

        <button className="btn btn-dark w-100" onClick={() => {
          api.post('/transactions/transfer/', { receiver_account_number: receiverAccount, amount, note })
            .then((res) => { setMessage(res.data.message); setIsError(false) })
            .catch((err) => { setMessage(err.response.data.error); setIsError(true) })
        }}>Send money</button>
      </div>
    </div>
  )
}

export default Transfer