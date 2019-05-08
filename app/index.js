const Product = require('./models/product.js')

module.exports = function(app, passport) {

    app.get('/products', (req,res,next) => {
        Product.find().then(items => {
          res.render('products.hbs', { items })
        })
      })
      
      
      app.post("/saveItemToTheDatabase", (req,res,next) =>{
        console.log('did we make it????', req.body)
        Product.create(req.body).then(result => {
          res.redirect('products')
        })
      
      })
      
                ///details/5cc9e9a3329be1f82a23c0da
      app.get('/details/:productID', (req,res,next)=>{
        Product.findById(req.params.productID).then(item=>{
          console.log(item, 2454253)
          res.render("productDetail.hbs", { item })
        })
      })
      
      
      app.get('/delete/:id', (req, res, next)=>{
        Product.findByIdAndDelete(req.params.id).then(r=>{
          console.log(r)
          res.redirect('/products')
        }).catch(err => console.log(err) )
      })
      
      
      app.get('/edit/:id', (req, res,next) => {
        Product.findById(req.params.id).then(item=>{
          res.render("edit.hbs", { item })
        })
      })
      //http://localhost:3000/edit/5cc9ee3d420635faac3fd7df
      app.post('/edit/:id', (req, res,next) => {
        Product.findByIdAndUpdate(req.params.id, req.body).then(ifItWOrKs=>{
          res.redirect(`/details/${req.params.id}`)
        })
      })

      app.post('/product/add', (req, res, next) => {
        const newItem = new Product({name: req.body.name})
        newItem.available.push({location: req.body.location, price: req.body.price})
        newItem.save()
        .then(theNewItem => {
          console.log("the new item ====== ", theNewItem);
          res.redirect('/products');
        })
        .catch(err => { next(err) })
      })


      app.get('/locations/:storeName', (req, res, next) => {
          res.render('location', { name :req.params.storeName})
      })
}