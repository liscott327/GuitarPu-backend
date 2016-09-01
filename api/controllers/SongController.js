/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findAll: async (req, res) => {
		try {
			let result = await Song.findAll({
				include: [User, Like],
				order:  [
         ['createdAt', 'DESC'],
        ],
			});
			result.forEach((e) => {
				let isLike = false;
				e.dataValues.Likes.forEach((e) => {
					if (e.UserId === req.session.uid){
						isLike = true;
					}
				});
				e.dataValues.isLike = isLike;
			});
			res.ok({
				data: result
			});
		} catch (e) {
			res.serverError(e);
		}
	},
	
	findAllOfMe: async (req, res) => {
		try {
			let result = await User.findOne({
				where: {
					id: req.session.uid,
				},
				include: [Song] 
			});
			res.ok({
				data: result.Songs
			});
		} catch (e) {
			res.serverError(e);
		}
	},
	
 	findILikes: async (req, res) => {
		try {
			let result = await Like.findAll({
				where:{
					UserId: req.session.uid,
				},
				include: [Song] 
			});
			res.ok({
				data: result
			});
		} catch (e) {
			res.serverError(e);
		}
	},
	
	findOne: async (req, res) => {
		try {
			let result = await Song.findOne({
				where: {
					id: req.params.id
				},
				include: [User] 
			});
			res.ok({
				data: result
			});
		} catch (e) {
			res.serverError(e);
		}
	},
	
	create: async (req, res) => {
		try {
			req.body.UserId = req.session.uid;
			let result = await Song.create(req.body);
			res.ok({
				data: result
			});
		} catch (e) {
			res.serverError(e);
		}
	},
	
	delete: async (req, res) => {
		try {
			let result = await Song.delete({
				where: {
					id: req.params.id
				},
			});
			res.ok({
				data: result
			});
		} catch (e) {
			res.serverError(e);
		}
	},
};
