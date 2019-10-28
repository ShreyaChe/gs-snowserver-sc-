var express = require('express');
var router = express.Router();
var UserService = require('../services/service.user');
/* GET users listing. */
router.get('/',async function(req, res, next) {
 // res.json({error: "Invalid User UID."});
    res.locals.connection.query('SELECT * from user', function (error, results, fields) {

	if (error) {

		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 

		//If there is error, we send the error in the error section with 500 status

	} else {

	res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	}
});
});

router.post('/', async (req, res, next) =>

{  
	const body = req.body;
	try
	{  
		
		const user = await UserService.create(body);
		if(body.guid != null)
		{
			user.guid = body.guid;
		}
		res.cookie('guid', user.guid, { maxAge: 900000, httpOnly: true });
		// created the customer! 
		var usrdata = { username : body.user_name, email: body.email,password: body.password }
		res.locals.connection.query('INSERT INTO user SET ?',usrdata, function (error, results, fields) {
		if (error) {
			res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
			} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			}
		});
		 
	}
	catch(err)
	{
		if (err.name === 'ValidationError')
		{
        	return res.status(202).json({ error: err.message });
		}
		return next(err);
	}
});



router.post('/login', async (req, res, next) =>

{
	try
	{
		res.locals.connection.query('SELECT * from user WHERE email = ? AND password = ?' ,[req.body.email,req.body.password], function (error, results, fields) {
			if (error) {
				res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
			} else {
					res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			}
		});
		//const user = await UserService.getuser(req.body);
		return res.json({ user: user });
	}
	catch(err)
	{
		return next(err);
	}
}); 

router.get('/:id', async (req, res, next) =>

{
	try
	{
		const user = await UserService.retrieve(req.params.id);
		return res.json({ user: user });
	}
	catch(err)
	{
		return next(err);
	}
});




 module.exports = router;
