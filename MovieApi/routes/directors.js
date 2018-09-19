const express = require('express');
const router = express.Router();

//Models
const Directors = require('../models/Director');

//Director list operations
router.get('/',(req,res)=>{
    const promise = Directors.find({});

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

//Director getbyId Operations
router.get('/:director_id', (req, res, next) => {
    const promise = Directors.findById(req.params.director_id);

    if (!movie)
        next({
            message: 'The director was not found',
            code: 1
        });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

//Directors post operations
router.post('/',(req,res)=>{
    const director = new Directors(req.body);
    const promise = director.save();

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

//director Put Operations
router.put('/:director_id', (req, res, next) => {
    const promise = Directors.findByIdAndUpdate(
        req.params.director_id,
        req.body, {
            new: true
        }
    );

    promise.then((director) => {
        if (!director)
            next({
                message: 'The director was not found',
                code: 99
            });

        res.json(director);
    }).catch((err) => {
        res.json(err);
    });
});


//director Delete Operations
router.delete('/:director_id', (req, res, next) => {
    const promise = Directors.findByIdAndRemove(req.params.director_id);

    promise.then((data) => {
        if (!director)
            next({
                message: 'The director was not found',
                code: 1
            });

        res.json({
            status: 1
        });
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;