const animeService = require('../../services/animes')

async function handler(request, reply) {
  try{

    let animes = await animeService.all();
    console.log('aeo', animes)
    return reply(JSON.stringify(animes));

  }catch(err) {
    console.error(err);
    return reply("erro!")
  }
}

module.exports = {
    handler,
    path: '/animes',
    method: 'GET'
}