// import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import ConnectToImageService from './js/api';

refs = {
    gallery: document.querySelector('.gallery'),
    searchForm: document.querySelector('.search-form'),
    search: document.querySelector('.search-button'),
}

const newConnection = new ConnectToImageService();
// console.log(newConnection);

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();

    newConnection.query = event.currentTarget.elements.searchQuery.value;
    newConnection.fetchItems();
    // refs.gallery.insertAdjacentHTML('beforeend', galleryItemsMArkup(newConnection.fetchItems));
        
}

function galleryItemsMArkup(fetchedItems) {
    return fetchedItems
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `
                <a href="${largeImageURL}" class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                        <b>Likes</b>
                        ${likes}
                        </p>
                        <p class="info-item">
                        <b>Views</b>
                        ${views}
                        </p>
                        <p class="info-item">
                        <b>Comments</b>
                        ${comments}
                        </p>
                        <p class="info-item">
                        <b>Downloads</b>
                        ${downloads}
                        </p>
                    </div>
                </a>
            `;
        }).join('');
}

new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
});

// refs.gallery.insertAdjacentHTML('beforeend', galleryItemsMArkup("отово"));



// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');