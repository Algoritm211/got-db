import React from 'react'
import GotService from '../../services/gotService'
import ErrorMessage from '../errorMessage/errorMessage'
import { Field } from '../itemDetails'
import ItemList from '../itemList'
import RowBlock from '../rowBlock/rowBlock'

class BooksPage extends React.Component {
    gotService = new GotService()

    state = {
        selectedBook: 4
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    render () {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const bookList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => (<span>{item.name}</span>)}
            />
        )

        const bookDetails = (
            <itemDetails
                itemId={this.state.selectedBook}
                getItemData={this.gotService.getBook}

            >
                <Field field='publisher' label='Publisher'/>
            </itemDetails>
        )

        return (
            <RowBlock right={bookDetails} left={bookList}/>
        )
    }

    
}

export default BooksPage