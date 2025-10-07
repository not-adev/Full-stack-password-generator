'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FiLock, FiPlus } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify'
import UpdateModal from './Updatedialog'


const Dashboard = () => {
  const [entries, setEntries] = useState([])
  const [form, setForm] = useState({ username: '', password: '' })
  const callErrorToast = (e: string) => toast.error(e, { position: 'top-center' })
  const callSucessToast = (e: string) => toast.success(e, { position: 'top-center' })
  const callToast = (e: string) => toast(e, { position: 'top-center', hideProgressBar: true })
  const [showDialog, setShowDialog] = useState(false)
  const [updateid, setUpdateid] = useState('')

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const res = await axios.get('/api/getPassword')
        if (res.data.success) {
          setEntries(res.data.entries)
        } else {
          callErrorToast('ailed to fetch passwords')
          console.error('Failed to fetch passwords:', res.data.error)
        }
      } catch (error) {
        callErrorToast('Error fetching passwords')
        console.error('Error fetching passwords:', error)
      }
    }

    fetchPasswords()
  }, [])


  const fetchPasswords = async () => {
    try {
      const res = await axios.get('/api/getPassword')
      if (res.data.success) {
        setEntries(res.data.entries)
      } else {
        callErrorToast('ailed to fetch passwords')
        console.error('Failed to fetch passwords:', res.data.error)
      }
    } catch (error) {
      callErrorToast('Error fetching passwords')
      console.error('Error fetching passwords:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    toast.promise(
      async () => {
        await axios.post('/api/addPassword', { username: form.username, password: form.password })
      },
      {

        pending: 'Processing...',
        success: 'Added successfully 🎉',
        error: 'could not be added ❌',
      }
    )
    // await axios.post('/api/addPassword', { username: form.username, password: form.password })
    setForm({ username: '', password: '' })
    fetchPasswords()
  }



  const handleDelete = async (passwordId: string) => {
    if (!confirm("Are you sure you want to delete this password ")) {
      return
    }

    toast.promise(
      async ()=>{
        const res = await axios.delete('/api/deletePassword', {
        data: { passwordId },
      })
        fetchPasswords() // Refre

      } ,
       {

        pending: 'Processing...',
        success: 'Deleletd successfully 🎉',
        error: 'could not be delete ❌',
      }
    )
     }


  function setShowDialogFuntion(param: boolean) {
    setShowDialog(param)
    setForm({ username: '', password: '' })
  }

  function updateCalled(item: { username: string; password: string; _id: string }) {
    setShowDialog(true)
    setForm({
      username: item.username,
      password: item.password
    })
    setUpdateid(item._id)

  }
  function callback(){
    console.log()
    setShowDialog(false)
    setForm({username : "" , password : ""})
  }




  return (



    <>

      <UpdateModal
        isOpen={showDialog}
        onClose={() => setShowDialogFuntion(false)}
        fetchPasswords={fetchPasswords}
        callback={callback}
        initialData={{
          username: form?.username || '',
          password: form?.password || '',
        }}
        id={updateid} />
      <div className="min-h-screen bg-white text-gray-800 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <FiLock className="text-blue-500" /> Password Vault
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 rounded-lg p-6 shadow-md space-y-4 border border-gray-200"
          >
            <input
              name="username"
              placeholder="Username / Email"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full bg-white border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition"
            >
              <FiPlus /> Save Password
            </button>
          </form>

          <div className="mt-8 space-y-4">
            {entries.length < 1 ? 'No password saved ' :
              entries.map((entry: any) => (
                <div
                  key={entry._id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <h2 className="text-lg font-semibold text-blue-600">{entry.username}</h2>
                  <p className="text-sm text-gray-700">
                    <strong>Password:</strong> {entry.password}
                  </p>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => updateCalled(entry)}
                      className="px-3 py-1 text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-white rounded transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="px-3 py-1 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default Dashboard