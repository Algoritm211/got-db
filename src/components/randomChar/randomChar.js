import React, {Component} from 'react';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage/errorMessage';
import Loader from '../loader';
import PropTypes from 'prop-types'

import './randomChar.css';

export default class RandomChar extends Component {

    gotService = new GotService()
    state = {
        char: {},
        loading: true,
        error: false
    }

    static defaultProps = {
      interval: 10000
    }
    

    onCharLoaded = (char) => {
        this.setState({char: char, loading: false})
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    componentDidMount() {
        this.updateCharacter()
        this.timerId = setInterval(this.updateCharacter, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * 140 + 25); //25-140
        this.gotService
            .getCharacter(id)
            .then((char) => {
                this.onCharLoaded(char)
            })
            .catch(this.onError)
    }


    render() {
        const {char, loading, error} = this.state

        if (error) {
            return (
                <div className="random-block rounded">
                    <ErrorMessage />
                </div>
            )
        }

        return (
            <div className="random-block rounded">
                { loading 
                    ? <Loader />
                    : <View char={char}/>
                }  
            </div>
        );
    }
}

RandomChar.propTypes = {
  interval: PropTypes.number
}


const View = ({char}) => {

    const {name, gender, born, died, culture} = char
    return (
        <React.Fragment>
            <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </React.Fragment>
    )
}