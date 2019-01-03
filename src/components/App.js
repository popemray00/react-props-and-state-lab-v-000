import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (val) => {
    this.setState({ filters: {type: val}});
  }

  onFindPetsClick = () => {
    let animal = this.state.filters.type
    let results = "";
    if (animal === 'all'){
      results = '/api/pets';
    } else {
      results = `/api/pets?type=${animal}`;
    }
    fetch(results)
    .then(response => response.json())
    .then(data => this.setState({pets: data}))
  }

  onAdoptPet = (petId) => {
    const petsChange = this.state.pets.map(pet => { return pet.id === petId ? { ...pet, isAdopted: true } : pet; });
    this.setState({ pets: petsChange });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App
