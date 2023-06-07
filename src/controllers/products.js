const { Product } = require("../models/product");



//Create New Product
exports.createProduct = async (req, res) => {
    try {
        const reqBody = req.body;
        const newProduct = await Product.create(reqBody);
        // console.log(newProduct);
        res.status(201).json({
            status: 'success',
            massage: 'New Product has been created!😊',
            Data: newProduct
        });
    } catch (error) {
        res.status(400).json({ massage: error.massage })
    }
};

//get all product
exports.products = async (req, res) => {
    try {
        const products = await Product.find({}, 'name price');

        if (products == '') {
            return res.json({ massage: 'Product not found. Please Create new Product.' })
        };

        res.status(200).json({
            status: 'success',
            massage: 'Get all product',
            Data: products
        });

    } catch (error) {
        res.status(404).json({ massage: error.massage })
    }
};

//Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await Product.findByIdAndDelete({ _id: id });

        if (deleteProduct === null) {
            return res.status(404).json({ massage: 'Product not found!' })
        }

        res.status(200).json({
            status: 'success',
            massage: 'Product has been Deleted!😊😊😊',
            Data: deleteProduct
        })
    } catch (error) {
        res.status(404).json({ massage: error.massage });
    }
};







