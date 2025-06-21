import React from 'react';
import { Building, Calendar, FileText, Trash2 } from 'lucide-react';

const ProfileCard = ({ profile, viewReport, openDeleteModal }) => {
    const getPowerColor = (power) => {
        switch (power) {
            case 'High': return 'bg-red-100 text-red-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Low': return 'bg-blue-100 text-blue-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    }
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 relative">
            <button onClick={() => openDeleteModal(profile)} className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"><Trash2 size={18}/></button>
            <div>
                <h3 className="text-xl font-bold mb-1">{profile.name}</h3>
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-2"><Building size={14}/> {profile.company}</p>
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-2"><Calendar size={14}/> {profile.date}</p>
                
                <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Pitching</h4>
                    <p className="font-medium text-gray-700">{profile.pitchingService}</p>
                </div>

                <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">DISC Profile</h4>
                    <span className="text-sm font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">{profile.discProfile.style}</span>
                </div>
                
                 <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Decision Power</h4>
                    <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${getPowerColor(profile.decisionPower)}`}>{profile.decisionPower}</span>
                </div>
            </div>
            <div className="mt-6">
                <button onClick={() => viewReport(profile)} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"><FileText size={16}/> View Report & Chat</button>
            </div>
        </div>
    );
};

export default ProfileCard;