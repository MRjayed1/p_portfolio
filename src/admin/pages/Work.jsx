import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { createProject, updateProject, deleteProject } from '../../services/api';

const AdminWork = () => {
  const { projects, skills, refreshData } = usePortfolio();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subDescription: '', // stored as string with newlines
    href: '',
    logo: '',
    image: '',
    tags: [] // array of skill IDs
  });
  
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formData,
        subDescription: formData.subDescription.split('\n').filter(l => l.trim() !== '')
      };

      if (editingId) {
        await updateProject(editingId, data);
      } else {
        await createProject(data);
      }
      
      refreshData();
      resetForm();
    } catch (error) {
      console.error(error);
      alert('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      subDescription: project.subDescription.join('\n'),
      href: project.href || '',
      logo: project.logo || '',
      image: project.image || '',
      tags: project.tags.map(t => t.id)
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (confirm('Delete project?')) {
      try {
        await deleteProject(id);
        refreshData();
      } catch (error) {
        console.error(error);
        alert('Failed to delete');
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      subDescription: '',
      href: '',
      logo: '',
      image: '',
      tags: []
    });
  };

  const toggleTag = (skillId) => {
    setFormData(prev => {
      if (prev.tags.includes(skillId)) {
        return { ...prev, tags: prev.tags.filter(id => id !== skillId) };
      } else {
        return { ...prev, tags: [...prev.tags, skillId] };
      }
    });
  };

  return (
    <div className="space-y-8">
       <div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Image Path</label>
                <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Link (href)</label>
                <input type="text" value={formData.href} onChange={e => setFormData({...formData, href: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Logo Path</label>
                <input type="text" value={formData.logo} onChange={e => setFormData({...formData, logo: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
              </div>
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" required />
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Sub Description (Points - one per line)</label>
              <textarea rows="4" value={formData.subDescription} onChange={e => setFormData({...formData, subDescription: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white" />
           </div>
           
           <div>
             <label className="block text-sm font-medium text-gray-400 mb-2">Technologies (Tags)</label>
             <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border border-white/10 rounded">
                {skills && skills.map(skill => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => toggleTag(skill.id)}
                    className={`px-3 py-1 rounded text-sm ${formData.tags.includes(skill.id) ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                  >
                    {skill.name}
                  </button>
                ))}
             </div>
           </div>

           <div className="flex gap-4 pt-2">
             <button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded transition-colors">
                {loading ? 'Saving...' : (editingId ? 'Update Project' : 'Create Project')}
             </button>
             {editingId && (
               <button type="button" onClick={resetForm} className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded transition-colors">
                 Cancel
               </button>
             )}
           </div>
        </form>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects && projects.map(project => (
            <div key={project.id} className="bg-neutral-900 rounded-xl border border-white/10 overflow-hidden flex flex-col">
               {project.image && <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />}
               <div className="p-4 flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag.id} className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">{tag.name}</span>
                    ))}
                  </div>
               </div>
               <div className="p-4 border-t border-white/10 flex justify-end gap-3 bg-black/20">
                  <button onClick={() => handleEdit(project)} className="text-blue-400 hover:text-blue-300 text-sm font-medium">Edit</button>
                  <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-300 text-sm font-medium">Delete</button>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

export default AdminWork;
