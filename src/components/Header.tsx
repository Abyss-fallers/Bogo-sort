import React from 'react'
import authorsData from '../../authors_and_socials.json'
import '../styles/header.css'

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Bogo Sort Visualizer</h1>
      <ul className="header__authors-list">
        Authors:
        {authorsData.authors.map((author, index) => (
          <li key={index}>{author.name}</li>
        ))}
      </ul>
    </header>
  )
}

export default Header
