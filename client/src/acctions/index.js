import axios from "axios";

export function getAllVideogames() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/videogames", []);
    dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getVideogamesName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        "http://localhost:3001/videogames?name=" + name
      );
      dispatch({
        type: "GET_VIDEOGAMES_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    let info = await axios.get("http://localhost:3001/genres");
    dispatch({
      type: "GET_GENRES",
      payload: info.data,
    });
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/characters/" + id);
      dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postVideogame(payload) {
  return async function () {
    let json = await axios.post("http://localhost:3001/videogame", payload);
    return json;
  };
}

export function alphabeticalOrder(payload) {
  return {
    type: "ALPHABETICAL_ORDER",
    payload,
  };
}
export function OrderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}
export function filterByGenres(payload) {
  return {
    type: "FILTER_BY_GENRES",
    payload,
  };
}

export function filterByOrigin(payload) {
  return {
    type: "FILTER_BY_ORIGIN",
    payload,
  };
}
