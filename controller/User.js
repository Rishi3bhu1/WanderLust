const User = require("../models/user.js");

module.exports.renderSignUp = (req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signUp = async(req,res)=>{
    try{let {username,email,password} = req.body;
    let newUser = new User({username,email});
    let registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
    if(err){
    return next(err)
    }
    req.flash("success","welcome to WanderLust");
    res.redirect("/listings")
    })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
    }

module.exports.renderLogin = (req,res)=>{
    res.render("user/login.ejs")
}

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to WanderLust");
    if(res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl);
    }else{
        res.redirect("/listings");
    }
    }

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You have successfully logged out");
        res.redirect("/listings")
    })
}