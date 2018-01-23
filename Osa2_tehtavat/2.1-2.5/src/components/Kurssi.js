import React from 'react'

const Otsikko = ({kurssi}) => <h1>{kurssi.nimi}</h1>

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>

const Sisalto = ({ kurssi }) => {
  return (
    <div>
        {kurssi.osat.map(osa=><Osa key={osa.id} osa={osa}/>)}
    </div>
  )
}

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto kurssi={kurssi} />
      <Yhteensa kurssi={kurssi}/>
    </div>
  )
}

const Yhteensa = ({kurssi}) => {
  const array = []
  kurssi.osat.map(osa=>array.push(osa.tehtavia))  
  return(
    <p>Yhteensä {array.reduce((acc,cur) => acc +cur,0)} tehtävää</p>
  )
}

export default Kurssi