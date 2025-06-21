import React from 'react';
import { Sparkles, Search, Package, User } from 'lucide-react';

const Header = ({ setView, navigateToResearch, activeView }) => {
    return (
        <header className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateToResearch()} role="button" tabIndex="0">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg"><Sparkles className="text-white" size={24} /></div>
                <h1 className="text-xl font-bold text-gray-800">Clarity <span className="font-light text-indigo-500">AI Persona Research</span></h1>
            </div>
            <nav className="flex items-center gap-2">
                <button onClick={() => setView('research')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeView === 'research' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-slate-100'}`}><Search size={18} /> <span className="hidden sm:inline">Research</span></button>
                <button onClick={() => setView('services')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeView === 'services' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-slate-100'}`}><Package size={18} /> <span className="hidden sm:inline">Services</span></button>
                <button onClick={() => setView('profiles')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeView === 'profiles' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-slate-100'}`}><User size={18} /> <span className="hidden sm:inline">Profiles</span></button>
            </nav>
        </header>
    );
};

export default Header;