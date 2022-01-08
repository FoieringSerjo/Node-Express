const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', function (res, res) {
	res.render('add', {
		title: 'Add Course',
		isAdd: true,
	});
});

router.post('/', async function (req, res) {
	const course = new Course(req.body.title, req.body.price, req.body.img);

	await course.save();
	res.redirect('/courses');
});

module.exports = router;
