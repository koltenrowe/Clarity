import React, { useState, useEffect } from 'react';
import { Edit, X } from 'lucide-react';

const EditServiceModal = ({ service, isOpen, onClose, onUpdate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => { if (service) { setName(service.name); setDescription(service.description); } }, [service]);
    if (!isOpen) return null;
    const handleSubmit = (e) => { e.preventDefault(); onUpdate({ ...service, name, description }); };
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 animate-pop-in" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3"><Edit className="text-indigo-500"/><h3 className="text-xl font-semibold">Edit Service</h3></div>
                        <button type="button" onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-100"><X size={20}/></button>
                     </div>
                    <div className="mb-4">
                        <label htmlFor="edit-service-name" className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                        <input id="edit-service-name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="edit-service-desc" className="block text-sm font-medium text-gray-700 mb-1">Service Description</label>
                        <textarea id="edit-service-desc" value={description} onChange={e => setDescription(e.target.value)} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900" required></textarea>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"><Edit size={16} className="inline mr-2"/> Update Service</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditServiceModal;