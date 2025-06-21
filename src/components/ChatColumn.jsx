import React from 'react';
import { MessageSquare, Send } from 'lucide-react';

const ChatColumn = ({ profile, messages, input, setInput, handleSend, isSending, chatEndRef }) => {
    return (
        <div className="flex flex-col bg-white overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
                <div className="h-full flex flex-col">
                    {messages.length === 0 ? (
                         <div className="text-center flex-1 flex flex-col justify-center">
                            <div className="inline-block bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full mb-4 shadow-lg self-center"><MessageSquare className="text-white" size={32} /></div>
                            <h3 className="text-2xl font-bold mb-2">Practice Your Sales Pitch</h3>
                            <p className="text-gray-500 mb-6">Start a conversation with {profile.name}</p>
                            <div className="space-y-3 w-full">{profile.suggestions && profile.suggestions.map((s, i) => (<button key={i} onClick={() => handleSend(s)} className="w-full text-left p-4 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200">{s}</button>))}</div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">{messages.map((msg, index) => (msg.sender === 'user' ? (<div key={index} className="flex justify-end"><div className="bg-indigo-600 text-white font-medium py-3 px-5 rounded-2xl max-w-lg shadow-sm rounded-br-none">{msg.text}</div></div>) : (<div key={index} className="flex items-start gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center shadow-md"><MessageSquare className="text-white" size={20}/></div><div className="bg-slate-100 text-gray-800 py-3 px-5 rounded-2xl max-w-lg shadow-sm rounded-bl-none"><p className="leading-relaxed">{msg.text}</p></div></div>)))}<div ref={chatEndRef} /></div>
                    )}
                </div>
            </div>
            <footer className="p-4 border-t border-slate-200 bg-white">
                 <div className="flex items-center gap-2">
                     <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder={`Practice your sales pitch...`} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"/>
                     <button onClick={() => handleSend()} disabled={!input || isSending} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all disabled:opacity-50"><Send size={24}/></button>
                 </div>
            </footer>
        </div>
    );
};

export default ChatColumn;