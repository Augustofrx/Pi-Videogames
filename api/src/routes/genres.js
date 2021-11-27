require("dotenv").config();
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Genres } = require("../db");

const findGenres = async () => {
    const table = await Genres.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!table.length) {
      try {
        const allGenres = await axios.get(
          `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
        );
        const genresMap = allGenres.data.results.map((e) => {
          return {
            id: e.id,
            name: e.name,
          };
        });
        genresMap.map(async (e) => {
          await Genres.findOrCreate({
            where: {
              id: e.id,
              name: e.name,
            },
          });
        });
        return {
          genres: genresMap,
        };
      } catch (error) {
        console.log(error);
      }
    } else {
      return {
        genres: table,
      };
    }
  };
  
  router.get("/", async (req, res) => {
    const allGenres = await findGenres();
    res.json(allGenres);
  });

  module.exports = router;