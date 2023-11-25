import slugify from "slugify";
import Response from "../helpers/response.js";
import fs from "fs";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

// payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return Response(res, 404, "Name is required");
      case !price:
        return Response(res, 404, "Price is required");
      case !quantity:
        return Response(res, 404, "Quantity is required");
      case !description:
        return Response(res, 404, "Description is required");
      case !photo:
        return Response(res, 404, "Photo is required");
      case photo && photo.size > 1000000:
        return Response(res, 404, "Photo should be less than 1mb");
      case !category:
        return Response(res, 404, "Category is required");
    }

    const slug = slugify(name);
    const product = new productModel({...req.fields, slug});
    if (photo) {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
    }
    await product.save();
    return Response(res, 200, "Created Product Successfully!", product);
  } catch (error) {
    return Response(res, 500, "Failed to create Product", null, error?.message || error);
  }
};

export const getAllProductsController = async (req, res) => {
    try {
      const products = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 }); // for getting photos another API call

      return Response(res, 200, "Retrieved Products Successfully!",  { total: products?.length, products });
    } catch (error) {
      return Response(res, 500, "Failed to get all Products", null, error?.message || error);
    }
};

export const getProductController = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const product = await productModel.findById( _id ).select("-photo").populate({ path: "category" });
    return Response(res, 200, "Retrieved Product Successfully!", product);
  } catch (error) {
    return Response(res, 500, "Failed to get Product", null, error?.message || error );
  }
};

export const getProductPhotoController = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const product = await productModel.findById( _id ).select("photo");
    if (product.photo.data) {
      res.set('Content-type', product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    return Response(res, 404, "Photo not available");
  } catch (error) {
    return Response(res, 500, "Failed to get Product's photo", null, error?.message || error );
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id: _id } = req.params;
    await productModel.findByIdAndDelete(_id);
    return Response(res, 200, "Product deleted successfully!");
  } catch (error) {
    return Response(res, 500, "Failed to get Product's photo", null, error?.message || error );
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.fields;
    const { photo } = req.files;
    const { id: _id } = req.params;

    // validation
    switch (true) {
      case !name:
        return Response(res, '', "Name is required");
      case !price:
        return Response(res, '', "Price is required");
      case !quantity:
        return Response(res, '', "Quantity is required");
      case !description:
        return Response(res, '', "Description is required");
      case photo && photo.size > 1000000:
        return Response(res, '', "Photo should be less than 1mb");
      case !category:
        return Response(res, '', "Category is required");
    }

    const slug = slugify(name);
    const product = await productModel.findByIdAndUpdate( _id, { ...req.fields, slug }, { new: true } );
    if (photo) {
        product.photo.data = photo.path;
        product.photo.contentType = photo.type;
    }

    await product.save();
    return Response(res, 200, "Updated Product Successfully!", product);
  } catch (error) {
    return Response(res, 500, "Failed to update Product", null, error?.message || error);
  }
};

export const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length) {
      args.category = checked;
    }

    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const products = await productModel.find(args).exec();
    return Response(res, 200, "Products filtered successfully!", products);
  } catch (error) {
    return Response(res, 500, "Failed to filter products", null, error?.message || error );
  }
};

export const getProductCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    return Response(res, 200, "Products count retrieved successfully!", total);
  } catch (error) {
    return Response(res, 500, "Failed to get products count", null, error?.message || error );
  }
};

export const getProductListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel.find({}).select("-photo").skip( (page-1) * perPage ).limit( perPage ).sort({ createdAt:-1 });
    return Response(res, 200, "Products list retrieved successfully!", products);
  } catch (error) {
    return Response(res, 500, "Failed to get products list", null, error?.message || error );
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keywords } = req.params;
    const products = await productModel.find({$or: [
      { name:{$regex: keywords, $options:"i"} },
      { description:{$regex: keywords, $options:"i"} }
    ]}).select("-photo");

    res.json(products);

    // return Response(res, 200, "Products searched successfully!", products);
  } catch (error) {
    return Response(res, 500, "Failed to search product", null, error?.message || error );
  }
};

export const relatedProductsController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel.find({category: cid, _id: { $ne: pid }}).select("-photo").limit(4).populate({ path: "category" });
    return Response(res, 200, "Retrieved Related Product Successfully!", products);
  } catch (error) {
    return Response(res, 500, "Failed to get related Products", null, error?.message || error );
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const { id : _id } = req.params;
    const category = await categoryModel.findOne({_id});
    const products = await productModel.find({category}).select("-photo").populate({ path: "category" });
    return Response(res, 200, "Retrieved Product Successfully!", products);
  } catch (error) {
    return Response(res, 500, "Failed to get Products", null, error?.message || error );
  }
};

export const getPaymentController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function(err, response){
      if(err) Response(res, 500, "Failed to get token", null, err?.message || err );
      else {
        Response(res, 200, "Succeeded to get token", response, null );
      }
    });
  } catch (error) {
    return Response(res, 500, "Failed to get token", null, error?.message || error );
  }
};

export const makePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => total += i.price);

    let newTransaction = gateway.transaction.sale({
      amount: total,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    },
    function(err, res){
      if(res) {
        const order = new orderModel({
          products: cart,
          payment: res,
          buyer: req.user._id,
        }).save()
        res.json({ok:true});
      } else {
        Response(res, 500, "Payment failed!", null, err?.message || err);
      }
    }
    );
    return Response(res, 200, "Payment Successfully!");
  } catch (error) {
    return Response(res, 500, "Payment Failed", null, error?.message || error );
  }
};