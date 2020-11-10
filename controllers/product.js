const { models } = require('mongoose');
const Product = require('../models/product.js');

exports.createProduct = (req, res, next) => {
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock,
    });
    product.save().then(
        () => {
            res.status(200).json({
                message: "Product saved correctly"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    )
} 

exports.getProduct = (req, res, next) => {
    Product.findOne({
        _id: req.params.id
    }).then(
        (existingProduct) => {
            res.status(200).json({ product: existingProduct });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    )
}

exports.updateProduct = (req, res, next) => {
    const exostingProduct = new Product({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock
    });
    Product.updateOne({ _id: req.params.id }, product)
        .then(
            () => {
                res.status(201).json({
                    message: "Product updated successfully"
                })
            }
        ).catch(
            (error) => {
                res.status(500).json({
                    error: error
                })
            }
        )
}

exports.deleteProduct = (req, res, next) => {
    Product.findOne({
        _id: req.params.id
    }).then(
        (product) => {
            Product.deleteOne({ 
                _id: req.params.id
            }).then(
                () => {
                    res.status(200).json({
                        message: "The product was deleted successfully!"
                    })
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    })
                }
            )
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
}

exports.getAllProducts = (req, res, next) => {
    Product.find().then(
        (products) => {
            res.status(200).json({
                products: products
            })
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
}