const Hapi = require('hapi');
const server = new Hapi.Server();
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;
const Anime = require('./v1/models/anime')

const _connect = () => {
    mongoose.connect('mongodb://localhost/easyanime');
    //Inserindo 
    var anime =  new Anime({
        name : "Ousama Game The Animation",
        dataSource:[{
            name: 'Super Animes',
            url: 'http://www.superanimes.site/'
        }],
        description: 'Nobuaki Kanazawa, que se transferiu para uma distante, tem medo de ficar amigo de seus novos colegas devido aos eventos que aconteceram em sua escola anterior. Isso o levou a fechar o coração. No entanto, ele começa a se abrir durante o festival esportivo da classe. Ele e todos os seus colegas receberam um e-mail de "Ousama". De início, seus colegas de classe não levaram a sério, pensando que era apenas uma piada, mas Nobuaki, o único que conhece o significado real disso, luta contra o jogo da "morte" que em breve começará ... As regras do jogo Ousama são as seguintes: 1. Todos os alunos devem participar. 2. A ordem enviada de Ousama por e-mail deve ser atendida em 24 horas. 3. Uma punição será dada àqueles que não obedecerem a ordem. 4. Sair no meio do jogo Ousama é proibido',
        image: '//www.4icdn.com/img/animes/59583-large.jpg',
        total_episodes: 7,
        episodes: [],
        new: true,
        categories:[
            'Drama' , 
            'Mistério' , 
            'Sobrenatural' , 
            'Terror' , 
            'Vida Escolar'
        ]
    });
    // anime.save()

    
}


server.connection({ 
    host: 'localhost', 
    port: PORT 
});


/**
 * @desc 
 */
server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {
        return reply('hello ');
    }
});

/**
 * @desc Ve todos os handlers
 */
const handlers = require('glob').sync(require('path').join(__dirname, './v1/handlers/**/*.js'))
handlers.forEach(handler => server.route(require(handler) ) )


server.start((err) => {
    
    if (err) {
        throw err;
    }
    _connect();
    console.log('Server running at:', server.info.uri);
});
