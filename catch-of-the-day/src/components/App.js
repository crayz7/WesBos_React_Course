import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        //first reinstate our local storage
        const localStorageRef = localStorage.getItem(this.props.match.params.storeId)
        if(localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    updateFish = (key, updatedFish) => {
        // take copy of current state of fishes
        const fishes = {...this.state.fishes}
        // update that state
        fishes[key] = updatedFish;
        // set that to state
        this.setState({fishes: fishes})
    }

    deleteFish = (key) => {
        const fishes = {...this.state.fishes}
        // update the state
        fishes[key] = null;
        // update state
        this.setState({fishes: fishes})
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    };

    addToOrder = (key) => {
        //take a copy of state
        const order = {...this.state.order};
        //add to order or update the quantity
        order[key] = order[key] + 1 || 1;
        //update state
        this.setState({
            order: order
        })
    }

    deleteFishOrder = (key) => {
        const order = {...this.state.order}
        delete order[key];
        this.setState({order: order})
    }

    addFish = (fish) => {
        //video 13 - understanding state
        //take a copy of state
        const fishes = {...this.state.fishes};
        //add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //set the new fishes object to state
        this.setState({
            fishes: fishes
        })
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} index={key} addToOrder={this.addToOrder} />)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} deleteFishOrder={this.deleteFishOrder}/>
                <Inventory 
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;