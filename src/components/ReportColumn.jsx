import React, { useState } from 'react';
import { Target, Brain, Triangle, Calendar, Building, Info, ChevronDown } from 'lucide-react';

const ReportColumn = ({ profile }) => {
    const [expanded, setExpanded] = useState({});
    const toggleExpansion = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    }

    const ReportCard = ({ title, icon, children, elaboration, id }) => (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">{icon}<h3 className="text-xl font-bold">{title}</h3></div>
                {elaboration && <button onClick={() => toggleExpansion(id)} className="p-1 text-slate-400 hover:text-indigo-600 rounded-full hover:bg-slate-100 transition-colors"><ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expanded[id] ? 'rotate-180' : ''}`} /></button>}
            </div>
            {children}
            {elaboration && expanded[id] && <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-gray-600 animate-fade-in">{elaboration}</div>}
        </div>
    );

    const Bar = ({ label, value, color }) => (
        <div>
            <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium text-gray-700">{label}</span><span className="text-sm font-bold text-gray-800">{value}</span></div>
            <div className="w-full bg-slate-200 rounded-full h-2.5"><div className={`${color} h-2.5 rounded-full`} style={{ width: `${value}%` }}></div></div>
        </div>
    );
    const getLevelColor = (level) => {
        switch (level) {
            case 'High': case 'High Impact': return 'border-red-500 bg-red-50';
            case 'Medium': return 'border-yellow-500 bg-yellow-50';
            default: return 'border-slate-300 bg-slate-50';
        }
    }
    
    const CircularProgress = ({ percentage }) => {
        const radius = 52;
        const strokeWidth = 12;
        const viewBoxSize = 120;
        const effectiveRadius = (viewBoxSize / 2) - (strokeWidth / 2);
        const circumference = 2 * Math.PI * effectiveRadius;
        const offset = circumference - (percentage / 100) * circumference;

        return (
            <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
                    <circle className="text-slate-200" stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" r={effectiveRadius} cx={viewBoxSize / 2} cy={viewBoxSize / 2} />
                    <circle className="text-green-500" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" fill="transparent" r={effectiveRadius} cx={viewBoxSize / 2} cy={viewBoxSize / 2} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-800">{percentage}%</span>
                </div>
            </div>
        );
    };

    return (
        <div className="overflow-y-auto p-6 md:p-10 border-r border-slate-200">
             <div className="space-y-8">
                <ReportCard title="ICP Score" icon={<Target className="text-indigo-500" size={24}/>} id="icp" elaboration={profile.icpScore.elaboration}>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="justify-self-center"><CircularProgress percentage={profile.icpScore.total} /></div>
                        <div className="space-y-2">{profile.icpScore.attributes.map(attr => (<div key={attr.name} className="flex justify-between items-center text-sm"><span className="text-gray-600">{attr.name}</span><span className="font-semibold text-gray-800">{attr.score}/100</span></div>))}</div>
                    </div>
                </ReportCard>

                <ReportCard title="DISC Personality Profile" icon={<Brain className="text-indigo-500" size={24}/>} id="disc" elaboration={profile.discProfile.elaboration}>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                        <Bar label="Dominance" value={profile.discProfile.dominance} color="bg-red-500" />
                        <Bar label="Influence" value={profile.discProfile.influence} color="bg-yellow-500" />
                        <Bar label="Steadiness" value={profile.discProfile.steadiness} color="bg-green-500" />
                        <Bar label="Conscientiousness" value={profile.discProfile.conscientiousness} color="bg-blue-500" />
                        <div><h4 className="text-sm font-medium text-gray-500 mt-2">Primary Style</h4><p className="font-semibold text-lg">{profile.discProfile.style}</p></div>
                        <div><h4 className="text-sm font-medium text-gray-500 mt-2">Communication Style</h4><p className="font-semibold text-lg">{profile.discProfile.communicationStyle}</p></div>
                    </div>
                </ReportCard>
                
                <ReportCard title="Pain Points & Opportunities" icon={<Triangle className="text-indigo-500" size={24}/>} id="pain">
                    <div className="space-y-4">{profile.painPoints.map((point, i) => ( <div key={i} className={`p-4 rounded-lg border-l-4 ${getLevelColor(point.level)}`}><p className="font-semibold text-gray-800">{point.text}</p><p className="text-sm text-green-700 mt-1"><strong className="font-semibold">Opportunity:</strong> {point.opportunity}</p></div>))}</div>
                </ReportCard>
                
                <ReportCard title="Critical Company Events" icon={<Calendar className="text-indigo-500" size={24}/>} id="events">
                    <div className="space-y-4">{profile.criticalEvents.map((event, i) => (<div key={i} className={`p-4 rounded-lg border-l-4 ${getLevelColor(event.level)}`}><p className="font-semibold text-gray-800">{event.text} <span className="text-sm text-gray-500 font-normal ml-2">{event.date}</span></p><p className="text-sm text-green-700 mt-1"><strong className="font-semibold">Sales Opportunity:</strong> {event.opportunity}</p></div>))}</div>
                </ReportCard>

                <div className="grid md:grid-cols-2 gap-8">
                   <ReportCard title="Current Role" icon={<Building className="text-indigo-500" size={24}/>} id="role"><p className="text-gray-700">{profile.currentRole.title}</p><p className="text-sm text-gray-500 mt-2">Decision Making Power: <span className="font-bold">{profile.currentRole.decisionPower}</span></p></ReportCard>
                   <ReportCard title="Professional Background" icon={<Info className="text-indigo-500" size={24}/>} id="background"><p className="text-gray-700">{profile.professionalBackground}</p></ReportCard>
                </div>
            </div>
        </div>
    );
};

export default ReportColumn;