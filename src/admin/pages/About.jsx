import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { updateAbout, createSkill, deleteSkill, createExperience, updateExperience, deleteExperience } from '../../services/api';

const AdminAbout = () => {
  const { about, skills, experiences, refreshData } = usePortfolio();
  
  // About Form
  const [aboutForm, setAboutForm] = useState({});
  const [loadingAbout, setLoadingAbout] = useState(false);
  const [msgAbout, setMsgAbout] = useState('');

  // Skill Form
  const [newSkill, setNewSkill] = useState({ name: '', path: '' });
  
  // Experience Form
  const [expForm, setExpForm] = useState({ title: '', company: '', date: '', contents: '' });
  const [editingExpId, setEditingExpId] = useState(null);

  useEffect(() => {
    if (about) {
      setAboutForm({
        name: about.name || '',
        title: about.title || '',
        subTitle: about.subTitle || '',
        description: about.description || '',
        image: about.image || '',
        location: about.location || '',
        email: about.email || '',
      });
    }
  }, [about]);

  const handleAboutSubmit = async (e) => {
    e.preventDefault();
    setLoadingAbout(true);
    try {
      await updateAbout({ id: about.id, ...aboutForm });
      setMsgAbout('About section updated!');
      refreshData();
    } catch (error) {
      console.error(error);
      setMsgAbout('Failed to update.');
    } finally {
      setLoadingAbout(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) return;
    try {
      await createSkill(newSkill);
      setNewSkill({ name: '', path: '' });
      refreshData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSkill = async (id) => {
    if (confirm('Delete skill?')) {
      try {
        await deleteSkill(id);
        refreshData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleExpSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...expForm,
        contents: expForm.contents.split('\n').filter(line => line.trim() !== '')
      };
      
      if (editingExpId) {
        await updateExperience(editingExpId, data);
      } else {
        await createExperience(data);
      }
      setExpForm({ title: '', company: '', date: '', contents: '' });
      setEditingExpId(null);
      refreshData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditExp = (exp) => {
    setEditingExpId(exp.id);
    setExpForm({
      title: exp.title,
      company: exp.company || '',
      date: exp.date,
      contents: exp.contents.join('\n')
    });
  };

  const handleDeleteExp = async (id) => {
    if (confirm('Delete experience?')) {
      try {
        await deleteExperience(id);
        refreshData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* About Section */}
      <div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold mb-6">Manage About Text</h2>
        {msgAbout && <div className="mb-4 p-2 bg-indigo-500/20 text-indigo-300 rounded">{msgAbout}</div>}
        <form onSubmit={handleAboutSubmit} className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <input type="text" value={aboutForm.name || ''} onChange={e => setAboutForm({...aboutForm, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
              <input type="text" value={aboutForm.title || ''} onChange={e => setAboutForm({...aboutForm, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Subtitle</label>
              <input type="text" value={aboutForm.subTitle || ''} onChange={e => setAboutForm({...aboutForm, subTitle: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
              <input type="text" value={aboutForm.location || ''} onChange={e => setAboutForm({...aboutForm, location: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input type="text" value={aboutForm.email || ''} onChange={e => setAboutForm({...aboutForm, email: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Image Path</label>
              <input type="text" value={aboutForm.image || ''} onChange={e => setAboutForm({...aboutForm, image: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
            </div>
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea rows="3" value={aboutForm.description || ''} onChange={e => setAboutForm({...aboutForm, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
           </div>
           <button type="submit" disabled={loadingAbout} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded transition-colors">
              {loadingAbout ? 'Saving...' : 'Save About'}
           </button>
        </form>
      </div>

      {/* Skills Section */}
      <div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold mb-6">Manage Skills</h2>
        <div className="flex gap-4 mb-6">
          <input type="text" placeholder="Skill Name" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
          <input type="text" placeholder="Icon Path (optional)" value={newSkill.path} onChange={e => setNewSkill({...newSkill, path: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
          <button onClick={handleAddSkill} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills && skills.map(skill => (
            <div key={skill.id} className="bg-white/5 rounded px-3 py-1 flex items-center gap-2">
              {skill.path && <img src={skill.path} alt={skill.name} className="w-4 h-4" />}
              <span>{skill.name}</span>
              <button onClick={() => handleDeleteSkill(skill.id)} className="text-red-400 hover:text-red-300 ml-2">×</button>
            </div>
          ))}
        </div>
      </div>

      {/* Experiences Section */}
      <div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold mb-6">Manage Experience</h2>
        <form onSubmit={handleExpSubmit} className="mb-8 p-4 bg-black/30 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{editingExpId ? 'Edit Experience' : 'Add Experience'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
             <input type="text" placeholder="Title" value={expForm.title} onChange={e => setExpForm({...expForm, title: e.target.value})} className="bg-black/50 border border-white/10 rounded px-3 py-2 text-white" required />
             <input type="text" placeholder="Company" value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} className="bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
             <input type="text" placeholder="Date" value={expForm.date} onChange={e => setExpForm({...expForm, date: e.target.value})} className="bg-black/50 border border-white/10 rounded px-3 py-2 text-white" required />
          </div>
          <textarea placeholder="Contents (one per line)" rows="4" value={expForm.contents} onChange={e => setExpForm({...expForm, contents: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white mb-4" />
          <div className="flex gap-2">
             <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">{editingExpId ? 'Update' : 'Add'}</button>
             {editingExpId && <button type="button" onClick={() => { setEditingExpId(null); setExpForm({ title: '', company: '', date: '', contents: '' }); }} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>

        <div className="space-y-4">
          {experiences && experiences.map(exp => (
            <div key={exp.id} className="p-4 bg-white/5 rounded flex justify-between items-start">
               <div>
                  <h4 className="font-bold text-lg">{exp.title}</h4>
                  <p className="text-gray-400 text-sm">{exp.company} | {exp.date}</p>
                  <ul className="list-disc list-inside mt-2 text-gray-300 text-sm">
                    {exp.contents.map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => handleEditExp(exp)} className="text-blue-400 hover:text-blue-300">Edit</button>
                  <button onClick={() => handleDeleteExp(exp.id)} className="text-red-400 hover:text-red-300">Delete</button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
