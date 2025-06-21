import React, { useState } from 'react';
import { Package, Plus, Trash2, Edit } from 'lucide-react';
import EditServiceModal from './EditServiceModal';
import ConfirmationModal from './ConfirmationModal';

const ServicesView = ({ services, setServices }) => {
    const [serviceName, setServiceName] = useState('');
    const [serviceDesc, setServiceDesc] = useState('');
    const [editingService, setEditingService] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deletingService, setDeletingService] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleAddService = (e) => { e.preventDefault(); if (!serviceName.trim() || !serviceDesc.trim()) return; setServices(prev => [{ id: Date.now(), name: serviceName, description: serviceDesc }, ...prev]); setServiceName(''); setServiceDesc(''); };
    const handleOpenEditModal = (service) => { setEditingService(service); setIsEditModalOpen(true); };
    const handleCloseEditModal = () => { setEditingService(null); setIsEditModalOpen(false); };
    const handleUpdateService = (updatedService) => { setServices(services.map(s => s.id === updatedService.id ? updatedService : s)); handleCloseEditModal(); };

    const handleOpenDeleteModal = (service) => { setDeletingService(service); setIsDeleteModalOpen(true); };
    const handleCloseDeleteModal = () => { setDeletingService(null); setIsDeleteModalOpen(false); };
    const confirmDeleteService = () => { if(deletingService) { setServices(services.filter(s => s.id !== deletingService.id)); handleCloseDeleteModal(); }};

    return (
        <div className="max-w-4xl mx-auto">
            <EditServiceModal service={editingService} isOpen={isEditModalOpen} onClose={handleCloseEditModal} onUpdate={handleUpdateService} />
            <ConfirmationModal 
                isOpen={isDeleteModalOpen} 
                onClose={handleCloseDeleteModal}
                onConfirm={confirmDeleteService}
                title="Delete Service"
                message={`Are you sure you want to delete the service "${deletingService?.name}"? This action cannot be undone.`}
            />
            <div className="text-center mb-12">
                <div className="inline-block bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-full mb-6 shadow-lg"><Package className="text-white" size={40} /></div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Your Service Offerings</h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">Manage the products and services you use to generate persona insights.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 mb-12">
                <form onSubmit={handleAddService}>
                    <div className="flex items-center gap-3 mb-6"><Plus className="text-indigo-500"/><h3 className="text-xl font-semibold">Add a New Service</h3></div>
                    <div className="mb-4"><label htmlFor="service-name" className="block text-sm font-medium text-gray-700 mb-1">Service Name</label><input id="service-name" type="text" value={serviceName} onChange={e => setServiceName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900" required /></div>
                    <div className="mb-6"><label htmlFor="service-desc" className="block text-sm font-medium text-gray-700 mb-1">Service Description</label><textarea id="service-desc" value={serviceDesc} onChange={e => setServiceDesc(e.target.value)} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900" required></textarea></div>
                    <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg"><Plus size={20} /> Save Service</button>
                </form>
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-6">Your Saved Services</h3>
                {services.length === 0 ? ( <p className="text-center text-gray-500 py-8 bg-slate-100 rounded-lg">You haven't added any services yet. Add one above to get started.</p> ) : (
                    <div className="space-y-4">{services.map(service => (<div key={service.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex justify-between items-start"><div><h4 className="font-bold text-lg text-gray-800">{service.name}</h4><p className="text-gray-600">{service.description}</p></div><div className="flex gap-2 flex-shrink-0 ml-4"><button onClick={() => handleOpenEditModal(service)} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition-colors"><Edit size={18}/></button><button onClick={() => handleOpenDeleteModal(service)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-md transition-colors"><Trash2 size={18}/></button></div></div>))}</div>
                )}
            </div>
        </div>
    )
};

export default ServicesView;