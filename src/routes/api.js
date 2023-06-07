const { createProduct, products, deleteProduct } = require('../controllers/products');
const { register, login, generateToken } = require('../controllers/users');
const { authenticate } = require('../middlewares/products');

const router = require('express').Router();


//Generate Token Route
router.get('/generateToken', generateToken);




//User Register Route
router.post('/register', register);

//User Login Route
router.get('/login', login)




//Create New Product route
router.post('/createProduct', authenticate, createProduct);

//all product route
router.get('/products', authenticate, products)

//Delete Product route
router.delete('/product/delete/:id', authenticate, deleteProduct)



module.exports = router;
