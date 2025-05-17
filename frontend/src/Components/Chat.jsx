import React, { useState } from 'react';
import api from '../api.js';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="p-4 max-w-2xl mx-auto flex flex-col h-screen space-y-4">
      <h1 className="text-2xl font-semibold text-center">Chat</h1>
      <div className="flex-grow overflow-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded max-w-xs ${msg.sender === 'user' ? 'bg-gray-200 self-end' : 'bg-blue-100 self-start'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Votre question..."
          className="flex-1 p-2 border rounded"
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Envoi...' : 'Envoyer'}
        </button>
      </div>
    </div>
  );
}
