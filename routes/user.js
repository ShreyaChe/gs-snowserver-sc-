var express = require('express');
var router = express.Router();
 

/* GET users listing. */
  


router.post('/login', async (req, res, next) =>

{
	try
	{   let axios= require('axios');
		 
		 this.userid = req.body.email
 		this.password = req.body.password
		const options={
			url:`https://dev65392.service-now.com/api/now/v2/table/sys_user?user_name=${this.userid}`,
			method:'get',
			auth:{
				username:`${this.userid}`,
				password:`${this.password}`
			}
		};
		axios(options).then((val)=>{
			var rs={
				raw:val,
				status:val.status
			}
			return res.status(202).json({ response: true });
		},(rej)=>{
			return res.status(202).json({ response: false});
		});
		  
	}
	catch(err)
	{
		return next(err);
	}
}); 

 




 module.exports = router;
