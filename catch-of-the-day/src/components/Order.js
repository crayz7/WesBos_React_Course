import React from 'react'
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        deleteFishOrder: PropTypes.func
    }
    
    //video 17
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const transitionOptions = {
            classNames: "order",
            key: key,
            timeout: { enter: 250, exit: 250 }
        }
        //make sure fish is loaded before we continue to next if statement. otherwise fish.status will be undefined bc it hasn't loaded
        if (!fish) return null;

        if (fish.status !== 'available') {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>Sorry {fish.name} is no longer available</li>
                </CSSTransition>
            )
        }
        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component='span' className='count'>
                            <CSSTransition classNames='count' key={count} timeout={{ enter: 250, exit: 250 }}>
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name}
                        {formatPrice(count * fish.price)}
                        <button className="deleteButton" onClick={() => this.props.deleteFishOrder(key)}>X</button>
                    </span>
                </li>
            </CSSTransition>
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
                <TransitionGroup component='ul' className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        )
    }
}

export default Order;