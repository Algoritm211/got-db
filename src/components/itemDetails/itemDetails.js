import React, {Component} from 'react';
import GotService from '../../services/gotService';
import Loader from '../loader';
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field}

export default class ItemDetails extends Component {

    gotService = new GotService()

    state = { 
        item: null
    }

    componentDidMount() {
        this.updateItem()
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }

    updateItem = () => {
        const {itemId} = this.props
        if (!itemId) {
            return
        }
        const {getItemData} = this.props
        getItemData(itemId)
            .then((item) => {
                this.setState({
                    item: item
                })
            })
    }

    render() {

        if (!this.state.item) {
            return (
                <Loader/>
            )
        }

        const {item} = this.state
        const {name} = item
        // const {name, gender, born, died, culture} = this.state.char

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return (
                                React.cloneElement(child, {item})
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}