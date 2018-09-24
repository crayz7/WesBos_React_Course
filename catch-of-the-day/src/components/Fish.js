import React from 'react'
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers'

class Fish extends React.Component {
    // This proptype is within the component because it is a normal React Component and not necessar to copy the proptypes to every single instance of this component
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        addToOrder: PropTypes.func
    }
    render() {
        const isAvailable = this.props.details.status === 'available';
        return (
            <li className="menu-fish">
                <img src={this.props.details.image} alt={this.props.details.name} />
                <h3 className="fish-name">{this.props.details.name}
                    <span className="price">{formatPrice(this.props.details.price)}</span>

                </h3>
                <p>{this.props.details.desc}</p>
                <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>{isAvailable ? "Add to Order" : "Sold Out"}</button>
            </li> 

        )
    }
}

export default Fish;