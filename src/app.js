const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')


//set up handlebars engine and views location 
app.set('view engine','hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve 
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
	res.render('index',{
		title: "Weather ",
		name :"Esmael"
	});
})

app.get('/about',(req,res) => {
	res.render('about',{
		title: "About",
		name: "Esmael"
	});
})

app.get('/help',(req,res) => {
	
	res.render('help',{
		title: "Help",
		helpText: "this page is under construction",
		name: "Esmael"
	});
})





app.get("/weather", (req,res) => {
	let address= req.query.adress;
	if(!req.query.address){
		return res.send({
			error :"you must provide an address"
		})
	}

	geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
		if(error){
			return res.send({error})
		}
		forecast(latitude,longitude,(error, forecastData) => {
			if(error){
				return res.send(error)
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address

			})

		})

	})
})

app.get("/products", (req,res) => {
	
	if(!req.query.search){
		return res.send({
			error: 'you must provide a search term'
		})
	}
		res.send({
		products: []
	})

	
	
	
})


app.get('/help/*',(req,res)=>{
	res.render('404',{
		errorDescription: "Help article not found",
		name: "Esmael"
	})
})
app.get("*", (req,res) => {
	res.render('404',{
		errorDescription: "Page not found",
		name: "Esmael"
	})
})






app.listen(port, () => {
	console.log('Server is up on port ' + port)
});