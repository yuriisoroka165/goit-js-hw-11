import Notiflix from 'notiflix';
import ConnectToImageService from './js/api';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

refs = {
    gallery: document.querySelector('.gallery'),
    searchForm: document.querySelector('.search-form'),
    search: document.querySelector('.search-button'),
    loadMoreButton: document.querySelector('.load-more'),
}

const newConnection = new ConnectToImageService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(event) {
    event.preventDefault();

    newConnection.query = event.currentTarget.elements.searchQuery.value;
    newConnection.resetPage();
    newConnection.fetchItems()
        .then(items => {
            const totalHits = items.total;
            if (totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
                refs.gallery.insertAdjacentHTML('beforeend', galleryItemsMArkup(items.hits));
                // console.log('From (index.js)', items.hits);
            }
            console.log('From (index.js)', totalHits);
        });
}

function onLoadMore(event) {
    newConnection.fetchItems()
        .then(items => {
            refs.gallery.insertAdjacentHTML('beforeend', galleryItemsMArkup(items.hits));
        });
}

function galleryItemsMArkup(items) {
    return items
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `
                <a class="gallery__item" href="${largeImageURL}">
                    <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
                </a>
            `;}).join('');
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

// return `
//             <div class="card">
//                 <a href="${largeImageURL}" class="photo-card">
//                     <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
//                 </a>
//                     <div class="info">
//                         <p class="info-item">
//                         <b>Likes</b>
//                         ${likes}
//                         </p>
//                         <p class="info-item">
//                         <b>Views</b>
//                         ${views}
//                         </p>
//                         <p class="info-item">
//                         <b>Comments</b>
//                         ${comments}
//                         </p>
//                         <p class="info-item">
//                         <b>Downloads</b>
//                         ${downloads}
//                         </p>
//                     </div>
//             </div>
//             `;