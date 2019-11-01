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
router.post('/putincdnt', async (req, res, next) =>

{
	try
	{   let axios= require('axios');
		type ='incident' 
		data ={'short_description':req.body.desc,'assignment_group':'287ebd7da9fe198100f92cc8d1d2154e','category':req.body.ctgry,'impact':req.body.impct.charAt(0)}
		this.userid = req.body.email
 		this.password = req.body.password
		 const options={
			url:`https://dev65392.service-now.com/api/now/table/${type}?sysparm_input_display_value=true&sysparm_display_value=true`,
			 method:'post',
			 headers:{
				 'Accept':'application/json',
				 'Content-Type':'application/json'
			 },
			 data:data,
			 auth:{
				 username:`${this.userid}`,
				 password:`${this.password}`
			 }
		};
		axios(options).then((val)=>{
			return res.status(202).json({ response: val.data.result.number});
			
			
		},(rej)=>{
			return res.status(202).json({ response: rej});
		});
		  
	}
	catch(err)
	{
		return next(err);
	}
}); 

router.post('/vwincdntdtl', async (req, res, next) =>

{
	try
	{   let axios= require('axios');
		type ='incident' 
		numb=req.body.incdntno
		this.userid = req.body.email
 		this.password = req.body.password
		const options={
//			url:`https://dev65392.service-now.com/api/now/v2/table/${type}?sysparm_limit=1`,
			url:`https://dev65392.service-now.com/api/now/v2/table/${type}?sysparm_query=number=${numb}`,
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
router.post('/updincdnt', async (req, res, next) =>

{
	try
	{   let axios= require('axios');
		type ='incident' 
		data ={'state':req.body.state}
		this.userid = req.body.email
		 this.password = req.body.password
		 sysid=req.body.sysid
		 const options={
			url:`https://dev65392.service-now.com/api/now/table/${type}/${sysid}`,
			 method:'put',
			 headers:{
				 'Accept':'application/json',
				 'Content-Type':'application/json'
			 },
			 data:data,
			 auth:{
				 username:`${this.userid}`,
				 password:`${this.password}`
			 }
		};
		axios(options).then((val)=>{
			return res.status(202).json({ response: val.data.result.number});
			console.log(val);
			
		},(rej)=>{
			return res.status(202).json({ error: rej.response.statusText});
		});
		  
	}
	catch(err)
	{
		return next(err);
	}
}); 
router.post('/dltincdnt', async (req, res, next) =>

{
	try
	{   let axios= require('axios');
		type ='incident' 
		 
		this.userid = req.body.email
		 this.password = req.body.password
		 sysid=req.body.sysid
		 const options={
			url:`https://dev65392.service-now.com/api/now/table/${type}/${sysid}`,
			 method:'delete',
			 headers:{
				 'Accept':'application/json',
				 'Content-Type':'application/json'
			 },
		 
			 auth:{
				 username:`${this.userid}`,
				 password:`${this.password}`
			 }
		};
		axios(options).then((val)=>{
			return res.status(202).json({ response: val.status});
			console.log(val);
			
		},(rej)=>{
			return res.status(202).json({ error: rej.response.statusText});
		});
		  
	}
	catch(err)
	{
		return next(err);
	}
}); 

  module.exports = router;
