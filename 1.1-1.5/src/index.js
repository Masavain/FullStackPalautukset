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
      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osa1.nimi} t1={osa1.tehtavia} osa2={osa2.nimi}
        t2={tehtavia} osa3={osa3.nimi} t3={tehtavia} />
      <Yhteensa t1={osa1.tehtavia} t2={osa2.tehtavia} t3={osa3.tehtavia} />
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
      <Osa nimi={props.osa1} teht={props.t1} />
      <Osa nimi={props.osa2} teht={props.t2} />
      <Osa nimi={props.osa3} teht={props.t3} />
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.nimi} {props.teht}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>yhteensä {props.t1 + props.t2 + props.t3} tehtävää</p>
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)