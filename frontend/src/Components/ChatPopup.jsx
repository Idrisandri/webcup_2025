// src/components/ChatPopup.jsx
import React, { useState } from 'react';
import api from '../api.js';

export default function ChatPopup({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    const userMessage = { sender: 'user', text: prompt };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    try {
      const response = await api.post('gemini/', { prompt });
      const botMessage = { sender: 'bot', text: response.data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Erreur API :', err);
      const errorMessage = { sender: 'bot', text: 'Erreur lors de la génération de la réponse.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col" style={{ height: '500px' }}>
      {/* Header */}
      <div className="bg-neutral-500 text-white p-3 rounded-t-lg flex justify-between items-center">
        <h2 className="font-semibold text-lg">Chat</h2>
        <button onClick={handleClose} className="text-white hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-amber-100 ml-auto' : 'bg-gray-100 mr-auto'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      
      {/* Input */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Votre question..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-transparent"
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            className={`px-4 py-2 bg-neutral-500 text-white rounded-lg hover:bg-neutral-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? '...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  );
}