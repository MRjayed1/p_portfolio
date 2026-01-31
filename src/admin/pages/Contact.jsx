import React, { useState, useEffect } from 'react';
import { getMessages, deleteMessage } from '../../services/api';

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this message?')) {
      try {
        await deleteMessage(id);
        fetchMessages();
      } catch (error) {
        console.error(error);
        alert('Failed to delete');
      }
    }
  };

  return (
    <div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <button onClick={fetchMessages} className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded">Refresh</button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No messages found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-4 text-sm text-gray-400 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-white font-medium">{msg.name}</td>
                  <td className="py-3 px-4 text-gray-300">{msg.email}</td>
                  <td className="py-3 px-4 text-gray-300 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => handleDelete(msg.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContact;
