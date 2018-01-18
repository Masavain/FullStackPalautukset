import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto osa = {osa1.nimi} tehtavia = {osa1.tehtavia}/>
      <Sisalto osa = {osa2.nimi} tehtavia = {osa2.tehtavia}/>
      <Sisalto osa = {osa3.nimi} tehtavia = {osa3.tehtavia}/>
      <Yhteensa eka = {osa1.tehtavia} toka = {osa2.tehtavia} 
      kolmas = {osa3.tehtavia}/>
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
      <p>yhteensä {props.eka + props.toka + props.kolmas} tehtävää</p>
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)