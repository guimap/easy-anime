const Anime = require('../models/anime');

const all = () => {
    return Anime.find()
        .lean()
        .exec()
}
module.exports = {
    all
}