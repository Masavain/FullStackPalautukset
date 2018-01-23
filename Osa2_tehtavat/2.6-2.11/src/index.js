import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const persons = [
    { name: 'Arto Hellas', num: '040-123456' },
    { name: 'Martti Tienari', num: '040-123456' },
    { name: 'Arto Järvinen', num: '040-123456' },
    { name: 'Lea Kutvonen', num: '040-123456' }
  ]

ReactDOM.render(
    <App persons={persons}/>,
    document.getElementById('root')
  )