const UserModel = require("../models/model.user");
let Validator = require('fastest-validator');


let users = {};

let counter = 0;

let userValidator = new Validator();

/* use the same patterns as on the client to validate the request */

let namePattern = /([A-Za-z\-\’])*/;

let passwordPattern = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;

const userVSchema = {

		guid: {type: "string", min: 3},
		user_name: { type: "string", min: 1, max: 50, pattern: namePattern},
		email: { type: "email", max: 75 },
		password: { type: "string", min: 2, max: 50, pattern: passwordPattern}
	};

class UserService
{
	static create(data)
	{
		var vres = userValidator.validate(data, userVSchema);
		if(!(vres === true))
		{
			let errors = {}, item;
			let err = '' ;
			for(const index in vres)
			{
				item = vres[index];
				errors[item.field] = item.message;
				err = item.message
			}
			throw {
			    name: "ValidationError",
				//message: errors
				message: err
			};
		}
		let user = new UserModel(data.user_name, data.email, data.password);
        user.uid = 'c' + counter++;
		users[user.uid] = user;
        
		return user;
	}
	static retrieve(uid)
	{
		if(users[uid] != null)
		{
			return users[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a user by (uid:'+ uid +')');
		}

    }
    static getuser(data)
	{
		if(users[email] == data.email )
		{
			if ( users[password] == data.password )
				{ 
				return users[uid];
				}
			else
				{
			throw new Error('Password incorrect');
				}
		}

		else
		{
			throw new Error('User not Registered');
		}

    }
}
module.exports = UserService;