import React from 'react'
import GotService from '../../services/gotService'
import ErrorMessage from '../errorMessage/errorMessage'
import ItemList from '../itemList'
import {withRouter} from 'react-router-dom'


class CharacterPage extends React.Component {

    gotService = new GotService()

    state = {
        selectedChar: 130,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <ItemList 
                onItemSelected={(itemId) => {
                    this.props.history.push(`${itemId}`)
                }}
                getData={this.gotService.getAllCharacters}
                renderItem={(item) => `${item.name} (${item.gender})`}
            /> 
        )
    }
}

export default withRouter(CharacterPage)