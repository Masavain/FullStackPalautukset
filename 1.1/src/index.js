import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko kurssi = {kurssi} />
      <Sisalto osa={osa1} tehtavia={tehtavia1}/>
      <Sisalto osa={osa2} tehtavia={tehtavia2}/>
      <Sisalto osa={osa3} tehtavia={tehtavia3}/>
      <Yhteensa maara1 = {tehtavia1} maara2 = {tehtavia2} maara3 = {tehtavia3}/>
    </div>
  )
}

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      <p>{props.osa} {props.tehtavia}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>yhteensä {props.tehtavia1 + props.tehtavia2 + props.tehtavia3} tehtävää</p>
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)