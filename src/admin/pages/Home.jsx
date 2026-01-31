import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { updateAbout } from '../../services/api';

const AdminHome = () => {
  const { about, refreshData } = usePortfolio();
  const [formData, setFormData] = useState({
    heroHiddenText: '',
    heroPrimaryText: '',
    heroSecondaryText: '',
    heroFlipWords: [],
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (about) {
      setFormData({
        heroHiddenText: about.heroHiddenText || '',
        heroPrimaryText: about.heroPrimaryText || '',
        heroSecondaryText: about.heroSecondaryText || '',
        heroFlipWords: about.heroFlipWords || [],
      });
    }
  }, [about]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFlipWordsChange = (e) => {
    // Split by comma
    const words = e.target.value.split(',').map(w => w.trim());
    setFormData({ ...formData, heroFlipWords: words });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateAbout({ id: about.id, ...formData });
      setMsg('Hero section updated successfully!');
      refreshData();
    } catch (error) {
      console.error(error);
      setMsg('Failed to update.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
      <h2 className="text-2xl font-bold mb-6">Manage Landing Content (Hero)</h2>
      {msg && <div className="mb-4 p-2 bg-indigo-500/20 text-indigo-300 rounded">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Hidden Text (Initial H1)</label>
          <input
            type="text"
            name="heroHiddenText"
            value={formData.heroHiddenText}
            onChange={handleChange}
            className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Primary Text (Above FlipWords)</label>
          <input
            type="text"
            name="heroPrimaryText"
            value={formData.heroPrimaryText}
            onChange={handleChange}
            className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Flip Words (Comma separated)</label>
          <input
            type="text"
            value={formData.heroFlipWords.join(', ')}
            onChange={handleFlipWordsChange}
            className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Secondary Text (Below FlipWords)</label>
          <input
            type="text"
            name="heroSecondaryText"
            value={formData.heroSecondaryText}
            onChange={handleChange}
            className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded transition-colors"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default AdminHome;
