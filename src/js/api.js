import axios from 'axios';

export default class ConnectToImageService {
    constructor() {
        this.apiKey = '33457552-f72b8f2d874a669f815eb264f'
        this.searchQuery = '';
        this.image_type = 'photo';
        this.orientation = 'horizontal';
        this.safesearch = 'true';
        this.page = 1;
        this.per_page = 40;
        // console.log(this.page);
    }

    async fetchItems() {
        // console.log('Before query', this.page);
        const queryUrl = `https://pixabay.com/api/?key=${this.apiKey}&q=${this.searchQuery}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.per_page}`;
        await axios.get(queryUrl)
            .then(response => response.data.hits)
            .then(hits => {
                console.log(hits);
                this.page +=1;
                // console.log('After query', this.page);
            });
        // console.log(response.data.total);
    }   

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

// async function getItems(q, image_type, orientation, safesearch, page, per_page) {
//     try {
//         const API_KEY = '33457552-f72b8f2d874a669f815eb264f';

//         console.log(response.data.hits);
//     } catch (error) {
//         console.error(error);
//     }
// }

// console.log(getItems());

// .then(response => {
//                 console.log(response.data.hits);
//             })