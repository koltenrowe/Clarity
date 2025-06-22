import React from 'react';
import { Sparkles, ArrowRight, XCircle, CheckCircle, Search, Target, Phone, FileText, MessageSquare, Briefcase, Users, Star } from 'lucide-react';

// A simple component for the feature cards to reduce repetition
const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200/80 text-center flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow">
        <div className="mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-full text-white">
            {icon}
        </div>
        <h3 className="font-bold text-lg mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);

const LandingPage = ({ enterApp }) => {
    return (
        <div className="bg-white text-gray-800 font-sans">
            {/* Header */}
            <header className="sticky top-0 bg-white/90 backdrop-blur-md z-20 border-b border-slate-200">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={enterApp}>
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg"><Sparkles className="text-white" size={24} /></div>
                        <h1 className="text-xl font-bold text-gray-800">Clarity <span className="font-light text-indigo-500">AI Persona Research</span></h1>
                    </div>
                    <div>
                        <button onClick={enterApp} className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md">
                           Enter App
                        </button>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main>
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="container mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 leading-tight">Cut Sales Research Time by <span className="text-indigo-600">80%</span></h1>
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">Book More Meetings in Less Time</h2>
                            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">Your AI-powered prospect intelligence engine. Turn any name into instant insights, cold call scripts, and personalized messaging.</p>
                            <div className="flex justify-center lg:justify-start gap-4">
                                <button onClick={enterApp} className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-transform hover:scale-105 shadow-lg">
                                    Try It Now – Start Free
                                </button>
                                 <button className="bg-white text-gray-700 font-bold py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-100 transition-transform hover:scale-105 shadow-lg">
                                    Watch Demo <ArrowRight className="inline ml-1" size={16}/>
                                </button>
                            </div>
                        </div>

                        {/* Visual Lead Profile Card */}
                        <div className="relative flex justify-center">
                            <div className="bg-white p-6 rounded-2xl shadow-2xl border w-full max-w-md transform transition-transform hover:scale-105">
                                <h3 className="font-bold text-gray-800 mb-4">Lead Profile: <span className="font-normal">Sarah Chen</span></h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                        <span className="text-sm text-gray-600">Primary DISC</span>
                                        <span className="font-semibold text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Dominance</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                        <span className="text-sm text-gray-600">Decision Power</span>
                                        <span className="font-semibold text-sm text-red-600 bg-red-100 px-3 py-1 rounded-full">High</span>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-sm text-gray-800 mb-2">AI Cold Call Script</h4>
                                        <p className="text-sm text-gray-600">"Hi Sarah, I noticed TechCorp just announced your Series B. With that growth, you're probably scaling your sales team..."</p>
                                    </div>
                                    <div className="flex justify-between items-center border-t pt-4">
                                        <span className="text-sm text-gray-600">Apple Call Screening Compatible</span>
                                        <div className="w-12 h-6 flex items-center bg-green-500 rounded-full p-1"><div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-6"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comparison Section */}
                <section className="py-20 px-4 bg-slate-50">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Sales Reps Spend <span className="text-red-600">30%</span> of Their Day on Research</h2>
                        <p className="text-lg text-gray-600 mb-12">Let's Fix That.</p>
                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <div className="bg-white p-8 rounded-xl border-t-4 border-red-500 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">The Old Way</h3>
                                <ul className="space-y-4 text-gray-600 text-left">
                                    <li className="flex items-start gap-3"><XCircle className="text-red-500 mt-1 flex-shrink-0" size={20}/><span>10-15 minutes researching each lead</span></li>
                                    <li className="flex items-start gap-3"><XCircle className="text-red-500 mt-1 flex-shrink-0" size={20}/><span>Juggling tabs, LinkedIn, websites, CRMs</span></li>
                                    <li className="flex items-start gap-3"><XCircle className="text-red-500 mt-1 flex-shrink-0" size={20}/><span>Cold calls get blocked or ignored</span></li>
                                    <li className="flex items-start gap-3"><XCircle className="text-red-500 mt-1 flex-shrink-0" size={20}/><span>Generic emails don't convert</span></li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 rounded-xl border-t-4 border-green-500 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">With Clarity AI</h3>
                                 <ul className="space-y-4 text-gray-600 text-left">
                                    <li className="flex items-start gap-3"><CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20}/><span>15 seconds for complete prospect intel</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20}/><span>All insights in one dashboard</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20}/><span>Personalized scripts that connect</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20}/><span>35% higher email reply rates</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                         <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Everything You Need, in One Prospect Profile</h2>
                         <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">Stop wasting time on manual research. Get instant, actionable insights that close deals.</p>
                         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard icon={<Search size={24}/>} title="Instant Prospect Insights" description="Just type a name, we'll pull everything. No more tab juggling or manual research." />
                            <FeatureCard icon={<Target size={24}/>} title="Smart ICP Score & Breakdown" description="See fit percentage — why they're your ideal customer with DISC personality analysis." />
                            <FeatureCard icon={<Phone size={24}/>} title="Cold Call Scripts" description="Customized scripts based on prospect's background and communication style." />
                            <FeatureCard icon={<MessageSquare size={24}/>} title="Email & DM Templates" description="Auto-personalized messaging based on pain points and company events." />
                            <FeatureCard icon={<Briefcase size={24}/>} title="Pre-Call Chat Simulation" description="Practice conversations with AI that responds like your actual prospect." />
                            <FeatureCard icon={<FileText size={24}/>} title="Full Lead Research Report" description="Complete intelligence briefing. No need to dig for context ever again." />
                         </div>
                    </div>
                </section>

                {/* Stats & Testimonial Section */}
                <section className="py-20 px-4 bg-gray-900 text-white">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-3">Outsell the Competition — with Zero Prep Time</h2>
                            <p className="text-lg text-gray-400">Real results from sales teams using Clarity AI</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20 max-w-6xl mx-auto">
                            <div className="text-center"><p className="text-5xl font-bold text-indigo-400 mb-2">+80%</p><h4 className="font-semibold">Faster Pre-Call Prep</h4></div>
                            <div className="text-center"><p className="text-5xl font-bold text-indigo-400 mb-2">+20%</p><h4 className="font-semibold">Cold Call Connect Success</h4></div>
                            <div className="text-center"><p className="text-5xl font-bold text-indigo-400 mb-2">+35%</p><h4 className="font-semibold">Higher Email Reply Rates</h4></div>
                            <div className="text-center"><p className="text-5xl font-bold text-indigo-400 mb-2">15 sec</p><h4 className="font-semibold">Research Time</h4></div>
                        </div>

                        <div className="grid lg:grid-cols-5 gap-8 items-center bg-gray-800 p-8 rounded-2xl max-w-5xl mx-auto">
                            <div className="lg:col-span-3">
                                <h3 className="text-2xl font-bold mb-4">Built for Outbound Teams</h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {['AEs', 'SDRs', 'BDRs', 'Sales Ops Leaders'].map(tag => (
                                        <span key={tag} className="bg-indigo-500/30 text-indigo-200 text-sm font-semibold px-3 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <div className="bg-black/20 p-6 rounded-lg">
                                    <div className="flex text-yellow-400 mb-3"><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/></div>
                                    <blockquote className="text-lg italic text-gray-300">
                                        "Before this, I spent 2-3 hours a day researching leads. Now I'm booking 2x more meetings with less effort."
                                    </blockquote>
                                    <p className="mt-3 text-gray-400">— Sales Rep @ B2B SaaS</p>
                                </div>
                            </div>
                            <div className="lg:col-span-2 text-center bg-gray-900/50 p-8 rounded-lg">
                                <Users className="mx-auto text-indigo-400 mb-4" size={48}/>
                                <h3 className="text-xl font-bold mb-2">Join 1,000+ Sales Professionals</h3>
                                <p className="text-gray-400 mb-6">Who've already transformed their prospecting game with AI-powered intelligence.</p>
                                <button onClick={enterApp} className="w-full bg-indigo-600 font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg">
                                    Start Your Free Trial
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="text-center py-20 px-4">
                     <div className="container mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Start Booking More Meetings Now</h2>
                        <p className="text-lg text-gray-600 mb-8">Transform your sales process in minutes. No setup required, no learning curve.</p>
                        <button onClick={enterApp} className="bg-indigo-600 text-white font-bold py-4 px-8 text-lg rounded-lg hover:bg-indigo-700 transition-transform hover:scale-105 shadow-lg">
                            Try It Free – No Credit Card Required
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;

