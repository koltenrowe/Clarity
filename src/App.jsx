import React, { useState, useRef, useEffect } from 'react';

// Custom Modal Component 
function Modal({ message, onConfirm, onCancel, inputs = [], children }) {
    const [formState, setFormState] = useState(() =>
        inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.initialValue || '' }), {})
    );
    // Add error state
    const [errors, setErrors] = useState({});
    const firstInputRef = useRef(null);

    useEffect(() => {
        if (inputs.length > 0 && firstInputRef.current) {
            firstInputRef.current.focus();
            firstInputRef.current.select();
        }
    }, [inputs]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
        // Clear the error for a field when the user starts typing in it
        if (errors[name]) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    
    // New handler for the confirm button that includes validation
    const handleConfirmClick = () => {
        const validationErrors = {};
        inputs.forEach(input => {
            if (input.required && !formState[input.name]?.trim()) {
                validationErrors[input.name] = input.errorText || `This field is required.`;
            }
        });

        // If there are any errors, update the error state and stop
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Otherwise, clear errors and call the parent's onConfirm function
            setErrors({});
            onConfirm(formState);
        }
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.type !== 'textarea') {
            e.preventDefault();
            handleConfirmClick(); // Use the new validation handler
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-2xl w-full max-w-lg">
                <div className="flex justify-between items-center mb-5">
                    <p className="text-gray-100 text-lg font-semibold">{message}</p>
                    <button onClick={onCancel} className="text-gray-400 hover:text-white">&times;</button>
                </div>
                
                {children}

                {inputs.length > 0 && (
                    <div className="space-y-4">
                        {inputs.map((input, index) => (
                            <div key={input.name}>
                                {input.type === 'textarea' ? (
                                    <textarea
                                        ref={index === 0 ? firstInputRef : null}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        value={formState[input.name]}
                                        onChange={handleInputChange}
                                        className={`w-full p-2 rounded-md bg-gray-700 border text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[input.name] ? 'border-red-500' : 'border-gray-600'} h-32 resize-y`}
                                    />
                                ) : (
                                    <input
                                        ref={index === 0 ? firstInputRef : null}
                                        type="text"
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        value={formState[input.name]}
                                        onChange={handleInputChange}
                                        onKeyDown={handleInputKeyDown}
                                        className={`w-full p-2 rounded-md bg-gray-700 border text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[input.name] ? 'border-red-500' : 'border-gray-600'}`}
                                    />
                                )}
                                {errors[input.name] && <p className="text-red-400 text-sm mt-1">{errors[input.name]}</p>}
                            </div>
                        ))}
                    </div>
                )}
                
                {onConfirm && (
                     <div className="flex justify-end space-x-3 mt-6">
                        <button onClick={onCancel} className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors duration-200 text-gray-100">Cancel</button>
                        <button onClick={inputs.length > 0 ? handleConfirmClick : onConfirm} className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition-colors duration-200 text-white font-semibold">Confirm</button>
                    </div>
                )}
            </div>
        </div>
    );
}

// Loading Modal for AI Generation 
function GeneratingModal({ text }) {
    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-2xl flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-100 text-lg font-semibold">{text}</p>
            </div>
        </div>
    );
}

// Segmented Circular Progress Bar 
function SegmentedCircularProgress({ segments, hoveredSegment, setHoveredSegment }) {
    const size = 150;
    const strokeWidth = 15;
    const center = size / 2;
    const radius = center - strokeWidth / 2;

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    const describeArc = (x, y, radius, startAngle, endAngle) => {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    }

    let accumulatedPercentage = 0;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle stroke="#374151" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={center} cy={center} />
            {segments.map((segment, index) => {
                 const startAngle = (accumulatedPercentage / 100) * 360;
                 const endAngle = ((accumulatedPercentage + segment.score) / 100) * 360;
                 accumulatedPercentage += segment.score;
                 const isHovered = segment.name === hoveredSegment;
                 const opacity = hoveredSegment && !isHovered ? 0.3 : 1;

                return (
                     <path
                        key={index}
                        d={describeArc(center, center, radius, startAngle, endAngle)}
                        fill="none"
                        stroke={segment.color}
                        strokeWidth={isHovered ? strokeWidth + 2 : strokeWidth}
                        style={{ transition: 'all 0.2s ease-in-out', opacity: opacity, pointerEvents: 'none' }}
                        
                    />
                );
            })}
             {(() => {
                let hitAccumulatedOffset = 0;
                return segments.map((segment, index) => {
                    const startAngle = (hitAccumulatedOffset / 100) * 360;
                    const endAngle = ((hitAccumulatedOffset + segment.score) / 100) * 360;
                    hitAccumulatedOffset += segment.score;

                    return (
                        <path
                            key={`hit-${index}`}
                            d={describeArc(center, center, radius, startAngle, endAngle)}
                            fill="transparent"
                            stroke="transparent"
                            strokeWidth={strokeWidth + 4} // Wider hit area
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredSegment(segment.name)}
                            onMouseLeave={() => setHoveredSegment(null)}
                        />
                    );
                });
            })()}
        </svg>
    );
}


