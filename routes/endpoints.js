  const usercontroller=require('../controllers/userController');
  const express = require('express');
  const app = express();


const initendpoints=(app)=>
{
	app.use('/user',usercontroller);
	
}


     /** App Starting Route */
    // app.get('/', (req, res) => {
    //     res.send('API is Working');
    // });

    // /** Categories Route */
    //  app.use('/categories/',categoriescontroller);

    	//user
    module.exports=initendpoints;