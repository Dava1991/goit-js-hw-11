import Notiflix from 'notiflix';
import pixabayBase from './js/photo-gallery.js' 
import createMarkup from './js/search-form.js'


export const refs = {
    form: document.querySelector('#search-form'),
    dataInput: document.querySelector('.searchin'),
    gallery: document.querySelector('.gallery'),
    loadmoreBtn: document.querySelector('.load-more'),
    messageFinish: document.querySelector('.finishmas')
}

const { searchQuery } = refs.form.elements;
let inputDataUser;
export let page = 1;
const perPage = 40;

refs.form.addEventListener('submit', onSearchQuery)
async function onSearchQuery(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.messageFinish.classList.add('hidden')
  refs.loadmoreBtn.classList.add('hidden');
  page = 1;
  inputDataUser = e.currentTarget.searchQuery.value.trim();
  
  if (!inputDataUser) {
    console.log('Please Input Search Images...');
    return Notiflix.Notify.failure(`Please Input Search Images...`);
  };

    try {
      const resp = await pixabayBase(inputDataUser);
      const respArr = resp.hits;
      const totalHits = resp.totalHits;
       
      if (totalHits > perPage) {
        refs.loadmoreBtn.classList.remove('hidden')
        page++;
        refs.messageFinish.classList.add('hidden')
        refs.dataInput.value = '';
      } 
      if (totalHits < perPage) {
        refs.loadmoreBtn.classList.add('hidden')
        refs.messageFinish.classList.remove('hidden')
        refs.dataInput.value = '';
      } 
      
     if (!resp.totalHits) {
          Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
       refs.messageFinish.classList.add('hidden')
       refs.gallery.innerHTML = '';
       refs.dataInput.value = ''; 
      } else {
       Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        createMarkup(respArr);
      };
  }
  catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Error');
  }
};

refs.loadmoreBtn.addEventListener('click', onLoadQuery)
async function onLoadQuery() {
    try {
      const resp = await pixabayBase(inputDataUser);
       smoothScrol();
            page++;
      const respArr = resp.hits;
      const totalHits = resp.totalHits;
     const totalPage = Math.ceil(totalHits / respArr.length);

      createMarkup(respArr);
      if (respArr.length < perPage) {
        refs.messageFinish.classList.remove('hidden');
        refs.loadmoreBtn.classList.add('hidden');
        refs.dataInput.value = '';
        Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`)
      };

       if (page === totalPage-1) {
          refs.messageFinish.classList.remove('hidden');
          Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
          refs.loadmoreBtn.classList.add('hidden');
          refs.dataInput.value = '';
        }

  }
  catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Error');
  }
};

function smoothScrol() {

const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

}