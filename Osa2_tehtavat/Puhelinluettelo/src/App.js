import React from 'react';
import Person from './components/Person'
import personService
    from './services/persons'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="notif">
            {message}
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNum: '',
            naytettava: '',
            notif: null
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
                personService
                    .update(original.id, changed)
                    .then(response => {
                        const persons = this.state.persons
                        persons[persons.indexOf(original)] = changed
                        this.setState({
                            persons: persons,
                            newName: '',
                            newNum: '',
                            notif: `Henkilön ${person.name} numero päivitettiin`
                        })
                        setTimeout(() => {
                            this.setState({ notif: null })
                        }, 3000)
                    })
                    .catch(error => {
                        this.setState({
                            notif: `henkilö '${person.name}' on jo valitettavasti poistettu palvelimelta`,
                            persons: this.state.persons.filter(p => p.id !== person.id)
                        })
                        setTimeout(() => {
                            this.setState({ notif: null })
                        }, 5000)
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
                        notif: `lisättiin ${person.name}`,
                        
                    })
                    setTimeout(() => {
                        this.setState({ notif: null })
                    }, 3000)
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
            const person = this.state.persons.find(x => x.id === id)
            if (window.confirm(`poistetaanko ${person.name}`))
                personService
                    .poista(id)
                    .then(Response => {
                        this.setState({
                            persons: this.state.persons.filter(p => p.id !== id),
                            notif: `Henkilö ${person.name} poistettiin`
                        })
                        setTimeout(() => {
                            this.setState({ notif: null })
                        }, 3000)
                    })
                    .catch(error => {
                        this.setState({
                            notif: `henkilö '${person.name}' on jo valitettavasti poistettu palvelimelta`,
                            persons: this.state.persons.filter(p => p.id !== id)
                        })
                        setTimeout(() => {
                            this.setState({ notif: null })
                        }, 5000)
                    })
        }
    }

    render() {
        const toShow = this.rajaaNimet()
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.notif} />
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