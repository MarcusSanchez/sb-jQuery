
const $movies = $('#movies');
const $title = $('#title');
const $rating = $('#rating');
const $sortToggle = $('#toggle-sort');

let sortedByTitle = true;
const moviesNRatings = [];

const validateForm = () => $title.val().length >= 2 && isFinite(+$rating.val()) && +$rating.val() >= 1 && +$rating.val() <= 10;
const sortMoviesByTitle = () => moviesNRatings.sort((a, b) => a[0].localeCompare(b[0])); // sort alphabetically
const sortMoviesByRating = () => moviesNRatings.sort((a, b) => b[1] - a[1]); // sort numerically greater to lesser

function sortMovies() {
  sortedByTitle ? sortMoviesByTitle() : sortMoviesByRating();
  $movies.empty();
  for (let [movie, rating] of moviesNRatings) {
    $movies.append(`
      <div>
        <li>${movie} - ${rating}</li>
        <button class="remove">Remove</button>
      </div>
    `);
  }
  $('.remove').on('click', e => $(e.target).parent().remove());
}

$('#submit').on('click', (e) => {
  e.preventDefault();
  if (!validateForm()) return alert('Please a title with at least two characters and a rating 1-10.');

  moviesNRatings.push([$title.val(), $rating.val()]);
  sortMovies();

  $title.val('');
  $rating.val('');
});

$sortToggle.on('click', () => {
  $movies.empty();
  sortedByTitle = !sortedByTitle;
  sortMovies();
});

