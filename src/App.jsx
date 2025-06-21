import React, { useState } from 'react';
import Header from './components/Header';
import ResearchView from './components/ResearchView';
import ServicesView from './components/ServicesView';
import ProfilesView from './components/ProfilesView';
import ReportAndChatView from './components/ReportAndChatView';

// Main App Component
export default function App() {
    const [view, setView] = useState('research'); // 'research', 'services', 'profiles', 'report', 'chat'
    const [profiles, setProfiles] = useState([
        {
            id: 1,
            name: 'AC Rockett',
            company: 'Ministry Brands',
            date: 'Jun 19, 2025',
            pitchingService: 'Enterprise CRM Suite',
            description: 'Account Executive at Ministry Brands',
            summary: 'AC Rockett is a results-driven Account Executive at Ministry Brands with a passion for helping organizations thrive. Known for an empathetic approach and meticulous attention to detail.',
            traits: [
                'Visionary and ambitious, often setting audacious goals to drive technological innovation.',
                'Resilient and persistent, demonstrating a willingness to take significant risks to achieve his objectives.',
                'Controversial and polarizing, with a tendency to make bold statements and decisions that attract both admiration and criticism.'
            ],
            suggestions: [
                'Tell me about your background',
                "What's your perspective on current trends?",
                'What advice would you give?'
            ],
            discProfile: {
                style: 'Influence',
                dominance: 60,
                influence: 70,
                steadiness: 50,
                conscientiousness: 80,
                communicationStyle: 'Collaborative',
                decisionMaking: 'Consensus-driven',
                elaboration: "An 'Influence' style suggests AC is outgoing, enthusiastic, and persuasive. They are likely motivated by social recognition and building relationships. When communicating, focus on positive aspects and testimonials. Avoid getting bogged down in too many details upfront."
            },
            icpScore: {
                total: 78,
                attributes: [
                    { name: 'Industry Fit', score: 90, weight: 25 },
                    { name: 'Organization Size', score: 70, weight: 15 },
                    { name: 'Pain Point Match', score: 85, weight: 25 },
                    { name: 'Tech Stack Fit', score: 60, weight: 15 },
                    { name: 'Buying Triggers', score: 75, weight: 10 },
                    { name: 'Geographic Fit', score: 95, weight: 10 },
                ],
                elaboration: "The high ICP score of 78% indicates a strong match. The primary drivers are excellent Industry Fit and Pain Point Match. While Tech Stack Fit is lower, the strong buying triggers suggest an opportune time to engage."
            },
            decisionPower: 'Medium',
            painPoints: [
                { text: "Complexity in managing customs declarations and compliance with evolving regulations.", opportunity: "Our SaaS solution can automate and streamline the customs declaration process, ensuring compliance with the latest regulations and reducing manual errors.", level: 'High', elaboration: "This is a significant operational burden. Frame the conversation around reducing risk and freeing up employee time for higher-value tasks." },
                { text: "Inefficiencies in tracking and managing logistics assets.", opportunity: "Our SaaS platform offers real-time tracking and management of logistics assets, enhancing visibility and operational efficiency.", level: 'Medium', elaboration: "Asset visibility is key to cost savings. Highlight potential ROI through reduced loss and improved utilization." },
            ],
            criticalEvents: [
                { date: '2024-04-22', text: 'Acquisition by The Descartes Systems Group', opportunity: 'The acquisition may lead to increased resources and a broader customer base, presenting an opportunity to offer our SaaS solution to a larger audience within the Descartes ecosystem.', level: 'High Impact', elaboration: "Post-acquisition integration is a perfect time to introduce new, efficient solutions. They will be actively looking for synergies and improvements." }
            ],
            currentRole: {
                title: 'Customs Declaration Software Solutions Provider',
                decisionPower: 'Medium',
                elaboration: "As a provider in this space, AC understands the complexities of the industry. This means a more technical, peer-to-peer conversation may be effective. They will appreciate a deep understanding of the problem space."
            },
            professionalBackground: 'ASD is a software company headquartered in Dublin, Ireland, founded in 1996. It specializes in customs declaration software solutions for logistics service providers and shippers, operating under the brand Thyme-IT.'
        },
    ]);
    const [services, setServices] = useState([
        { id: 1, name: 'Enterprise CRM Suite', description: 'A full-featured CRM for large organizations, designed to streamline sales, marketing, and customer support.'}
    ]);

    const [activeProfile, setActiveProfile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    
    const [personName, setPersonName] = useState('');
    const [context, setContext] = useState('');
    const [selectedService, setSelectedService] = useState('');

    const handleStartResearch = () => {
        if (!personName || !selectedService) return;
        setAnalyzing(true);
        const serviceDetails = services.find(s => s.id == selectedService);
        
        setTimeout(() => {
            const company = context.split(',')[0] || 'Unknown Company';
            
            const attributes = [
                { name: 'Industry Fit', score: Math.floor(Math.random() * 50) + 50, weight: 25 },
                { name: 'Organization Size', score: Math.floor(Math.random() * 50) + 50, weight: 15 },
                { name: 'Pain Point Match', score: Math.floor(Math.random() * 50) + 50, weight: 25 },
                { name: 'Tech Stack Fit', score: Math.floor(Math.random() * 50) + 50, weight: 15 },
                { name: 'Buying Triggers', score: Math.floor(Math.random() * 50) + 50, weight: 10 },
                { name: 'Geographic Fit', score: Math.floor(Math.random() * 50) + 50, weight: 10 },
            ];

            const totalScore = Math.round(attributes.reduce((acc, attr) => acc + (attr.score * attr.weight / 100), 0));

            const newProfile = {
                id: Date.now(),
                name: personName,
                company: company,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                pitchingService: serviceDetails.name,
                description: `Persona at ${company}`,
                summary: `This is a generated analysis for ${personName}, considering a pitch for the "${serviceDetails.name}" service. Additional context provided: "${context}". The analysis would focus on potential needs, pain points, and how the service's value proposition aligns with their role.`,
                traits: [
                    'AI-generated trait: Likely values ROI and efficiency.',
                    'AI-generated trait: May be receptive to data-driven arguments.',
                    'AI-generated trait: Could be a key decision-maker for this type of product.'
                ],
                suggestions: [
                    `What are your biggest professional challenges?`,
                    `How do you currently handle challenges related to ${serviceDetails.name.toLowerCase()}?`,
                    `What are your goals for the next quarter?`
                ],
                discProfile: { style: 'Influence', dominance: Math.floor(Math.random() * 100), influence: Math.floor(Math.random() * 100), steadiness: Math.floor(Math.random() * 100), conscientiousness: Math.floor(Math.random() * 100), communicationStyle: 'Collaborative', decisionMaking: 'Consensus-driven', elaboration: "This is an AI-generated elaboration on the DISC profile, providing deeper insights into communication strategies." },
                icpScore: { total: totalScore, attributes: attributes, elaboration: "This is an AI-generated summary of the ICP score, explaining the rationale behind the rating." },
                decisionPower: 'Medium',
                painPoints: [{ text: "AI-generated: Difficulty in adapting to new market trends.", opportunity: "Our service provides real-time market insights to facilitate quick adaptation.", level: 'High', elaboration: "AI-generated elaboration on this specific pain point." }],
                criticalEvents: [{ date: new Date().toISOString().slice(0, 10), text: 'Initial analysis completed by Clarity AI.', opportunity: 'This marks the beginning of a data-driven engagement strategy.', level: 'Medium', elaboration: "AI-generated elaboration on this critical event." }],
                currentRole: { title: 'AI-Generated Role', decisionPower: 'Medium' },
                professionalBackground: 'AI-generated professional background based on research context.'
            };
            setProfiles(prevProfiles => [newProfile, ...prevProfiles]);
            setActiveProfile(newProfile);
            setAnalyzing(false);
            setView('report');
            setPersonName('');
            setContext('');
            setSelectedService('');
        }, 2000);
    };

    const handleDeleteProfile = (profileId) => {
        setProfiles(profiles.filter(p => p.id !== profileId));
    }
    
    const viewReport = (profile) => {
        setActiveProfile(profile);
        setView('report');
    };
    
    const navigateToResearch = () => {
        setView('research');
        setActiveProfile(null);
    }

    const renderView = () => {
        switch (view) {
            case 'services':
                return <ServicesView services={services} setServices={setServices} />;
            case 'profiles':
                return <ProfilesView profiles={profiles} viewReport={viewReport} deleteProfile={handleDeleteProfile} />;
            case 'report':
                return <ReportAndChatView profile={activeProfile} setView={setView} />;
            case 'research':
            default:
                return <ResearchView 
                            analyzing={analyzing} 
                            handleStartResearch={handleStartResearch} 
                            personName={personName}
                            setPersonName={setPersonName}
                            context={context}
                            setContext={setContext}
                            services={services}
                            selectedService={selectedService}
                            setSelectedService={setSelectedService}
                        />;
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-gray-800">
            <style>{`
                @keyframes bounceInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-bounce-in-up { animation: bounceInUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
                @keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                 /* Custom Scrollbar Styles */
                ::-webkit-scrollbar { width: 12px; }
                ::-webkit-scrollbar-track { background: #f1f5f9; }
                ::-webkit-scrollbar-thumb { background-color: #94a3b8; border-radius: 6px; border: 3px solid #f1f5f9; }
                ::-webkit-scrollbar-thumb:hover { background-color: #64748b; }
            `}</style>
            {view !== 'report' && <Header setView={setView} navigateToResearch={navigateToResearch} activeView={view} />}
            <main className={view !== 'report' ? 'px-4 py-8 sm:px-6 lg:px-8' : ''}>
                {view !== 'report' ? (
                     <div key={view} className="animate-bounce-in-up">
                        {renderView()}
                     </div>
                ) : (
                     renderView()
                )}
            </main>
        </div>
    );
}