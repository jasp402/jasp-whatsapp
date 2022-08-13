let models = require('../../db/models');
let {smart_shortcuts} = models;

const getShortcuts = (req, res) => {
    return smart_shortcuts
        .findAll({where: {}})
        .then(data => {
            let result = data.map(item => item.dataValues);
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
        });
}


module.exports = {getShortcuts};