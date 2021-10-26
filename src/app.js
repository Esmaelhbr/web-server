const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates')


app.set('view engine','hbs')
app.set('views', viewsPath);
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
		title: "help",
		message: "this page is under construction"
	});
})




app.get("/weather", (req,res) => {
	res.send({
		location: "Boston",
		forecast:"Rainning"
	});
})





app.listen(3000, () => {
	console.log('Server is up on port 3000')
});