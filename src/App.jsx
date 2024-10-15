import { useState } from 'react';
import { Navbar, Map } from '../src/components/index';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Map />
    </div>
  );
}

export default App;
