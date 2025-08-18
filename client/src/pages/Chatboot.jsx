import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import firebaseConfig from '../utils/_firbase_config.js'; // <--- Import your firebaseConfig from the new file

// Main App component for the Jansunwai AI Chatbot
const Chatboot = () => { // Component name changed to Chatboot
    // State to store the chat messages
    const [messages, setMessages] = useState([]);
    // State to store the current user input
    const [input, setInput] = useState('');
    // State to manage loading status during API calls
    const [isLoading, setIsLoading] = useState(false);
    // Ref to automatically scroll to the latest message
    const messagesEndRef = useRef(null);

    // Firebase states
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false); // To ensure Firestore operations wait for auth

    // User location state (no longer directly used for map, but kept for potential future use or logging)
    const [userLocation, setUserLocation] = useState(null);
    const [locationStatus, setLocationStatus] = useState('Location ready to update.'); // Location status message

    // Initial system message to guide the AI's persona, updated based on the PDF
    const systemPrompt = `Welcome to **Indore Samadhan**! I'm your AI assistant, here to help you navigate our revolutionary Public Grievance Redressal System for Indore. Our main goal is to make it easy for you to report public service issues and ensure they get resolved efficiently. Here's how Indore Samadhan works to address your concerns: **Simple Complaint Filing & Smart Routing:** You don't need to use complex jargon. Just describe your issue in plain language. Our advanced AI understands your complaint and automatically routes it with **AI-Powered Precision** to the exact department or municipal body responsible for addressing it, ensuring your issue reaches the right desk immediately. **Automated Accountability & Timely Resolution:** Every complaint filed through Indore Samadhan has a clear deadline. If it's not resolved within the specified timeframe, our system automatically escalates it to a higher authority, ensuring **Automated Accountability** and preventing delays. **Real-time Tracking & Hyper-Local Action:** We use **Hyper-Local Tasking** powered by GPS and AI to dispatch the nearest available team to address your issue on the ground, ensuring faster action. You'll receive real-time updates—Lodged, In Progress, Resolved—via the app, SMS, or WhatsApp, keeping you fully informed every step of the way. **Frictionless Citizen Experience:** Our multi-channel approach and proactive updates are designed to make civic engagement simple, transparent, and trusted. I'm here to answer your questions about how to file a complaint, check its status, or understand any aspect of the Indore Samadhan process. Feel free to ask anything!

    **IMPORTANT FORMATTING INSTRUCTION:** Please provide your responses in a continuous flow, presenting points one by one within the same paragraph, without using line breaks or bullet points. For example: "First point. Second point. Third point."`;

    // Effect for Firebase Initialization and Authentication
    useEffect(() => {
        try {
            // Ensure firebaseConfig has necessary properties for local environment
            if (!firebaseConfig.projectId || !firebaseConfig.apiKey || !firebaseConfig.authDomain) {
                console.error("Firebase configuration error: 'projectId', 'apiKey', or 'authDomain' is missing in your firebaseConfig.js file. Please ensure all required fields are present.");
                setLocationStatus("Firebase initialization error: Missing config.");
                return; // Stop initialization if config is incomplete
            }

            const app = initializeApp(firebaseConfig); // Use the imported firebaseConfig
            const firestore = getFirestore(app);
            const authentication = getAuth(app);

            setDb(firestore);
            setAuth(authentication);

            // Listen for authentication state changes
            const unsubscribe = onAuthStateChanged(authentication, async (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    // Sign in anonymously if no user is logged in (for local env, __initial_auth_token is usually undefined)
                    // We'll always try anonymous sign-in in a local setup if no user is found.
                    // The __initial_auth_token is specific to the Canvas environment.
                    // if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    //     await signInWithCustomToken(authentication, __initial_auth_token);
                    // } else {
                        await signInAnonymously(authentication);
                    // }
                }
                setIsAuthReady(true); // Authentication process is ready
            });

            return () => unsubscribe(); // Cleanup auth listener
        } catch (error) {
            console.error("Firebase initialization failed:", error);
            setLocationStatus("Firebase initialization error.");
        }
    }, []);

    // Effect to get user location and save to Firestore once authenticated
    useEffect(() => {
        if (isAuthReady && db && userId) {
            getLocation(); // Attempt to get location on auth ready
            // Set up a real-time listener for the user's location in Firestore
            // For local environment, __app_id might be undefined, using a fallback 'default-app-id'
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const userLocationDocRef = doc(db, `artifacts/${appId}/users/${userId}/locations/currentLocation`);

            const unsubscribe = onSnapshot(userLocationDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    setUserLocation(docSnap.data());
                    setLocationStatus("Location updated.");
                } else {
                    console.log("No location data found for user.");
                    setLocationStatus("No location data found.");
                }
            }, (error) => {
                console.error("Error listening to location updates:", error);
                setLocationStatus("Error listening to location updates.");
            });

            return () => unsubscribe(); // Cleanup listener
        }
    }, [isAuthReady, db, userId]);

    // Effect to scroll to the bottom of the chat whenever messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Function to get user's current geolocation
    const getLocation = () => {
        if (!navigator.geolocation) {
            setLocationStatus('Geolocation is not supported by your browser.');
            return;
        }

        setLocationStatus('Getting location...');
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const newLocation = { lat: latitude, lng: longitude, timestamp: new Date().toISOString() };
                setUserLocation(newLocation);
                setLocationStatus(`Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);

                // Save location to Firestore
                if (db && userId) {
                    // For local environment, __app_id might be undefined, using a fallback 'default-app-id'
                    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
                    const userLocationDocRef = doc(db, `artifacts/${appId}/users/${userId}/locations/currentLocation`);
                    try {
                        await setDoc(userLocationDocRef, newLocation, { merge: true });
                        console.log("Location saved to Firestore.");
                        // Simulate sending notification to government person
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            {
                                role: 'model',
                                text: `Your location (${latitude.toFixed(4)}, ${longitude.toFixed(4)}) has been successfully updated. The relevant government personnel have been notified for issues in this area.`
                            }
                        ]);
                    } catch (error) {
                        console.error("Error saving location to Firestore:", error);
                        setLocationStatus("Error saving location.");
                    }
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocationStatus('Location permission denied. Please allow location access.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setLocationStatus('Location information is unavailable.');
                        break;
                    case error.TIMEOUT:
                        setLocationStatus('The request to get user location timed out.');
                        break;
                    default:
                        setLocationStatus('An unknown error occurred while getting location.');
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    // Function to send a message to the AI
    const sendMessage = async () => {
        if (input.trim() === '') return; // Prevent sending empty messages

        const userMessage = { role: 'user', text: input.trim() };
        setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to chat history
        setInput(''); // Clear the input field
        setIsLoading(true); // Set loading state to true

        try {
            // Prepare chat history for the API call, including the system prompt
            const chatHistory = [
                { role: "user", parts: [{ text: systemPrompt }] }, // System prompt as initial user message
                ...messages.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] })), // Previous messages
                { role: userMessage.role, parts: [{ text: userMessage.text }] } // Current user message
            ];

            // Payload for the Gemini API
            const payload = { contents: chatHistory };
            // IMPORTANT: For local environment, replace "" with your actual Gemini API key.
            // Get your API key from Google AI Studio: https://aistudio.google.com/
            const apiKey = "AIzaSyDnPtQW-s3maWsGAVWbLm4exJmFvG1gHCY"; // <--- INSERT YOUR ACTUAL GEMINI API KEY HERE FOR LOCAL DEVELOPMENT
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            // Make the API call to Gemini
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            // Process the AI's response
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const aiText = result.candidates[0].content.parts[0].text;
                setMessages((prevMessages) => [...prevMessages, { role: 'model', text: aiText }]); // Add AI response
            } else {
                // Handle cases where the AI response is unexpected
                setMessages((prevMessages) => [...prevMessages, { role: 'model', text: "I apologize, I couldn't get a response. Please try again." }]);
                console.error("Unexpected API response structure:", result);
            }
        } catch (error) {
            // Handle API call errors
            setMessages((prevMessages) => [...prevMessages, { role: 'model', text: "An error occurred while connecting to the AI. Please check your network and try again." }]);
            console.error("Error calling Gemini API:", error);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    // JSX for the chat interface
    return (
        <div className="flex flex-col h-screen bg-gray-100 font-sans antialiased">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg rounded-b-xl">
                <h1 className="text-3xl font-extrabold text-center tracking-wide">Indore Samadhan AI Chatbot</h1>
                <p className="text-center text-sm mt-2 opacity-90">Your intelligent assistant for public grievances in Indore.</p>
            </header>

            {/* User Info and Location Section */}
            <div className="p-4 bg-white shadow-md rounded-b-lg text-gray-700 text-sm flex flex-col sm:flex-row justify-between items-center">
                <p className="mb-2 sm:mb-0">
                    <span className="font-semibold">User ID:</span> {userId || 'Loading...'}
                </p>
                <div className="flex items-center space-x-2">
                    <p className="italic">{locationStatus}</p>
                    <button
                        onClick={getLocation}
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition-colors duration-200 shadow-sm"
                        disabled={!isAuthReady}
                    >
                        Update Location
                    </button>
                </div>
            </div>

            {/* Map Section - Removed as per user request */}
            {/* <IndoreMap userLocation={userLocation} /> */}

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500 text-lg text-center p-4 bg-white rounded-lg shadow-inner">
                            Welcome! Type your grievance or query below to start a conversation with Indore Samadhan.
                        </p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 rounded-xl shadow-md transition-all duration-300 ease-in-out ${
                                msg.role === 'user'
                                    ? 'bg-blue-500 text-white rounded-br-none transform hover:scale-105'
                                    : 'bg-white text-gray-800 rounded-bl-none transform hover:scale-105'
                            }`}
                        >
                            <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 text-gray-700 p-3 rounded-lg rounded-bl-none shadow-md">
                            <div className="flex items-center">
                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></span>
                                Typing...
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} /> {/* Scroll target */}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200 shadow-xl rounded-t-xl">
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                        placeholder="Type your message here..."
                        className="flex-1 p-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-400 text-gray-800 text-base transition-all duration-200 ease-in-out"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-600 text-white p-3.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-3 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transform hover:scale-105 transition-all duration-200 ease-in-out"
                        disabled={isLoading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatboot; // Exporting Chatboot component
