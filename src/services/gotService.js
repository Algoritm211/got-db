
class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    getResource = async (url) => {
        const result = await fetch(`${this._apiBase}${url}`)
        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`)
        }
        const some = await result.json()
    
        return some
    }


    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pagesize=10')
        return res.map(item => this._transformCharacter(item))
    }

    getAllBooks = async () => {
        const res = await this.getResource('/books/')
        return res.map(item => this._transformBook(item));
    }

    getAllHouses = async () => {
        const res = await this.getResource('/houses/')
        return res.map(item => this._transformHouse(item));
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`)
        return this._transformCharacter(character)
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`)
        return this._transformBook(book)
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`)
        return this._transformHouse(house)
    }

    isSet(data) {
        if(data) {
            return data
        } else {
            return 'No information'
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter(char) {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse(house) {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        };
    }
    
    _transformBook(book) {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        };
    }
}

export default GotService

// const got = new GotService()

// got.getAllCharacters()
//     .then(result => {
//         result.forEach(item => {
//             console.log(item.name);
//         })
//     })


// got.getCharacter(125)
//     .then(result => console.log(result))

