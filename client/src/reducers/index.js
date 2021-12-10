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
     let alphabeticalOrder = [...state.allVideogames]
     switch(action.payload) {
       case "AZ": 
       return {
         ...state,
         videogames: alphabeticalOrder.sort((a, b) => {
           if(a.name > b.name) return 1;
           if(a.name < b.name) return -1;
           return 0
         })
       };
       case "ZA":
         return {
           ...state,
           videogames: alphabeticalOrder.sort((a, b) => {
            if(a.name > b.name) return -1;
            if(a.name < b.name) return 1;
            return 0
         })
        }
        case "None":
          return {
            ...state,
            videogames: [...state.allVideogames]
          }
          default:
          return {
            ...state
          }
     }

    case "ORDER_BY_RATING":
    let orderByRating = [...state.allVideogames]
    switch(action.payload) {
      case "Rating++": 
      return {
        ...state,
        videogames: orderByRating.sort((a, b) => {
          if(a.name > b.name) return 1;
          if(a.name < b.name) return -1;
          return 0
        })
      };
      case "Rating--":
        return {
          ...state,
          videogames: orderByRating.sort((a, b) => {
           if(a.name > b.name) return -1;
           if(a.name < b.name) return 1;
           return 0
        })
       }
       case "None":
         return {
           ...state,
           videogames: [...state.allVideogames]
         }
         default:
         return {
           ...state
         }
        }
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
