let initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: null,
  loading: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
        loading: false,
      };
    case "GET_VIDEOGAMES_NAME":
      return {
        ...state,
        videogames: action.payload,
        loading: false,
      };
      case 'GET_INIT': 
      return {
        ...state,
        loading: true,
      }
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

      case "RESET_DETAIL":
        return {
          ...state,
          detail: null,
        };

    case "POST_VIDEOGAME":
      return {
        ...state,

      };
    case "ALPHABETICAL_ORDER":
      let sortedArr =
        action.payload === "AZ"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        videogames: sortedArr,
      };
    case "ORDER_BY_RATING":
      let sortedRatingArr =
        action.payload === "Rating++"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) return -1;
              if (b.rating > a.rating) return 1;
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) return 1;
              if (b.rating > a.rating) return -1;
              return 0;
            });
      return {
        ...state,
        videogames: sortedRatingArr,
      };

    case "FILTER_BY_GENRES":
      const AllVideogames = state.allVideogames;
      const genresFiltered =
        action.payload === "All"
          ? AllVideogames
          : AllVideogames.filter((game) =>
              game.genres.find((genre) => {
                return genre.name === action.payload;
              })
            );
      return {
        ...state,
        videogames: genresFiltered,
      };
    case "FILTER_BY_ORIGIN":
      const AllVideogames2 = state.allVideogames;
      const filterByOrigin =
        action.payload === "Created"
          ? AllVideogames2.filter((e) => e.createdInDb === true)
          : AllVideogames2.filter((e) => e.createdInDb === false);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allVideogames : filterByOrigin,
      };
    default:
      return state;
  }
}

export default rootReducer;
