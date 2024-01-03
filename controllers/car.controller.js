const mongoose = require('mongoose');
const Car = require('../models/Car');
const carController = {};

carController.createCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
		const {make , model, release_date, transmission_type, size, style, price } = req.body;
		if (!make || !model|| !release_date|| !transmission_type|| !size|| !style|| !price) {
			const exception = new Error("Missing required information");
			throw exception;
		}

		const newCar = await Car.create({make , model, release_date, transmission_type, size, style, price});

		const response = {message: "Create Car Successfully!", car: newCar}

		res.status(200).send({data: response})
	} catch (err) {
		// YOUR CODE HERE
		next(err);
	}
};

carController.getCars = async (req, res, next) => {
	try {
		// YOUR CODE HERE
		let {page,...filterQuery} = req.query;
		const filterKeys = Object.keys(filterQuery);
		if(filterKeys.length) {
			const exception = new Error('No searching allowed');
			throw exception;
		}

		let allCars = await Car.find({"isDeleted": false});
		// allCars = allCars.filter((car) => car.isDeleted === false)

		const totalPages = parseInt(allCars.length / 10);
		page = parseInt(page) || 1;
		let limit = 10;
		let offset = limit * (page-1);
		allCars = allCars.slice(offset, offset + limit)

		const response = {
			message: "Get All Cars Successfully!",
    		page: page,
			total: totalPages,
			cars: allCars,
		}

		res.status(200).send({data: response})
	} catch (err) {
		// YOUR CODE HERE
		next(err);
	}
};

carController.editCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
		let {id} = req.params;	
		const updates = req.body

		let updatedCar = await Car.findByIdAndUpdate(id,{...updates},{new: true}); //returns the document
		const response = {message: "Update Car Successfully!", car: updatedCar}

		res.status(200).send({data: response})
	} catch (err) {
		// YOUR CODE HERE
		next(err);
	}
};

carController.deleteCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
		const {id} = req.params

		let deletedCar = await Car.findByIdAndUpdate(id,{isDeleted: true},{new: true})
		const response = { message: "Delete car successfully!", car : deletedCar}

		res.status(200).send({data: response})
	} catch (err) {
		// YOUR CODE HERE
		next(err);
	}
};

module.exports = carController;
