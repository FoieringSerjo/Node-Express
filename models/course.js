const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

class Course {
	constructor(title, price, img) {
		this.title = title;
		this.price = price;
		this.img = img;
		this.id = uuid.v4();
	}

	toJSON() {
		return {
			title: this.title,
			price: this.price,
			img: this.img,
			id: this.id,
		};
	}

	static async update(course) {
		const courses = await Course.getAll();
		// console.log(courses);
		const idx = courses.findIndex((c) => c.id === course.id);
		// console.log(idx);
		courses[idx] = course;
		// console.log(course);

		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, '..', 'data', 'courses.json'),
				JSON.stringify(courses),
				function (err) {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				}
			);
			// console.log(courses);
		});
	}

	async save() {
		const courses = await Course.getAll();
		courses.push(this.toJSON());

		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, '..', 'data', 'courses.json'),
				JSON.stringify(courses),
				function (err) {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				}
			);
		});
	}

	static getAll() {
		return new Promise((resolve, reject) => {
			fs.readFile(
				path.join(__dirname, '..', 'data', 'courses.json'),
				'utf-8',
				function (err, content) {
					if (err) {
						reject(err);
					} else {
						resolve(JSON.parse(content));
					}
				}
			);
		});
	}

	static async getById(id) {
		const courses = await Course.getAll();
		return courses.find((c) => c.id === id);
	}
}

module.exports = Course;
