import { useState } from 'react'
import { Map,Navbar } from '../src/components/index'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Map />
    </>
  )
}

export default App
