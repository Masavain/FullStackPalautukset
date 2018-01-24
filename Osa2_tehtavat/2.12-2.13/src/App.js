import React from 'react';
import axios from 'axios'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name} {country.nativeName}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt='flag' width='300' height='200' />
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      naytettava: '',
      pressed: false,
      chosen: ''
    }

  }
  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }
  handleNaytettaviaChange = (event) => {
    this.setState({ naytettava: event.target.value })
  }


  rajaaMaat = () => {
    const haettu = this.state.naytettava
    var maat = this.state.countries.filter(function (country) {
      return country.name.toLowerCase().indexOf(haettu.toLowerCase()) >= 0
    })
    return maat.slice(0, 10)
  }

  klick = (props) => {
    console.log(this.state.pressed)
    this.setState({
      pressed: !this.state.pressed,
      chosen: props
    })
  }

  render() {
    if (this.state.pressed) {
      return(<div>
        <Country country={this.state.chosen} />
      </div>
      )
    }
    if (this.state.countries.length === 0) {
      return (null)
    }
    const toShow = this.rajaaMaat()
    if (toShow.length === 1) {
      return (
        <div>
          <form>
            <div>
              find countries: <input value={this.state.naytettava} onChange={this.handleNaytettaviaChange} />
            </div>
          </form>
          <div>
            <Country country={toShow[0]} />
          </div>
        </div>
      )
    }
    return (
      <div>
        <form>
          <div>
            find countries: <input value={this.state.naytettava} onChange={this.handleNaytettaviaChange} />
          </div>
        </form>
        <ul>
          {toShow.map(country =>
            <div key={country.name} value={country} onClick={() => this.klick(country)}>{country.name}</div>)}

        </ul>
      </div>
    )
  }

}




export default App;
