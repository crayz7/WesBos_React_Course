import React from 'react'
import { formatPrice } from '../helpers';

class Order extends React.Component {
    //video 17
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        //make sure fish is loaded before we continue to next if statement. otherwise fish.status will be undefined bc it hasn't loaded
        if(!fish) return null;
        if (fish.status !== 'available') {
            return <li key={key}>Sorry {fish.name} is no longer available</li>
        }
        return (
            <li key={key}>{count} lbs {fish.name}
                {formatPrice(count * fish.price)}
            </li>
        )
    }
 
    render() {
        //video 17
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                </ul>
                <div className="total">
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>

        )
    }
}

export default Order;