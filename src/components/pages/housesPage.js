import React from 'react'
import GotService from '../../services/gotService'
import ItemList from '../itemList'
import {withRouter} from 'react-router-dom'


class HousesPage extends React.Component {
    gotService = new GotService()

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        return (
            // <RowBlock left={housesList} right={houseItem}/>
            <ItemList 
                onItemSelected={(itemId) => {
                    this.props.history.push(`${itemId}`)
                }}
                getData={this.gotService.getAllHouses}
                renderItem={(item) => `${item.name}`}
            />
        )
        
    }
}

export default withRouter(HousesPage)