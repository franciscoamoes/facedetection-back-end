const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'd1829abc0e6a48abb2784035fed2eff1'
});

const handleApiCall = (req, res) => {
	app.models
	.predict('d1829abc0e6a48abb2784035fed2eff1', req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}