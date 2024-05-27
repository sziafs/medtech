const connection = require('../database/connection');

module.exports = {

    // trocar para esquema de paginacao
    // nao retornar todos os incidentes de uma unica vez
    // async index(req, res) {
    //     const incidents = await connection('incidents').select('*');

    //     return res.json(incidents);
    // },

    // paginacao feita
    // async index(req, res) {
    //     const { page = 1 } = req.query;

    //     const incidents = await connection('incidents')
    //         .limit(5)
    //         .offset((page-1)*5)
    //         .select('*');

    //     return res.json(incidents);
    // },

    // eh importante contar o registro total p/ enviar pro front
    // async index(req, res) {
    //     const { page = 1 } = req.query;

    //     // count[0] = .count() se tiver apenas 1 resultado
    //     const [count] = await connection('incidents').count();
    //     // console.log(count);
    //     // usar cabecalho da res da req pra enviar a contagem
    //     res.header('X-Total-Count', count['count(*)']);

    //     const incidents = await connection('incidents')
    //         .limit(5)
    //         .offset((page-1)*5)
    //         .select('*');

    //     return res.json(incidents);
    // },
    
    async index(req, res) {
        const { page = 1 } = req.query;
        const [count] = await connection('incidents').count();

        res.header('X-Total-Count', count['count(*)']);

        // precisa adicionar os dados da ong ao inves de apenas dos incidentes
        // usar o .join() para relacionar dados de 2 tables

        // const incidents = await connection('incidents')
        //     .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // pegar os dados da ong pelo incidente
        //     .limit(5)
        //     .offset((page-1)*5)
        //     .select('*');

        // como ong e incident tem o campo id com mesmo nome eles se sobrescreveram
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // pegar os dados da ong pelo incidente
            .limit(5)
            .offset((page-1)*5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        return res.json(incidents);
    },

    async store(req, res) {
        const { title, description, value } = req.body;

        // id da ong representa autenticacao
        // headers guarda infos do contexto da req
        const ong_id = req.headers.authorization;

        // resultado da insercao de um unico registro. array de 1 pos
        // const id = result[0;]
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return res.json({ id })
    },

    async destroy(req, res) {
        const { id } = req.params;

        // checar se o incidente a ser deletado foi criado pela ong logada
        // se nao pode deletar de alguma outra ong
        const ong_id = req.headers.authorization;

        //if (ong_id == 'undefined') res.status(410).json({ error: 'the resource requested is no longer available and will not be available again' });

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        // http status codes
        if (incident.ong_id !== ong_id) res.status(401).json({ error: 'Operation not permited.' });

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
}