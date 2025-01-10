$(document).ready(function () {
  // Alert
  $("#my-list").click(function () {
    alert("Favorite movies selected!");
  });

  // Array of objects
  var movies = [
    { title: "The Grand Budapest Hotel", genre: "Comedy", src: "/image/image4.jpg" },
    { title: "The Notebook", genre: "Romance", src: "/image/image5.jpg" },
    { title: "Get Out", genre: "Horror", src: "/image/image6.jpg" },
    { title: "Interstellar", genre: "Science Fiction", src: "/image/image7.jpg" },
    { title: "Crazy Rich Asians", genre: "Comedy", src: "/image/image8.jpg" },
    { title: "Titanic", genre: "Romance", src: "/image/image9.jpg" },
    { title: "A Quiet Place", genre: "Horror", src: "/image/image10.jpg" },
    { title: "Blade Runner 2049", genre: "Science Fiction", src: "/image/image11.jpg" },
    { title: "Deadpool", genre: "Comedy", src: "/image/image12.jpg" },
    { title: "Pride and Prejudice", genre: "Romance", src: "/image/image13.jpg" },
  ];

  // Get favorites
  function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  }

  // Set favorites
  function setFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  // Display movies
  function displayMovies(genre) {
    var $container = $("#movies-container");
    $container.empty();
    movies
      .filter(function (movie) {
        return !genre || movie.genre === genre;
      })
      .forEach(function (movie) {
        var movieHtml = $(`
          <div class="movie" data-title="${movie.title}">
            <img class="mov" src="${movie.src}" alt="${movie.title}">
            <div class="movie-title">${movie.title}</div>
            <button class="review-btn">Add Review</button>
            <span class="add-to-favorite">❤️</span>
            <div class="reviews-container" style="display: none;">
              <textarea class="review-text" placeholder="Write your review here..."></textarea>
              <button class="submit-review">Submit Review</button>
              <ul class="reviews-list"></ul>
            </div>
          </div>
        `);
        $container.append(movieHtml);
      });
  }

  // Add movie to favorites
  $(document).on("dblclick", ".movie", function () {
    var movieTitle = $(this).data("title");
    var movie = movies.find(function (m) {
      return m.title === movieTitle;
    });
    var favorites = getFavorites();

    if (!favorites.find(function (fav) {
      return fav.title === movie.title;
    })) {
      favorites.push(movie);
      setFavorites(favorites);
      alert(movie.title + " has been added to your favorites!");
    } else {
      alert(movie.title + " is already in your favorites.");
    }
  });

  // Toggle review
  $(document).on("click", ".review-btn", function () {
    $(this).siblings(".reviews-container").toggle();
  });

  // Submit a review
  $(document).on("click", ".submit-review", function () {
    var $textArea = $(this).siblings(".review-text");
    var reviewText = $textArea.val().trim();
    var $reviewsList = $(this).siblings(".reviews-list");

    if (reviewText) {
      $reviewsList.append(`
        <li>
          ${reviewText}
          <button class="delete-review">Delete</button>
        </li>
      `);
      $textArea.val(""); // Clear the text area
    } else {
      alert("Please write something before submitting!");
    }
  });

  // Delete a review
  $(document).on("click", ".delete-review", function () {
    $(this).parent().remove();
  });

  // Show all movies
  $("#home-button").on("click", function () {
    displayMovies();
    $("#movies-container").fadeIn();
  });

  // Filter movies by genre
  $(".dropdown-content a").on("click", function () {
    var genre = $(this).text();
    displayMovies(genre);
    $("#movies-container").fadeIn();
  });

  // Display favorite movies
  $("#my-list").on("click", function () {
    var favorites = getFavorites();
    var $container = $("#movies-container");
    $container.empty();

    if (favorites.length === 0) {
      $container.append("<p>You have no favorite movies yet.</p>");
    } else {
      favorites.forEach(function (movie) {
        var movieHtml = $(`
          <div class="movie">
            <img src="${movie.src}" alt="${movie.title}">
            <div class="movie-title">${movie.title}</div>
          </div>
        `);
        $container.append(movieHtml);
      });
    }
    $("#movies-container").fadeIn();
  });

  // Initial display of all movies
  displayMovies();
});