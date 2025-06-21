import React from 'react';
import { Search, User } from 'lucide-react';

const ResearchView = ({ analyzing, handleStartResearch, personName, setPersonName, context, setContext, services, selectedService, setSelectedService }) => {
    return (
        <div className="max-w-2xl mx-auto flex flex-col items-center">
            <div className="text-center mb-10">
                 <div className="inline-block bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-full mb-6 shadow-lg"><Search className="text-white" size={40} /></div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Discover & Chat with Anyone</h2>
                <p className="text-lg text-gray-600 max-w-xl">Research any person and engage in AI-powered conversations that capture their unique personality and expertise.</p>
            </div>
            <div className="w-full bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                 <div className="flex items-center gap-3 mb-6"><User className="text-indigo-500" size={20}/><h3 className="text-xl font-semibold">Start Your Research</h3></div>
                <div className="mb-6">
                    <label htmlFor="person-name" className="block text-sm font-medium text-gray-700 mb-1">Person's Name *</label>
                    <input type="text" id="person-name" value={personName} onChange={(e) => setPersonName(e.target.value)} placeholder="e.g., Jane Doe" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"/>
                </div>
                 <div className="mb-6">
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Your Service/Product for Context *</label>
                    <select id="service" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900">
                        <option value="" disabled>Select a service...</option>
                        {services.length > 0 ? services.map(s => <option key={s.id} value={s.id}>{s.name}</option>) : <option disabled>No services added yet</option>}
                    </select>
                </div>
                <div>
                    <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-1">Additional Context (Optional)</label>
                    <textarea id="context" value={context} onChange={(e) => setContext(e.target.value)} rows="3" placeholder="e.g., Their company, role, recent news..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"></textarea>
                </div>
                <button onClick={handleStartResearch} disabled={analyzing || !personName || !selectedService} className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg">
                    {analyzing ? ( <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Analyzing...</> ) : ( <> <Search size={20}/> Start Research</> )}
                </button>
            </div>
        </div>
    );
};

export default ResearchView;