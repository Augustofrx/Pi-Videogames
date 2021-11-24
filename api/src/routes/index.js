// const e = require('express');
require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Genres, Videogame } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
  );
  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
        name: e.name,
        genres: e.genres.map((e) => {
            return {
                id: e.id,
                name: e.name
            }
        }),
        released: e.released,
        rating: e.rating,
        description: e.description,
        platforms: e.platforms.map((e) => e.platform.name),
        image: e.background_image,
      id: e.id,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

router.get("/videogames", async (req, res) => {
  const name = req.query.name;
  let totalVideogames = await getAllVideogames();
  if (name) {
    let videogameName = await totalVideogames.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    videogameName.length
      ? res.status(200).send(videogameName)
      : res.status(404).send("Videogame not found, sorry :(");
  } else {
    res.status(200).send(totalVideogames);
  }
});

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

router.get("/genres", async (req, res) => {
  const allGenres = await findGenres();
  res.json(allGenres);
});

router.get('/videogame/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params;
    const allId = await axios.get(
      `https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`
    );
    res.json( {
      id: allId.data.id,
      name: allId.data.name,
      image: allId.data.name,
      description: allId.data.description,
      released: allId.data.released,
      rating: allId.data.rating,
      platforms: allId.data.platforms.map((e) => e.platform.name),
      genres: allId.data.genres.map((e) => {
        return {
            id: e.id,
            name: e.name
        }
    }),
    })
  });
module.exports = router;
