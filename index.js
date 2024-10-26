const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.set("base", "/api/v1");

const movieCompanyData = [
  { id: "1", name: "True Film Productions" },
  { id: "2", name: "Lazy Lemon Films" },
  { id: "3", name: "Good old TV" },
];

const movieData = [
  {
    id: "1",
    reviews: [6, 8, 7, 9, 8, 7, 8],
    title: "A long train ride",
    filmCompanyId: "1",
    cost: 1020,
    releaseYear: 2001,
  },
  {
    id: "2",
    reviews: [5, 7, 3, 4, 5, 6, 3],
    title: "Flowers on the meadow",
    filmCompanyId: "2",
    cost: 983,
    releaseYear: 1997,
  },
  {
    id: "3",
    reviews: [1, 4, 5, 2, 3, 1, 2],
    title: "Summer",
    filmCompanyId: "1",
    cost: 7346,
    releaseYear: 2015,
  },
  {
    id: "4",
    reviews: [6, 7, 4, 5, 6, 7, 3],
    title: "Back to the garden",
    filmCompanyId: "2",
    cost: 364,
    releaseYear: 2009,
  },
  {
    id: "5",
    reviews: [2, 1, 2, 1, 3, 2, 1],
    title: "Mr John Smith",
    filmCompanyId: "3",
    cost: 26456,
    releaseYear: 2021,
  },
];

const apiV1 = express.Router();

function getMovieById(id) {
  return movieData.find((movie) => movie.id === id);
}

function getCompanyById(id) {
  return movieCompanyData.find((company) => company.id === id);
}

function getMovieWithCompanyById(movie) {
  const company = getCompanyById(movie.filmCompanyId);

  if (!company) {
    return { ...movie, company: { name: "Unknown" } };
  }

  return { ...movie, company };
}

apiV1.get("/movies", (_request, response) => {
  response.header({ "access-control-allow-origin": "*" });
  if (Math.random() < 0.8) {
    response.status(200);

    const moviesWithCompany = movieData.map((movie) =>
      getMovieWithCompanyById(movie)
    );

    response.send(moviesWithCompany);
  } else {
    response.status(500);
    response.send();
  }
});

apiV1.put("/movies/:movieId", (request, response) => {
  response.header({ "access-control-allow-origin": "*" });
  response.header({ "content-type": "application/json" });
  const movie = getMovieById(request.params.movieId);

  if (!movie) {
    response.status(404);
    response.send({ message: "Movie not found" });
    return;
  }

  const review = request.body.review;

  if (!review) {
    response.status(400);
    response.send({ message: "Review is required" });
    return;
  }

  if (
    typeof review !== "string" ||
    review.length === 0 ||
    review.length > 100
  ) {
    response.status(400);
    response.send({
      message: "Review must be a string less than 100 characters",
    });
    return;
  }

  response.status(200);
  response.send({
    message: `Thank you for your review for movie ${movie.title}!`,
  });
});

apiV1.get("/companies", (_request, response) => {
  response.header({ "access-control-allow-origin": "*" });
  if (Math.random() < 0.8) {
    response.status(200);
    response.send(movieCompanyData);
  } else {
    response.status(500);
    response.send();
  }
});

app.use(app.get("base"), apiV1);

app.listen(process.env.PORT || 8080);