// Score Detail Modal 
function ScoreDetailModal({ icpResult, onClose }) {
    const { score, details } = icpResult;
    const [hoveredSegment, setHoveredSegment] = useState(null);

    return (
        <Modal message="ICP Score Breakdown" onCancel={onClose}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-4">
                <div className="relative">
                    <SegmentedCircularProgress 
                        segments={details} 
                        hoveredSegment={hoveredSegment}
                        setHoveredSegment={setHoveredSegment}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <span className="text-4xl font-bold text-white">{score}%</span>
                    </div>
                </div>
                <ul className="space-y-2">
                    {details.map(detail => (
                        <li key={detail.name} 
                            className={`flex items-center gap-3 p-2 rounded-md transition-colors ${hoveredSegment === detail.name ? 'bg-gray-700/50' : ''}`}
                            onMouseEnter={() => setHoveredSegment(detail.name)}
                            onMouseLeave={() => setHoveredSegment(null)}
                        >
                            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: detail.color }}></div>
                            <span className="text-gray-300">{detail.name}:</span>
                            <span className="font-semibold text-white">{detail.score}%</span>
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    );
}

// Loading Spinner Component 
function LoadingSpinner({ text }) {
    return (
        <div className="flex flex-col justify-center items-center h-full text-gray-400">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            {text && <p className="mt-4 text-sm">{text}</p>}
        </div>
    );
}

// Circular Progress Bar Component 
function CircularProgress({ score }) {
    const size = 120;
    const strokeWidth = 10;
    const center = size / 2;
    const radius = center - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const offset = circumference - (score / 100) * circumference;

    let colorClass = 'text-red-500';
    if (score >= 70) {
        colorClass = 'text-green-500';
    } else if (score >= 50) {
        colorClass = 'text-yellow-500';
    }

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="absolute" width={size} height={size}>
                <circle
                    stroke="#374151" // gray-700
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={center}
                    cy={center}
                />
                <circle
                    className={`transition-all duration-1000 ease-out ${colorClass}`}
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    r={radius}
                    cx={center}
                    cy={center}
                    transform={`rotate(-90 ${center} ${center})`}
                />
            </svg>
            <span className={`text-3xl font-bold ${colorClass}`}>{score}%</span>
        </div>
    );
}

