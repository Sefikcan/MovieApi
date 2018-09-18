const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie');

//Movie get list operations
router.get('/', (req, res) => {
    const promise = Movie.find({});
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});


//get top 10 movie lists
router.get('/top10', (req, res) => {
    const promise = Movie.find({}).limit(10).sort({
        imdb_score: -1
    });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

//Movie getbyId Operations
router.get('/:movie_id', (req, res, next) => {
    const promise = Movie.findById(req.params.movie_id);

    if (!movie)
        next({
            message: 'The movie was not found',
            code: 1
        });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

//Movie Post Operations
router.post('/', (req, res, next) => {
    //ecmascript 6 ile gelen bu özellikte body'deki verileri const içindeki verilere atanır
    const {
        title,
        imdb_score,
        category,
        country,
        year
    } = req.body;

    const movie = new Movie({
        title: title,
        imdb_score: imdb_score,
        category: category,
        country: country,
        year: year
    });

    //alternatif yöntem
    //const movie = new Movie(req.body);
    //yukarının farkı gelen data üzerinde değişiklik yapabilirsin

    //birinci yöntem
    // movie.save((err, data) => {
    //     if (err)
    //         res.json(err);

    //     res.json({ success:true});
    // })

    const promise = movie.save();
    promise.then((data) => {
        res.json({
            success: true
        });
    }).catch((err) => {
        res.json(err);
    });
});

//movie Put Operations
router.put('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body, {
            new: true
        }
    );

    promise.then((movie) => {
        if (!movie)
            next({
                message: 'The movie was not found',
                code: 99
            });

        res.json(movie);
    }).catch((err) => {
        res.json(err);
    });
});

//movie Delete Operations
router.delete('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((data) => {
        if (!movie)
            next({
                message: 'The movie was not found',
                code: 1
            });

        res.json({
            status: 1
        });
    }).catch((err) => {
        res.json(err);
    });
});

//Movie data date between operations
router.get('/between/:start_year/:end_year', (req, res) => {
    const { start_year, end_year } = req.params;
    const promise = Movie.find({
        year:{
            "$gte": parseInt(start_year),
            "$lte": parseInt(end_year)
        }
    });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;