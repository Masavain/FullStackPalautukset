import React from 'react';
import Person from './components/Person'
import personService
    from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNum: '',
            naytettava: ''
        }
    }
    componentWillMount() {
        personService

            .getAll()
            .then(persons => {
                this.setState({ persons: persons })
            })
    }

    addName = (event) => {
        event.preventDefault()
        const person = {
            name: this.state.newName,
            number: this.state.newNum
        }

        const nimet = []
        this.state.persons.map(person => nimet.push(person.name))
        if (nimet.includes(person.name)) {
            if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                const original = this.state.persons.find(x => x.name === person.name)
                const changed = { ...original, number: person.number }
                console.log(original)
                console.log(changed)
                personService
                    .update(original.id, changed)
                    .then(response => {
                        const persons = this.state.persons
                        persons[persons.indexOf(original)] = changed
                        this.setState((prevState) => ({
                            persons: persons,
                            newName: '',
                            newNum: ''
                        }))
                    })
            }


        } else {
            personService
                .create(person)
                .then(person => {
                    this.setState({
                        persons: this.state.persons.concat(person),
                        newName: '',
                        newNum: '',
                    })
                })

        }
    }

    rajaaNimet = () => {
        const haettu = this.state.naytettava
        var nimet = this.state.persons.filter(function (person) {
            return person.name.toLowerCase().indexOf(haettu.toLowerCase()) >= 0
        })
        return nimet

    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }
    handleNumChange = (event) => {
        this.setState({ newNum: event.target.value })
    }
    handleNaytettaviaChange = (event) => {
        this.setState({ naytettava: event.target.value })
    }

    deletePerson = (id) => {
        return () => {
            if (window.confirm(`poistetaanko ${this.state.persons.find(x => x.id === id).name}`))
                personService
                    .poista(id)
                    .then(Response => {
                        this.setState({
                            persons: this.state.persons.filter(p => p.id !== id),

                        })
                    })
                    .catch(error => {
                        alert(`henkilö '${id}' on jo valitettavasti poistettu palvelimelta`)
                        this.setState({ persons: this.state.persons.filter(p => p.id !== id) })
                    })
        }
    }

    render() {
        const toShow = this.rajaaNimet()
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form>
                    <div>
                        rajaa näytettäviä: <input value={this.state.naytettava} onChange={this.handleNaytettaviaChange} />
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
                    {toShow.map(person => <Person key={person.id} person={person} deletePerson={this.deletePerson(person.id)} />)}
                </ul>
            </div>
        )
    }
}

export default App