// Home Screen Component 
function HomeScreen({ savedChats, onNewChat, onSelectChat, onRenameChat, onDeleteChat, menuOpenIndex, setMenuOpenIndex }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start p-8 overflow-y-auto bg-gray-900">
            <h1 className="text-5xl font-bold mb-12 text-gray-200 mt-10 tracking-wider">AI Social Database</h1>
            <div className="w-full max-w-6xl bg-black/20 p-8 rounded-xl shadow-inner">
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]">
                    {/* New Chat Button */}
                    <button onClick={onNewChat} className="w-full h-32 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-blue-600/20" aria-label="Create new Product/Service">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                    {/* Existing Chats */}
                    {savedChats.map((chat, index) => (
                        <div key={index} className="relative w-full h-32 group">
                            <button onClick={() => onSelectChat(index)} className="w-full h-full bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center p-4 text-center text-gray-200 hover:bg-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-black/20">
                                <span className="text-xl font-semibold break-words line-clamp-3">{chat.name}</span>
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setMenuOpenIndex(menuOpenIndex === index ? null : index); }} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white bg-gray-800/50 rounded-full transition-colors" aria-label="Options">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                            </button>
                            {menuOpenIndex === index && (
                                 <div className="absolute right-0 top-10 z-20 bg-gray-700 border border-gray-600 rounded-md p-2 space-y-1 w-32 shadow-xl">
                                     <button onClick={() => onRenameChat(index)} className="block w-full text-left px-2 py-1 hover:bg-gray-600/70 rounded-sm text-gray-200">Edit</button>
                                     <button onClick={() => onDeleteChat(index)} className="block w-full text-left px-2 py-1 hover:bg-red-600/50 rounded-sm text-red-400">Delete</button>
                                 </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Chat View Component 
function ChatView({ currentChat, activeProfileIndex, onSelectProfile, onNewProfile, onEditProfile, onDeleteProfile, profileMenuOpenIndex, setProfileMenuOpenIndex, isIcpLoading, isPitchLoading, onGenerateIcp, onGeneratePitch, onEditProductService, isIcpSidebarExpanded, onToggleIcpSidebar, activeRightSidebarTab, setActiveRightSidebarTab, activeInferenceLevel, setActiveInferenceLevel, isGeneratingPersona, isPainPointsLoading, onOpenScoreDetail, ...props }) {
    const activeProfile = currentChat?.profiles[activeProfileIndex];

    useEffect(() => {
        if (props.inputRef.current) props.inputRef.current.focus();
    }, [props.inputRef, activeProfileIndex]);

    useEffect(() => {
        if (props.messagesEndRef.current) props.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [activeProfile?.messages, props.messagesEndRef]);

    const handleFileChange = (event) => props.setSelectedFile(event.target.files[0]);
    const handleUploadClick = () => props.fileInputRef.current.click();

    const pitchTypes = ['coldCall', 'email', 'linkedIn', 'directMail'];
    const pitchLabels = { coldCall: 'Cold Call', email: 'Email', linkedIn: 'LinkedIn', directMail: 'Direct Mail'};
    const inferenceLevels = ['conservative', 'balanced', 'bold'];

    return (
        <div className="flex h-screen w-full bg-gray-900 text-white">
            {/* Profiles Sidebar (Left) */}
            <div className="w-80 bg-gray-800 p-4 flex flex-col space-y-4 rounded-l-lg flex-shrink-0">
                <div className="flex space-x-2">
                     <button onClick={props.onGoHome} className="flex-shrink-0 bg-gray-700 p-2 rounded-md hover:bg-gray-600 transition-colors duration-200" aria-label="Go to home screen">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <button onClick={onNewProfile} className="w-full bg-blue-600 p-2 rounded-md hover:bg-blue-500 transition-colors duration-200 font-semibold text-white" disabled={props.loading}>+ New Profile</button>
                </div>
                <div className="flex-1 overflow-y-auto mt-2 pr-1">
                     <div className="px-3 pt-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-gray-300 font-bold tracking-wider truncate" title={currentChat.name}>{currentChat.name}</h3>
                            <button onClick={onEditProductService} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700" title="Edit Product/Service Name & Description">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536l12.232-12.232z" /></svg>
                            </button>
                        </div>
                        <p className="text-gray-500 text-xs mt-1 border-b border-gray-700/50 pb-2">Profiles</p>
                    </div>
                    <div className="space-y-2 mt-2">
                        {currentChat.profiles.map((profile, index) => (
                            <div key={index} className="relative group flex items-center">
                                <button onClick={() => onSelectProfile(index)} className={`flex-1 text-left p-3 rounded-md transition-colors truncate ${activeProfileIndex === index ? 'bg-blue-600 text-white font-semibold' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700' }`}>
                                    {profile.profileName}
                                </button>
                                 <button onClick={() => setProfileMenuOpenIndex(profileMenuOpenIndex === index ? null : index)} className="ml-2 text-gray-400 hover:text-white p-1" aria-label="Profile options"> ⋮ </button>
                                 {profileMenuOpenIndex === index && (
                                    <div className="absolute right-0 top-10 z-20 bg-gray-700 border border-gray-600 rounded-md p-2 space-y-1 w-32 shadow-xl">
                                        <button onClick={() => onEditProfile(index)} className="block w-full text-left px-2 py-1 hover:bg-gray-600/70 rounded-sm text-gray-200">Edit</button>
                                        <button onClick={() => onDeleteProfile(index)} className="block w-full text-left px-2 py-1 hover:bg-red-600/50 rounded-sm text-red-400">Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat */}
            <div className={`flex flex-col shadow-inner h-full transition-all duration-300 ease-in-out overflow-hidden ${isIcpSidebarExpanded ? 'w-0' : 'flex-1'}`}>
                <div className="flex-1 overflow-y-auto space-y-4 p-6">
                     {!activeProfile && !props.loading && (
                        <div className="text-gray-500 text-center flex flex-col items-center justify-center h-full">
                           <p className="text-xl">Create or select a profile to begin.</p>
                        </div>
                    )}
                    {activeProfile?.messages.map((msg, index) => (
                        <div key={index} className={`px-4 py-2 rounded-xl shadow-md text-lg max-w-2xl break-words whitespace-pre-wrap w-fit ${msg.role === 'user' ? 'bg-blue-600 text-white self-end ml-auto' : 'bg-gray-700 text-gray-200 self-start mr-auto'}`}>
                             {msg.content && <span>{msg.content}</span>}
                            {msg.image && <img src={msg.image} alt="user upload" className={`block rounded-lg max-w-xs ${msg.content ? 'mt-2' : ''}`} />}
                        </div>
                    ))}
                    {props.loading && <div className="bg-gray-700 self-start mr-auto p-4 rounded-xl shadow-md text-lg text-gray-400"><div className="flex items-center space-x-2"><div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div><div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div><div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div></div></div>}
                    <div ref={props.messagesEndRef} />
                </div>
                {/* Input Area */}
                {activeProfile && <div className="border-t border-gray-700/50 p-4 bg-gray-900">
                    {props.selectedFile && (<div className="text-sm text-gray-400 mb-2 bg-gray-700 p-2 rounded-md">Attached: {props.selectedFile.name}<button onClick={() => props.setSelectedFile(null)} className="ml-2 text-red-400 hover:text-red-500 font-bold">&times;</button></div>)}
                    <div className="flex space-x-3 items-center">
                        <input type="file" ref={props.fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                        <button onClick={handleUploadClick} className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors" disabled={props.loading} title="Attach File"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg></button>
                        <input ref={props.inputRef} value={props.input} onChange={(e) => props.setInput(e.target.value)} onKeyDown={(e) => !e.shiftKey && e.key === 'Enter' && (e.preventDefault(), props.handleSend())} placeholder="Message persona..." className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={props.loading}/>
                        <button onClick={props.handleSend} className="px-5 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed text-white" disabled={props.loading || (!props.input.trim() && !props.selectedFile)} aria-label="Send message"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></button>
                    </div>
                </div>}
            </div>
            
            {/* Right Sidebar */}
            <div className={`bg-gray-800 p-4 flex flex-col space-y-4 rounded-r-lg border-l border-gray-700/50 transition-all duration-300 ease-in-out flex-shrink-0 ${isIcpSidebarExpanded ? 'flex-1' : 'w-80'}`}>
                 <div className="flex items-center justify-between">
                    <button onClick={onToggleIcpSidebar} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700" title={isIcpSidebarExpanded ? "Collapse" : "Expand"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${isIcpSidebarExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="w-8"></div> {/* Spacer */}
                </div>
                 <div className="grid grid-cols-2 gap-1 bg-gray-700 p-1 rounded-md">
                    <button onClick={() => setActiveRightSidebarTab('icp')} className={`py-1 text-sm font-semibold rounded-md transition-colors ${activeRightSidebarTab === 'icp' ? 'bg-blue-600 text-white' : 'hover:bg-gray-600 text-gray-300'}`}>ICP</button>
                    <button onClick={() => setActiveRightSidebarTab('inferences')} className={`py-1 text-sm font-semibold rounded-md transition-colors ${activeRightSidebarTab === 'inferences' ? 'bg-blue-600 text-white' : 'hover:bg-gray-600 text-gray-300'}`}>Inferences</button>
                    <button onClick={() => setActiveRightSidebarTab('painPoints')} className={`py-1 text-sm font-semibold rounded-md transition-colors ${activeRightSidebarTab === 'painPoints' ? 'bg-blue-600 text-white' : 'hover:bg-gray-600 text-gray-300'}`}>Pain Points</button>
                    <button onClick={() => setActiveRightSidebarTab('pitches')} className={`py-1 text-sm font-semibold rounded-md transition-colors ${activeRightSidebarTab === 'pitches' ? 'bg-blue-600 text-white' : 'hover:bg-gray-600 text-gray-300'}`}>Pitches</button>
                </div>
                {activeRightSidebarTab === 'icp' && (
                     <div className="flex-1 overflow-y-auto space-y-4 p-2 bg-gray-900/50 rounded-md text-sm">
                        <button onClick={onGenerateIcp} disabled={isIcpLoading || !activeProfile} className="w-full bg-blue-600 p-2 rounded-md hover:bg-blue-500 transition-colors duration-200 font-semibold text-white disabled:bg-gray-600 disabled:cursor-not-allowed">
                            {isIcpLoading ? 'Generating...' : 'Generate ICP Score'}
                        </button>
                        {isIcpLoading ? <LoadingSpinner text="Generating score..."/> : activeProfile?.icpResult ? <div className="space-y-4"><div><p className="text-gray-400 font-bold uppercase tracking-wider text-center">ICP Match Score</p><button onClick={onOpenScoreDetail} className="flex justify-center my-4 mx-auto hover:opacity-80 transition-opacity focus:outline-none rounded-full"><CircularProgress score={activeProfile.icpResult.score} /></button><p className="text-gray-400 font-bold uppercase tracking-wider mt-6">Explanation</p><p className="text-gray-300 mt-2 whitespace-pre-wrap">{activeProfile.icpResult.explanation}</p></div></div> : <div className="text-center text-gray-500 pt-10"><p>Generate a score to analyze the current profile against the ideal customer for "{currentChat.name}".</p></div>}
                    </div>
                )}
                {activeRightSidebarTab === 'inferences' && (
                     <div className="flex-1 overflow-y-auto space-y-4 p-2 bg-gray-900/50 rounded-md text-sm">
                        {isGeneratingPersona ? <LoadingSpinner text="Generating insights..."/> : activeProfile?.inferences ? (
                            <div>
                                <div className="flex space-x-1 bg-gray-700 p-1 rounded-md mb-4">
                                    {inferenceLevels.map(level => (
                                         <button key={level} onClick={() => setActiveInferenceLevel(level)} className={`w-full px-2 py-1 text-xs font-semibold rounded-md transition-colors capitalize ${activeInferenceLevel === level ? 'bg-blue-600 text-white' : 'hover:bg-gray-600 text-gray-300'}`}>
                                            {level}
                                         </button>
                                    ))}
                                </div>
                                <p className="text-gray-300 whitespace-pre-wrap">{activeProfile.inferences[activeInferenceLevel]}</p>
                            </div>
                        ) : (
                             <div className="text-center text-gray-500 pt-10"><p>No inferences generated for this profile. Create or edit the profile to generate them.</p></div>
                        )}
                     </div>
                )}
                 {activeRightSidebarTab === 'painPoints' && (
                     <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-gray-900/50 rounded-md text-sm">
                         {isGeneratingPersona ? <LoadingSpinner text="Generating insights..." /> : activeProfile?.painPoints?.length > 0 ? (
                            <ul className="space-y-2 list-disc list-inside text-gray-300">
                                {activeProfile.painPoints.map((point, index) => <li key={index}>{point}</li>)}
                            </ul>
                         ) : (
                             <div className="text-center text-gray-500 pt-10"><p>No pain points generated for this profile. Create or edit the profile to generate them.</p></div>
                         )}
                    </div>
                )}
                {activeRightSidebarTab === 'pitches' && (
                    <div className="flex-1 overflow-y-auto space-y-4 p-2 bg-gray-900/50 rounded-md text-sm">
                         <button onClick={onGeneratePitch} disabled={isPitchLoading || !activeProfile?.icpResult} className="w-full bg-green-600 p-2 rounded-md hover:bg-green-500 transition-colors duration-200 font-semibold text-white disabled:bg-gray-600 disabled:cursor-not-allowed">{isPitchLoading ? 'Generating...' : 'Generate Pitches'}</button>
                         {isPitchLoading ? <LoadingSpinner text="Generating pitches..." /> : activeProfile?.pitchScript ? (
                            <div className="mt-4">
                                <div className="flex space-x-1 bg-gray-700 p-1 rounded-md mb-2">
                                    {pitchTypes.map(type => <button key={type} onClick={() => props.setActivePitch(type)} className={`w-full px-2 py-1 text-xs font-semibold rounded-md transition-colors ${props.activePitch === type ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-300 hover:bg-gray-600'}`}>{pitchLabels[type]}</button>)}
                                </div>
                                <div className="mt-2 p-3 bg-gray-900 rounded-md text-gray-300 whitespace-pre-wrap">{activeProfile.pitchScript[props.activePitch]}</div>
                            </div>
                         ) : (
                              <div className="text-center text-gray-500 pt-10"><p>Generate an ICP score first to enable pitch generation.</p></div>
                         )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Main App Component (Controller) 
function App() {
    const [currentView, setCurrentView] = useState('home');
    const [input, setInput] = useState('');
    const [savedChats, setSavedChats] = useState([]);
    const [currentChatIndex, setCurrentChatIndex] = useState(null);
    const [activeProfileIndex, setActiveProfileIndex] = useState(null);
    const [menuOpenIndex, setMenuOpenIndex] = useState(null);
    const [profileMenuOpenIndex, setProfileMenuOpenIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isIcpLoading, setIsIcpLoading] = useState(false);
    const [isPitchLoading, setIsPitchLoading] = useState(false);
    const [isGeneratingPersona, setIsGeneratingPersona] = useState(false);
    const [isPainPointsLoading, setIsPainPointsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [modal, setModal] = useState({ isOpen: false });
    const [isIcpSidebarExpanded, setIsIcpSidebarExpanded] = useState(false);
    const [isScoreDetailModalOpen, setIsScoreDetailModalOpen] = useState(false);
    const [activePitch, setActivePitch] = useState('coldCall');
    const [activeRightSidebarTab, setActiveRightSidebarTab] = useState('icp');
    const [activeInferenceLevel, setActiveInferenceLevel] = useState('balanced');


    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    
    const currentChat = savedChats[currentChatIndex] ?? null;
    const messages = currentChat?.profiles[activeProfileIndex]?.messages ?? [];

    const handleGoHome = () => {
        setCurrentView('home');
        setCurrentChatIndex(null);
        setActiveProfileIndex(null);
        setMenuOpenIndex(null);
        setProfileMenuOpenIndex(null);
    };

    const handleSelectChat = (index) => {
        if (savedChats[index]) {
            setCurrentChatIndex(index);
            setActiveProfileIndex(savedChats[index].profiles.length > 0 ? 0 : null);
            setCurrentView('chat');
            setInput('');
            setSelectedFile(null);
            setMenuOpenIndex(null);
        }
    };
    
    const handleSelectProfile = (index) => {
        setActiveProfileIndex(index);
        setProfileMenuOpenIndex(null);
    }

    const handleCreateNamedChat = (name, description) => {
        const newChat = { name, description, profiles: [] };
        const updatedChats = [newChat, ...savedChats];
        setSavedChats(updatedChats);
        setCurrentChatIndex(0);
        setActiveProfileIndex(null);
        setCurrentView('chat');
    };
    
    const handlePromptNewChat = () => {
        setModal({ 
            isOpen: true, 
            message: "Enter a new Product/Service:", 
            inputs: [
                { name: 'chatName', placeholder: 'Product/Service Name', required: true, errorText: 'Please enter a valid name.' },
                { name: 'description', placeholder: 'Product/Service Description', required: true, errorText: 'Please enter a valid description.', type: 'textarea' }
            ], 
            onConfirm: ({ chatName, description }) => { 
                handleCreateNamedChat(chatName.trim(), description.trim()); 
                setModal({ isOpen: false }); 
            }, 
            onCancel: () => setModal({ isOpen: false }) 
        });
    };
    
    const handleGenerateInferences = async (profileName, location, additionalInfo) => {
        // MOCK DATA 
        return new Promise(resolve => {
            setTimeout(() => {
                const mockInferences = {
                    conservative: `Based on the location '${location}', it's likely that ${profileName} is exposed to local marketing and regional trends. This suggests a potential interest in community-focused events and services.`,
                    balanced: `Considering the name and location, ${profileName} might be a young professional working in the tech or creative industries, valuing both innovation and work-life balance. They likely follow key industry influencers online.`,
                    bold: `${profileName} from '${location}' could be an early adopter of niche, sustainable products. They might be an influential voice in a small online community dedicated to eco-friendly living, looking for brands that align with their values.`
                };
                if(additionalInfo) {
                    mockInferences.balanced += ` Their interest in '${additionalInfo}' suggests they are likely to respond to data-driven content.`;
                }
                resolve(mockInferences);
            }, 1500);
        });
    };
    
    const handleGeneratePainPoints = async (profileName, location, additionalInfo) => {
        // MOCK DATA 
        return new Promise(resolve => {
            setTimeout(() => {
                const mockPainPoints = [
                    "Difficulty scaling marketing efforts efficiently.",
                    "Low return on investment from current advertising spend.",
                    "Lack of deep understanding of their customer base.",
                    "Struggling to create personalized outreach at scale.",
                    "Time-consuming manual processes for lead qualification."
                ];
                resolve(mockPainPoints);
            }, 1200);
        });
    };

    const handlePromptNewProfile = () => {
        setModal({ 
            isOpen: true, 
            message: "Create a new chatbot persona:", 
            inputs: [ 
                { name: 'profileName', placeholder: 'Persona Name (e.g., Ada)', required: true, errorText: 'Please enter a valid name.' }, 
                { name: 'location', placeholder: 'Location (e.g., Paris)', required: true, errorText: 'Please enter a valid location.' },
                { name: 'additionalInfo', placeholder: 'Additional Information (e.g., job title, interests)', type: 'textarea' }
            ], 
            onConfirm: ({ profileName, location, additionalInfo }) => { 
                const trimmedName = profileName.trim();
                const trimmedLocation = location.trim();
                const newProfile = { profileName: trimmedName, location: trimmedLocation, additionalInfo: additionalInfo.trim(), messages: [], icpResult: null, pitchScript: null, inferences: null, painPoints: null }; 
                
                let newProfileIndex;
                setSavedChats(prevChats => {
                    const updatedChats = JSON.parse(JSON.stringify(prevChats));
                    const chatToUpdate = updatedChats[currentChatIndex];
                    chatToUpdate.profiles.push(newProfile);
                    newProfileIndex = chatToUpdate.profiles.length - 1;
                    return updatedChats;
                });
                setActiveProfileIndex(newProfileIndex);
                setModal({ isOpen: false }); 

                const fetchPersonaData = async () => {
                    setIsGeneratingPersona(true);
                    const [inferences, painPoints] = await Promise.all([
                        handleGenerateInferences(trimmedName, trimmedLocation, additionalInfo.trim()),
                        handleGeneratePainPoints(trimmedName, trimmedLocation, additionalInfo.trim())
                    ]);
                    setSavedChats(prevChats => {
                        const finalChats = JSON.parse(JSON.stringify(prevChats));
                        const profileToUpdate = finalChats[currentChatIndex]?.profiles[newProfileIndex];
                        if (profileToUpdate) {
                            profileToUpdate.inferences = inferences;
                            profileToUpdate.painPoints = painPoints;
                        }
                        return finalChats;
                    });
                    setIsGeneratingPersona(false);
                };
                fetchPersonaData();
            }, 
            onCancel: () => setModal({ isOpen: false }) 
        });
    };

    const handleRenameChat = (index) => {
        setMenuOpenIndex(null);
        setModal({ 
            isOpen: true, 
            message: `Edit Product/Service:`, 
            inputs: [
                { name: 'chatName', initialValue: savedChats[index].name, required: true, errorText: 'Please enter a valid name.' },
                { name: 'description', initialValue: savedChats[index].description || '', placeholder: 'Product/Service Description', required: true, errorText: 'Please enter a valid description.', type: 'textarea' }
            ], 
            onConfirm: ({ chatName, description }) => { 
                const updatedChats = [...savedChats]; 
                updatedChats[index].name = chatName.trim(); 
                updatedChats[index].description = description.trim();
                setSavedChats(updatedChats); 
                setModal({ isOpen: false }); 
            }, 
            onCancel: () => setModal({ isOpen: false }) 
        });
    };

    const handlePromptEditCurrentProductService = () => {
        if (currentChatIndex === null) return;
        handleRenameChat(currentChatIndex);
    };

    const handleDeleteChat = (index) => {
        setMenuOpenIndex(null);
        setModal({ isOpen: true, message: 'Are you sure you want to delete this Product/Service?', onConfirm: () => { setSavedChats(savedChats.filter((_, i) => i !== index)); setModal({ isOpen: false }); }, onCancel: () => setModal({ isOpen: false }) });
    };
    
    const handleDeleteProfile = (profileIndexToDelete) => {
        setProfileMenuOpenIndex(null);
        const profileName = savedChats[currentChatIndex].profiles[profileIndexToDelete].profileName;
        setModal({
            isOpen: true,
            message: `Are you sure you want to delete the profile "${profileName}"?`,
            onConfirm: () => {
                const updatedChats = [...savedChats];
                const chatToUpdate = updatedChats[currentChatIndex];
                const updatedProfiles = chatToUpdate.profiles.filter((_, index) => index !== profileIndexToDelete);
                chatToUpdate.profiles = updatedProfiles;

                let newActiveProfileIndex = activeProfileIndex;
                if (profileIndexToDelete === activeProfileIndex) {
                    newActiveProfileIndex = updatedProfiles.length > 0 ? 0 : null;
                } else if (profileIndexToDelete < activeProfileIndex) {
                    newActiveProfileIndex = activeProfileIndex - 1;
                }
                
                setSavedChats(updatedChats);
                setActiveProfileIndex(newActiveProfileIndex);
                setModal({ isOpen: false });
            },
            onCancel: () => setModal({ isOpen: false }),
        });
    };
    
    const handlePromptEditProfile = (profileIndex) => {
        const profileToEdit = savedChats[currentChatIndex].profiles[profileIndex];
        if (!profileToEdit) return;
    
        setProfileMenuOpenIndex(null); // Close the menu
        setModal({
            isOpen: true,
            message: `Edit profile:`,
            inputs: [
                { name: 'profileName', initialValue: profileToEdit.profileName, placeholder: 'Persona Name', required: true, errorText: 'Please enter a valid name.' },
                { name: 'location', initialValue: profileToEdit.location, placeholder: 'Location', required: true, errorText: 'Please enter a valid location.' },
                { name: 'additionalInfo', initialValue: profileToEdit.additionalInfo || '', placeholder: 'Additional Information (e.g., job title, interests)', type: 'textarea' }
            ],
            onConfirm: ({ profileName, location, additionalInfo }) => {
                const trimmedName = profileName.trim();
                const trimmedLocation = location.trim();
                const trimmedInfo = additionalInfo.trim();

                setSavedChats(prevChats => {
                     const updatedChats = JSON.parse(JSON.stringify(prevChats));
                     const profile = updatedChats[currentChatIndex].profiles[profileIndex];
                     profile.profileName = trimmedName;
                     profile.location = trimmedLocation;
                     profile.additionalInfo = trimmedInfo;
                     profile.inferences = null; // Reset to trigger loading
                     profile.icpResult = null;
                     profile.pitchScript = null;
                     profile.painPoints = null;
                     return updatedChats;
                });
                setModal({ isOpen: false });
                
                const fetchPersonaData = async () => {
                    setIsGeneratingPersona(true);
                     const [inferences, painPoints] = await Promise.all([
                        handleGenerateInferences(trimmedName, trimmedLocation, trimmedInfo),
                        handleGeneratePainPoints(trimmedName, trimmedLocation, trimmedInfo)
                    ]);
                    setSavedChats(prevChats => {
                        const finalChats = JSON.parse(JSON.stringify(prevChats));
                        const profileToUpdate = finalChats[currentChatIndex]?.profiles[profileIndex];
                        if (profileToUpdate) {
                            profileToUpdate.inferences = inferences;
                            profileToUpdate.painPoints = painPoints;
                        }
                        return finalChats;
                    });
                    setIsGeneratingPersona(false);
                };
                fetchPersonaData();
            },
            onCancel: () => setModal({ isOpen: false }),
        });
    };

    const autosaveChat = (updatedMessages) => {
        if (currentChatIndex !== null && activeProfileIndex !== null) {
            const newSavedChats = [...savedChats];
            if (newSavedChats[currentChatIndex]?.profiles[activeProfileIndex]) {
                 newSavedChats[currentChatIndex].profiles[activeProfileIndex].messages = updatedMessages;
                 setSavedChats(newSavedChats);
            }
        }
    };
    
    const handleGenerateIcp = async () => {
        if (!currentChat || activeProfileIndex === null) return;
        
        setIsIcpLoading(true);
        
        // MOCK DATA 
        setTimeout(() => {
            const mockResult = {
                score: 75,
                explanation: "This persona aligns well with the target demographic, showing strong interest in technology and residing in a key metropolitan area. While their location indicates a high potential for engagement, their specific professional background is not a perfect match, leading to a strong but not perfect score.",
                details: [
                    { name: 'Industry Fit', score: 25, color: '#3b82f6' }, // blue
                    { name: 'Pain Point Match', score: 20, color: '#10b981' }, // green
                    { name: 'Organization Size', score: 10, color: '#f59e0b' }, // amber
                    { name: 'Tech Stack Fit', score: 0, color: '#ef4444' }, // red
                    { name: 'Geographic Fit', score: 10, color: '#8b5cf6' }, // violet
                    { name: 'Buying Triggers', score: 10, color: '#ec4899' } // pink
                ]
            };
            
            const updatedChats = [...savedChats];
            updatedChats[currentChatIndex].profiles[activeProfileIndex].icpResult = mockResult;
            updatedChats[currentChatIndex].profiles[activeProfileIndex].pitchScript = null; // Reset pitch
            setSavedChats(updatedChats);
            setActivePitch('coldCall'); // Default to cold call view
            setIsIcpLoading(false);
        }, 1500); // Simulate network delay
    };

    const handleGeneratePitch = async () => {
        if (!currentChat || activeProfileIndex === null || !currentChat.profiles[activeProfileIndex].icpResult) return;

        setIsPitchLoading(true);
        const activeProfile = currentChat.profiles[activeProfileIndex];

        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const pitchPrompt = `The Ideal Customer Profile for a company selling '${currentChat.name}' (described as: ${currentChat.description}) has been analyzed. A specific persona, ${activeProfile.profileName} from ${activeProfile.location}, received an ICP match score of ${activeProfile.icpResult.score}/100 with the explanation: "${activeProfile.icpResult.explanation}".

Based on all this information, generate a set of compelling, concise, and personalized pitches to offer '${currentChat.name}' to ${activeProfile.profileName}. Provide a script for each of the following channels: a cold call, a cold email, a LinkedIn message, and a direct mail letter. The email and LinkedIn message should include a subject line. Format the output as a JSON object with keys "coldCall", "email", "linkedIn", and "directMail".`;
            
            const pitchPayload = { 
                contents: [{ role: 'user', parts: [{ text: pitchPrompt }] }],
                generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { coldCall: { type: "STRING" }, email: { type: "STRING" }, linkedIn: { type: "STRING" }, directMail: {type: "STRING"} } } }
            };
            const pitchResponse = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pitchPayload) });

            if (!pitchResponse.ok) throw new Error(`API Error (Pitch): ${pitchResponse.status}`);
            const pitchResultData = await pitchResponse.json();
            const pitchText = pitchResultData.candidates?.[0]?.content.parts[0]?.text;
            if (!pitchText) throw new Error("Failed to generate pitch script.");

            const pitchResult = JSON.parse(pitchText);

            const updatedChats = [...savedChats];
            updatedChats[currentChatIndex].profiles[activeProfileIndex].pitchScript = pitchResult;
            setSavedChats(updatedChats);

        } catch (error) {
            console.error("Error generating pitch script:", error);
        } finally {
            setIsPitchLoading(false);
        }
    };

    const handleSend = async () => {
        if ((!input.trim() && !selectedFile) || activeProfileIndex === null) return;
        
        const reader = new FileReader();

        const processAndSend = async (base64ImageData = null) => {
            const activeProfile = savedChats[currentChatIndex].profiles[activeProfileIndex];
            const systemPrompt = `You are a helpful assistant. Please maintain this persona: Your name is ${activeProfile.profileName} and you are from ${activeProfile.location}.`;
            
            let userMessage = { role: 'user', content: input };
            if (base64ImageData) userMessage.image = `data:${selectedFile.type};base64,${base64ImageData}`;

            const newUserMessages = [...messages, userMessage];
            autosaveChat(newUserMessages);
            setLoading(true);
            setInput('');
            setSelectedFile(null);

            try {
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                
                const history = messages.map(msg => ({ role: msg.role, parts: [{ text: msg.content }] }));
                const userParts = [];
                if (input) userParts.push({ text: input });
                if (base64ImageData) userParts.push({ inlineData: { mimeType: selectedFile.type, data: base64ImageData }});
                
                const payload = { contents: [...history, { role: 'user', parts: userParts }], systemInstruction: { parts: [{ text: systemPrompt }] } };
                
                const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                if (!response.ok) throw new Error(`API Error: ${response.status}. ${await response.text()}`);
                const result = await response.json();

                if (result.candidates?.[0]?.content.parts[0]?.text) {
                    const botReply = { role: 'model', content: result.candidates[0].content.parts[0].text };
                    autosaveChat([...newUserMessages, botReply]);
                } else {
                    throw new Error("Received an empty or invalid response from the API.");
                }
            } catch (error)
 {
                const errorMessage = { role: 'model', content: `Error: ${error.message}` };
                autosaveChat([...newUserMessages.slice(0,-1), userMessage, errorMessage]);
            } finally {
                setLoading(false);
            }
        };

        if (selectedFile) {
            reader.onloadend = () => processAndSend(reader.result.split(',')[1]);
            reader.onerror = () => setLoading(false);
            reader.readAsDataURL(selectedFile);
        } else {
            processAndSend();
        }
    };
    
    return (
        <div className="h-screen bg-gray-900 text-white font-sans">
            <style>{`
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #1f2937; /* bg-gray-800 */
                }
                ::-webkit-scrollbar-thumb {
                    background-color: #4b5563; /* bg-gray-600 */
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background-color: #6b7280; /* bg-gray-500 */
                }
            `}</style>
            {modal.isOpen && <Modal {...modal} />}
            {isGeneratingPersona && <GeneratingModal text="Generating AI Persona..." />}
            {isScoreDetailModalOpen && currentChat.profiles[activeProfileIndex]?.icpResult && (
                 <ScoreDetailModal 
                    icpResult={currentChat.profiles[activeProfileIndex].icpResult}
                    onClose={() => setIsScoreDetailModalOpen(false)}
                 />
            )}
            {currentView === 'home' ? (
                <HomeScreen savedChats={savedChats} onNewChat={handlePromptNewChat} onSelectChat={handleSelectChat} onRenameChat={handleRenameChat} onDeleteChat={handleDeleteChat} menuOpenIndex={menuOpenIndex} setMenuOpenIndex={setMenuOpenIndex} />
            ) : (
                currentChat && <ChatView 
                    currentChat={currentChat}
                    activeProfileIndex={activeProfileIndex}
                    onSelectProfile={handleSelectProfile}
                    onNewProfile={handlePromptNewProfile}
                    onEditProfile={handlePromptEditProfile}
                    onDeleteProfile={handleDeleteProfile}
                    onEditProductService={handlePromptEditCurrentProductService}
                    profileMenuOpenIndex={profileMenuOpenIndex}
                    setProfileMenuOpenIndex={setProfileMenuOpenIndex}
                    input={input} setInput={setInput}
                    loading={loading} setLoading={setLoading}
                    isIcpLoading={isIcpLoading}
                    isPitchLoading={isPitchLoading}
                    isGeneratingPersona={isGeneratingPersona}
                    isPainPointsLoading={isPainPointsLoading}
                    onGenerateIcp={handleGenerateIcp}
                    onGeneratePitch={handleGeneratePitch}
                    selectedFile={selectedFile} setSelectedFile={setSelectedFile}
                    isIcpSidebarExpanded={isIcpSidebarExpanded}
                    onToggleIcpSidebar={() => setIsIcpSidebarExpanded(!isIcpSidebarExpanded)}
                    onOpenScoreDetail={() => setIsScoreDetailModalOpen(true)}
                    activeRightSidebarTab={activeRightSidebarTab}
                    setActiveRightSidebarTab={setActiveRightSidebarTab}
                    activeInferenceLevel={activeInferenceLevel}
                    setActiveInferenceLevel={setActiveInferenceLevel}
                    activePitch={activePitch}
                    setActivePitch={setActivePitch}
                    inputRef={inputRef} messagesEndRef={messagesEndRef} fileInputRef={fileInputRef}
                    handleSend={handleSend} onGoHome={handleGoHome}
                />
            )}
        </div>
    );
}

export default App;
