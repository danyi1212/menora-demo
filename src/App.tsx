import { useEffect, useState } from 'react';
import './App.css';



const readTextRecord = (record: NDEFRecord) => {
  if (record.recordType === "text") {
    const decoder = new TextDecoder(record.encoding)
    return decoder.decode(record.data)
  } else {
    return ""
  }
}

async function queryNfcPermissions() {
  if (!('NDEFReader' in window)) {
    throw new Error('This device does not support NFC')
  }
  const nfcPermission = await navigator.permissions.query({ name: 'nfc' as PermissionName });
  if (nfcPermission.state === 'denied') {
    throw new Error('Permission to use NFC is denied.');
  }
  return nfcPermission.state
}


function App() {
  const [error, setError] = useState<string | null>();
  const [messages, setMessages] = useState<string[]>([]);

  const handleError = (event: any) => {
    console.error(event);
    setError(event.error);
  }


  const handleReading = (event: NDEFReadingEvent) => {
    // Add the new message to the messages array
    setMessages([...messages, ...event.message.records.map(readTextRecord)]);
  }

  useEffect(() => {
    const startScanning = async () => {
      try {
        // Check if the device has NFC capabilities
        const state = await queryNfcPermissions();
      } catch (e) {
        if (e instanceof Error)
          setError(e.message)
        return
      }
      // Create an NDEFReader
      const reader = new NDEFReader();
      
      // Start listening for NFC messages
      reader.onerror = handleError
      reader.onreading = handleReading

      try {
        // Start scanning
        await reader.scan({
          
        });
      } catch (e) {
        if (e instanceof DOMException && e.name === "NotAllowedError") 
          setError(`NFC not allowed ${e.message}`)
        else if (e instanceof Error)
          setError(`Failed to scan NFC ${e.message}`)
      }
    }
    startScanning();
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>NFC Messages</h1>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <h3 style={{"color": "red"}}>{error}</h3>
      </header>
    </div>
  );
}

export default App;
