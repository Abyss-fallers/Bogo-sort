import React from 'react'
import BogoSortVisualizer from './components/BogoSortVisualizer'
import Header from './components/Header'
import './index.css'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <BogoSortVisualizer />
    </>
  )
}

export default App
