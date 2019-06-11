const Product = require("./models/product.js");
const User = require("./models/user.js");

const uploadCloud = require("./cloudinary.js");
module.exports = function(app, passport) {
  app.get("/products", (req, res, next) => {
    Product.find().then(items => {
      res.render("products.hbs", { items });
    });
  });

  // app.post("/saveItemToTheDatabase", isLoggedIn, (req, res, next) => {
  //   console.log("did we make it????", req.body);
  //   let product = req.body;
  //   product.createdBy = req.user._id
  //   Product.create(product).then(result => {
  //     res.redirect("products");
  //   });
  // });

  // app.post("/product/add/:productID", isLoggedIn, (req, res, next)=>{
  //   Product.findById(req.params.productID).then(product=>{
  //     User.findOneAndUpdate({_id:req.user._id}, { $addToSet: { posts: product } }).then(results=>{
  //       res.redirect("/profile")
  //     })
  //   })
  // })

  ///details/5cc9e9a3329be1f82a23c0da
  app.get("/details/:productID", (req, res, next) => {
    Product.findById(req.params.productID).then(item => {
      console.log(item, 2454253);
      res.locals.myBackground = "whiteBackground "
      res.render("productDetail.hbs", { item });
    });
  });

  //http://localhost:8080/details/5cd2fdc95f4d0578a13b3e41
  app.post("/details/:productID", isLoggedIn, (req, res, next) => {
    Product.findById(req.params.productID).then(product => {
      User.findOneAndUpdate(
        { _id: req.user._id },
        { $addToSet: { likes: product } }
      ).then(results => {
        res.redirect("/profile");
      });
    });
  });

  app.get("/delete/:id", (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
      .then(r => {
        console.log(r);
        res.redirect("/products");
      })
      .catch(err => console.log(err));
  });

  app.get("/edit/:id", (req, res, next) => {
    Product.findById(req.params.id).then(item => {
      res.render("edit.hbs", { item });
    });
  });
  //http://localhost:3000/edit/5cc9ee3d420635faac3fd7df
  app.post("/edit/:id", (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body).then(ifItWOrKs => {
      res.redirect(`/details/${req.params.id}`);
    });
  });

  app.post("/product/add", isLoggedIn, uploadCloud.single("photo"), (req, res, next) => {
    console.log('does this work? ', req.body, req.file)
    if(req.file){
      var pic = req.file.url;
    }else{
       var pic = 'http://res.cloudinary.com/nathanielironhack/image/upload/v1557435860/folder-name/iphone-xs-max-gold-select-2018.png.png'
     }

  
    const newItem = new Product({ name: req.body.name });
    //if(req.body.photo) {
      newItem.available.push({
        location: req.body.location,
        price: req.body.price,
        image: pic
      });  
    /*} else {
      newItem.available.push({
        location: req.body.location,
        price: req.body.price,
        image: "/imges/techEarth.jpg"
      });
    }*/
    
    newItem.createdBy = req.user._id;

    newItem
      .save()
      .then(theNewItem => {
        console.log("the new item ====== ", theNewItem);
        User.findById(req.user._id).then(user => {
          user.posts.push(theNewItem);
          user.save();
          res.redirect("/products");

        })
      })
      .catch(err => {
        next(err);
      });
  });

  app.get("/locations/:storeName", (req, res, next) => {
    res.render("location", { name: req.params.storeName });
  });

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get("/", function(req, res) {
    res.render("index.hbs");
  });

  app.get("/about", function(req, res) {
    res.render("about.hbs");
  });

  // PROFILE SECTION =========================
  app.get("/profile", isLoggedIn, function(req, res) {
    Product.find({ createdBy: req.user._id }).then(products => {
      console.log("the products in the profile page ----------------- ", products, "================== the user   ============ ", req.user)
      res.render("profile.hbs", {
        user: req.user,
        products: products
      });
    });
  });

  //http://localhost:8080/details/5cd2fdc95f4d0578a13b3e41

  app.post("/profile", uploadCloud.single("photo"), isLoggedIn, function(
    req,
    res
  ) {
    if (!req.file) {
      return res.redirect("back");
    }
    User.findByIdAndUpdate(req.user._id, { profilePic: req.file.url }).then(
      r => {
        res.redirect("back");
      }
    );
  });

  app.post("/:id/deletelike", (req, res, next) => {
    User.findById(req.user._id).then(user => {
      user.likes.splice(user.likes.indexOf(req.params.id), 1);
      user.save();
      res.redirect("/profile");
    });
  });

  app.post("/:id/deletepost", (req, res, next) => {
    User.findById(req.user._id).then(user => {
      user.posts.splice(user.posts.indexOf(req.params.id), 1);
      user.save();
      Product.findByIdAndRemove(req.params.id).then( () => {
        res.redirect("/profile");

      })
    });
  });

  // LOGOUT ==============================
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
