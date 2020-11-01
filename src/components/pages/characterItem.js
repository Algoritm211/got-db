import React from 'react'
import GotService from '../../services/gotService'
import ItemDetails, { Field } from '../itemDetails'

export default class CharacterItem extends React.Component {
    gotService = new GotService()

    render() {
        return (
            <ItemDetails 
                itemId={this.props.charId}
                getItemData={this.gotService.getCharacter}
                >
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born'/>
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )
    }
}