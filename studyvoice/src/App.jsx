import { useState, useRef, useEffect } from 'react';

export default function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('studyvoice-items');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('studyvoice-items', JSON.stringify(items));
  }, [items]);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition. Please use Chrome on Android/Desktop.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    
    // BUG FIX 1: Disabled interim results to stop Android duplication loop
    recognition.interimResults = false; 

    recognition.onresult = (event) => {
      // BUG FIX 2: Extract text cleanly and add spaces between pauses
      const currentTranscript = Array.from(event.results)
        .map(result => result[0].transcript.trim())
        .join(' ');
        
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const saveItem = (type) => {
    if (!transcript.trim()) return;
    
    const now = new Date();
    const newItem = {
      id: Date.now(),
      text: transcript,
      type: type,
      date: now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      completed: false
    };
    
    setItems([newItem, ...items]);
    setTranscript('');
  };

  const toggleComplete = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 pb-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-10">StudyVoice</h1>
      
      <button 
        onClick={toggleListening}
        className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all shadow-lg ${
          isListening ? 'bg-red-500 animate-pulse scale-105' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isListening ? 'Stop' : 'Tap to Speak'}
      </button>

      <div className="mt-10 w-full max-w-md bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-h-[150px] flex flex-col">
        <p className="text-gray-500 text-sm mb-2 font-semibold uppercase tracking-wider">Live Transcript</p>
        <p className="text-gray-800 text-lg flex-grow">
          {transcript || "Speak clearly. Your words will appear when you pause..."}
        </p>
        
        {transcript && !isListening && (
          <div className="flex gap-3 mt-4">
            <button 
              onClick={() => saveItem('task')}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm"
            >
              Add to Task
            </button>
            <button 
              onClick={() => saveItem('note')}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm"
            >
              Add to Note
            </button>
          </div>
        )}
      </div>

      <div className="mt-12 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Your Dashboard</h2>
        
        {items.length === 0 ? (
          <p className="text-gray-500 italic text-center mt-8">No tasks or notes yet. Tap the mic!</p>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className={`p-4 rounded-xl shadow-sm border flex flex-col transition-all duration-300 ${item.completed ? 'bg-gray-100 border-gray-200' : 'bg-white border-gray-200'}`}>
                
                <div className="flex items-start gap-3">
                  {item.type === 'task' && (
                    <input 
                      type="checkbox" 
                      checked={item.completed || false}
                      onChange={() => toggleComplete(item.id)}
                      className="mt-1.5 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  )}
                  
                  <div className="flex-grow">
                    <span className="text-[11px] font-bold mb-1.5 flex items-center gap-2 uppercase tracking-wide">
                      <span className={`px-2 py-0.5 rounded text-white ${item.type === 'task' ? 'bg-blue-500' : 'bg-green-500'}`}>
                        {item.type}
                      </span>
                      <span className="text-gray-500">
                        {item.date} • {item.time}
                      </span>
                    </span>
                    
                    <p className={`text-lg leading-relaxed mt-1 ${item.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {item.text}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => deleteItem(item.id)}
                  className="self-end mt-2 text-sm text-red-400 hover:text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}