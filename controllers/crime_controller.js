
module.exports.crime = function(req, res){
    console.log(req.cookies);
    res.cookie('user_id', 24);
   //let user = User.findById(req.user.id);

   return res.render('crime',{
       title: "Crime || ThinkitToday",
       layout:"layout"
       // user: user
   });
} 