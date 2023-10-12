const Articles = require('../models/article');
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const DOMPurify = require('dompurify')(window);

// Sanitize and save the HTML content
//const sanitizedHTML = DOMPurify.sanitize(req.body.textarea); // Assuming textarea is the rich text input



//const sanitizeHtml = require('sanitize-html');

module.exports.dashboard = function(req, res){
  if(req.isAuthenticated() && req.user.isAdmin){ // Check if the user is authenticated and has admin privileges
    req.flash('success', 'Welcome Admin');
      return res.render('admin/admin_dashboard',{
        title: "Admin Dashboard || ThinkitToday",
        layout:"admin_layout"
  });
  } else {
      return res.render('unauthorized_entry', {
          title:'Unauthorized Entry'
      });
  }
}

module.exports.addPost = (req, res) => {
  
 
  if(req.isAuthenticated() && req.user.isAdmin){ // Check if the user is authenticated and has admin privileges
    return  res.render('admin/admin_addPost',{
      title: "AddPost || ThinkitToday",
      layout:"admin_layout"
});
} else {
    return res.render('unauthorized_entry', {
        title:'Unauthorized Entry'
    });
}

};

module.exports.articleList = async (req, res) => {
  
  try{
    let articles = await Articles.find({},'txtinput datetimeinput textarea catnames published');
    if(req.isAuthenticated() && req.user.isAdmin){ // Check if the user is authenticated and has admin privileges
      return  res.render('admin/admin_articleLists',{
        title: "Post List || ThinkitToday",
        layout:"admin_layout",
        articles:articles
  
  });
  } else {
      return res.render('unauthorized_entry', {
          title:'Unauthorized Entry'
      });
  }
  } catch(err){
    console.log("Internal Error",err);
  } 

};

module.exports.artEnable = async function(req,res){
  // const published = req.query.published === 'true';
  //   try {
  //     let articles = await Article.find({},'published');
      
  //   } catch (error) {
      
  //   }
  try {
    // Fetch articles where 'published' is 'true'
    const articles = await Articles.find({ published: true });
    
    if (req.isAuthenticated()) {
      return  res.render('admin/admin_articleLists',{
        title: "Post List || ThinkitToday",
        layout:"admin_layout",
        articles:articles
  });
    } else {
      return res.render('unauthorized_entry', {
        title: 'Unauthorized Entry',
      });
    }
  } catch (error) {
    // Handle errors here
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}

module.exports.artDisable = async function(req,res){
  try {
    // Fetch articles where 'published' is 'true'
    const articles = await Articles.find({ published: false });
    
    if (req.isAuthenticated()) {
      return  res.render('admin/admin_articleLists',{
        title: "Post List || ThinkitToday",
        layout:"admin_layout",
        articles:articles
  });
    } else {
      return res.render('unauthorized_entry', {
        title: 'Unauthorized Entry',
      });
    }
  } catch (error) {
    // Handle errors here
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}


module.exports.createArticle = async function (req, res) {
  const { txtinput,datetimeinput,catnames,textarea,published} =req.body;

    // console.log("########################");
    // console.log(typeof txtinput);console.log(typeof datetimeinput);console.log(typeof catnames);console.log(typeof published);console.log(typeof textarea);
    // console.log("########################");
    // console.log(req.body);
    //To sanitize the html tags that malpractise can't be done
    // const sanitizedContent = sanitizeHtml(textarea, {
    //   allowedTags: [...sanitizeHtml.defaults.allowedTags],
    //   allowedAttributes: {},
    // });
    // Sanitize and save the HTML content
  const sanitizedHTML = DOMPurify.sanitize(req.body.textarea); // Assuming textarea is the rich text input
    // if (!txtinput || !textarea) {
    //   return res.status(400).json({ message: 'Title and content are required.' });
    // }
  
  try {
  
    const article = new Articles({
      txtinput,
      datetimeinput,
      catnames,
      published,
      // textarea: sanitizedContent,
      textarea: sanitizedHTML,
      user: req.user 
    });
    // let user = await Article.findById(req.params.id);
    // Article.uploadedPhotos(req,res,function(err){
    //   if(err){
    //     console.log("*****Multer Error",err);
    //   }
    //   console.log(req.file);
    // })
    // Save the article
    const savedArticle = 
    await article.save();
    


    //res.status(201).json({ message: 'Article saved successfully'});
    //req.flash('success', 'Articile saved in Database');
    return res.redirect('back');
    
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      res.status(400).json({ error: 'Validation failed', validationErrors });
    } else {
      // Handle other errors
      console.error('Error saving article:', error);
      req.flash('error', 'Error in saving Article');
      //res.status(500).json({ error: 'Failed to save the article' });
    }
  }
};



// module.exports.dashboard = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 24);
    
//     const viewPath = path.join(__dirname, '..', 'views', 'admin', 'admin_dashboard.ejs');
//     res.render(viewPath,{
//         title: "AddPost || ThinkitToday",
//         body:"rendered by controller",
//         layout:"admin_layout"

//     });
// } 
// module.exports.addsubadmin = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 24);
//     return res.render('admin_addSubAdmin',{
//         title: "AddSubAdmin || ThinkitToday",
//         body:"AddSubAdmin"
//     });
// } 
// module.exports.addsubcategory = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 24);
//     return res.render('admin_addSubCategory',{
//         title: "AddSubCategory || ThinkitToday",
//         body:"AddSubCategory"
//     });
// } 

// module.exports.dashboard = function(req, res){
//     // console.log(req.cookies)
//     res.cookie('user_id', 24);
    
//     // return res.render('./admin/admin_dashboard', {
//     //     title: "Dashboard || ThinkitToday",
//     //     body: "Admin Dashboard",
//     //     layout: "admin_layout"
//     // }, (err, ejs) => {
//     //     if (err) {
//     //         console.error('Error rendering page:', err);
//     //         return res.status(500).send('Error rendering page');
//     //     }
//     //     console.log('Page rendered successfully');
//     //     res.send(ejs); // Send the rendered HTML response
//     // });      
//     const viewPath = path.join(__dirname, '..', 'views', 'admin', 'admin_dashboard.ejs');
//   res.render(viewPath,{
//     title: "Dashsboard || ThinkitToday",
//     layout:"admin_layout"
//   });



// } 



// module.exports.managecategory = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 24);
//     return res.render('admin_manageCategory',{
//         title: "ManageCategory || ThinkitToday",
//         body:"ManageCategory"
//     });
// } 
// module.exports.managesubadmin = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 24);
//     return res.render('admin_manageSubAdmin',{
//         title: "ManageSubAdmin || ThinkitToday",
//         body:"ManageSubAdmin"
//     });
// } 