const connection = require('../database/connection');

module.exports = {
    async store(req, res) {
        const { id } = req.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first(); // pra nao retornar o array com 1 res e sim o res direto

        if (!ong) res.status(400).json({ error: 'ONG not found using this ID' });

        return res.json(ong);
    }
}