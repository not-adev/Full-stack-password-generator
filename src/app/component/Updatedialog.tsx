'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface UpdateModalProps {
    id: string
    fetchPasswords: () => Promise<void> 
    isOpen: boolean
    onClose: () => void
    callback : () => void
    initialData: { username: string; password: string }
}

const UpdateModal: React.FC<UpdateModalProps> = ({
    isOpen,
    id,
    callback,
    fetchPasswords,
    onClose,
    initialData,
}) => {
    const [form, setForm] = useState(initialData)

    useEffect(() => {
        setForm(initialData)
    }, [initialData])


    const handleUpdate = async () => {
        console.log("hadle update")

        try {
            const res = await axios.put('/api/updatePassword', {
                passwordId: id ,
                username: form.username,
                password: form.password,
            }
            )

        if (res.data.success) {
            fetchPasswords() // refresh list
            setForm({ username : "" , password :""})
            callback()
        } else {
            console.error('Update failed:', res.data.error)
        }
    } catch (error) {
        console.error('Error updating password:', error)
    }
}

if (!isOpen) return null

return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Update Credentials</h2>

            <input
                type="text"
                placeholder="New Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
                type="text"
                placeholder="New Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                >
                    Cancel
                </button>
                <button
                    onClick={() => handleUpdate()}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
)
}

export default UpdateModal