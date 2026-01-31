import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { updateAbout } from '../../services/api';

const AdminCV = () => {
  const { about, refreshData } = usePortfolio();
  const [cvUrl, setCvUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (about) {
      setCvUrl(about.cvUrl || '');
    }
  }, [about]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateAbout({ id: about.id, cvUrl });
      setMsg('CV URL updated successfully!');
      refreshData();
    } catch (error) {
      console.error(error);
      setMsg('Failed to update.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900 p-6 rounded-xl border border-white/10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage CV / Resume</h2>
      {msg && <div className="mb-4 p-2 bg-indigo-500/20 text-indigo-300 rounded">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Resume URL (PDF Link)</label>
          <input
            type="text"
            value={cvUrl}
            onChange={(e) => setCvUrl(e.target.value)}
            placeholder="https://example.com/my-resume.pdf"
            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
          />
          <p className="mt-2 text-xs text-gray-500">
            Enter the direct URL to your PDF resume. This link will be used in the navbar "CV" button (if implemented) or download section.
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded transition-colors"
        >
          {loading ? 'Saving...' : 'Update CV Link'}
        </button>
      </form>
    </div>
  );
};

export default AdminCV;
