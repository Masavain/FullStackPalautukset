import React from 'react';
import Person from './components/Person'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: props.persons,
            newName: '',
            newNum: '',
            naytettava: ''
        }
    }

    addName = (event) => {
        event.preventDefault()
        const person = {
            name: this.state.newName,
            num: this.state.newNum
        }

        const nimet = []
        this.state.persons.map(person => nimet.push(person.name))

        if (nimet.includes(person.name)) {
            alert("ei passaa")
            this.setState({
                newName: '',
                newNum: ''
            })
        } else {
            const persons = this.state.persons.concat(person)
            this.setState({
                persons,
                newName: '',
                newNum: ''
            })
        }


    }

    rajaaNimet = () => {
        const haettu = this.state.naytettava
        var nimet = this.state.persons.filter(function(person) {
            return person.name.toLowerCase().indexOf(haettu.toLowerCase())>=0
        })
        console.log(nimet)
        console.log(haettu)
        return nimet
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }
    handleNumChange = (event) => {
        this.setState({ newNum: event.target.value })
    }
    handleNaytettaviaChange = (event) => {
        console.log(this.state.naytettava)
        this.setState({ naytettava: event.target.value })
    }


    render() {
        const toShow = this.rajaaNimet()

        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form>
                    <div>
                        rajaa näytettäviä: <input value={this.state.naytettava} onChange={this.handleNaytettaviaChange}/>
                    </div>
                </form>

                <h3>Lisää uusi henkilö</h3>
                <form onSubmit={this.addName}>
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
                    </div>
                    <div>
                        numero: <input value={this.state.newNum} onChange={this.handleNumChange} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>

                <h3>Numerot</h3>
                <ul>
                    {toShow.map(person => <Person key={person.name} person={person} />)}
                </ul>
            </div>
        )
    }
}

export default App