//const User = require('../models/user');
const Articles = require('../models/article');


module.exports.home = async function(req, res){
    //  console.log(req.cookies);
    //  res.cookie('user_id', 24);
    //let user = User.findById(req.user.id);
      

    let articles = await Articles.find({},'txtinput datetimeinput textarea catnames published');
    //console.log(articles[0]);

    return res.render('./home',{
        title: "HomePage || ThinkitToday",
        layout:"layout",
        articles:articles
    });
};

module.exports.singlepage = async function(req,res){
    console.log(req.params.id);
    //const ArticleId = req.param.id;

    // let articles = await Articles.find({},'txtinput datetimeinput textarea catnames');
    // return res.render('single_Page',{
    //     title:"SinglePage ||ThinkitToday",
    //     articles:articles
    // });
    const articleId = req.params.id;

    try {
        // Use Mongoose's findById method to fetch the article by its ID
        const article = await Articles.findById(articleId, 'txtinput datetimeinput textarea catnames');

        if (!article) {
            // Handle the case where the article is not found
            return res.status(404).send('Article not found');
        }

        return res.render('single_Page', {
            title: "SinglePage || ThinkitToday",
            article: article // Pass the retrieved article to your template
        });
    } catch (err) {
        // Handle any errors that occur during the database query
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};
