import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import ReportColumn from './ReportColumn';
import ChatColumn from './ChatColumn';

const ReportAndChatView = ({ profile, setView }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isSending, setIsSending] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }) }
    useEffect(() => { if (messages.length > 0) { scrollToBottom(); } }, [messages]);

    const handleSend = (messageText = input) => { 
        if (messageText.trim() === '' || isSending) return; 
        setIsSending(true); 
        setMessages(prev => [...prev, { sender: 'user', text: messageText }]); 
        setInput(''); 
        setTimeout(() => { 
            setMessages(prev => [...prev, { sender: 'ai', text: `That's an interesting question. As an AI persona of ${profile.name}, my perspective on that is...` }]); 
            setIsSending(false); 
        }, 1500); 
    };

    if (!profile) return null;
    
    return (
         <div className="flex flex-col h-screen bg-slate-50 animate-fade-in">
            <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-md z-20">
                <div className="flex items-center">
                    <button onClick={() => setView('profiles')} className="p-2 rounded-full hover:bg-slate-100 mr-2"><ArrowLeft size={24} className="text-gray-600" /></button>
                    <div>
                        <h2 className="text-xl font-bold">Lead Intelligence Report</h2>
                        <p className="text-sm text-slate-500">Analysis for {profile.name} at {profile.company}</p>
                    </div>
                </div>
            </header>
            <div className="flex-1 grid lg:grid-cols-2 overflow-hidden">
                <ReportColumn profile={profile} />
                <ChatColumn profile={profile} messages={messages} input={input} setInput={setInput} handleSend={handleSend} isSending={isSending} chatEndRef={chatEndRef} />
            </div>
        </div>
    );
};

export default ReportAndChatView;