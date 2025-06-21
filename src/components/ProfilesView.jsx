import React, { useState } from 'react';
import { User } from 'lucide-react';
import ProfileCard from './ProfileCard';
import ConfirmationModal from './ConfirmationModal';

const ProfilesView = ({ profiles, viewReport, deleteProfile }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [profileToDelete, setProfileToDelete] = useState(null);

    const openDeleteModal = (profile) => {
        setProfileToDelete(profile);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setProfileToDelete(null);
    };

    const confirmDelete = () => {
        if(profileToDelete){
            deleteProfile(profileToDelete.id);
            closeDeleteModal();
        }
    };
    
    return (
        <div className="max-w-5xl mx-auto">
            <ConfirmationModal 
                isOpen={isDeleteModalOpen} 
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                title="Delete Profile"
                message={`Are you sure you want to delete the profile for ${profileToDelete?.name}? This action cannot be undone.`}
            />
            <div className="text-center mb-12">
                <div className="inline-block bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-full mb-6 shadow-lg"><User className="text-white" size={40} /></div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Your Persona Profiles</h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">Manage your researched personas, view reports, and practice conversations.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {profiles.map(profile => (<ProfileCard key={profile.id} profile={profile} viewReport={viewReport} openDeleteModal={openDeleteModal} />))}
            </div>
        </div>
    );
};

export default ProfilesView;