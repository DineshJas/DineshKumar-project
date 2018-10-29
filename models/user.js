const mong=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
const UserSchmea=new mong.Schema({
	username:String,
	password:String,
	firstname:String,
	lastname:String
});
UserSchmea.plugin(passportLocalMongoose);
module.exports=mong.model("User",UserSchmea);