var express = require('express');
var router = express.Router();

router.post('/getincdnts', async (req, res, next) =>

{
	try
	{   let axios= require('axios');
		type ='incident' 
		this.userid = req.body.email
 		this.password = req.body.password
		const options={
//			url:`https://dev65392.service-now.com/api/now/v2/table/${type}?sysparm_limit=1`,
			url:`https://dev65392.service-now.com/api/now/v2/table/${type}?&active=true`,
			method:'get',
			auth:{
				username:`${this.userid}`,
				password:`${this.password}`
			}
		};
		axios(options).then((val)=>{
			return res.status(202).json({ response: val.data.result});
			
			
		},(rej)=>{
			return res.status(202).json({ response: rej});
		});
		  
	}
	catch(err)
	{
		return next(err);
	}
}); 

  module.exports = router;
