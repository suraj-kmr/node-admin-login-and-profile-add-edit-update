const admin = require('../models/adminModel');
var sess;
module.exports = {
	index: function(req, res){
		res.render('sign-in',{error:req.flash('error'),success:req.flash('success')})
	},
	authenticate: function(req, res){
		sess = req.session;
		admin.getAdmin(req.body)
		.then(function(rows) {
			sess.user_id = rows[0].id;
			sess.username = rows[0].username;
			sess.email = rows[0].email;
			res.redirect('/dashboard');

		})
		.catch(function(error) {
			req.flash('error', 'Sorry ! Invalid usernam or password.');
			res.redirect('/');
		})
	},
	dashboard: function(req, res,next){
		sess = req.session;
		if(sess.user_id){
			res.render('dashboard',{error:req.flash('error'),success:req.flash('success'),username : sess.username,email : sess.email});
			next();
		}
		else{
			req.flash('error','You have not logged in.');
			res.redirect('/');
		}
	},
	signout: function(req, res){
		sess = req.session;
		sess.user_id = null;
		sess.username = null;
		sess.email = null;
		req.flash('success','You have log out successfully.');
		res.redirect('/');
	},
	profile: function(req, res){
		sess = req.session;
		if(sess.user_id){
			var id = sess.user_id;
			admin.getAdminById({id:id})
			.then(function(row) {
				// console.log(row[0]);
				res.render('profile',{results : row,error:req.flash('error'),success:req.flash('success'),username : sess.username,email : sess.email});

			})
			.catch(function(error) {
				req.flash('error', 'Sorry ! Please try again.');
				res.redirect('/dashboard');
			})
		}
		else{
			req.flash('error','You have not logged in.');
			res.redirect('/');
		}
	},
    updateProfile: function(req, res){
        sess = req.session;
        if(sess.user_id){
			var id = sess.user_id;
			var username = req.body.username;
			var image = req.file.filename;
			admin.updateAdminById({id:id,username:username,image:image})
			.then(function(row){
				req.flash('success','Profile updated successfully.');
				res.redirect('/profile');
			})
			.catch(function(error){
				req.flash('error', 'Sorry ! Please try again.');
				res.redirect('/dashboard');
			})
        }
        else{
	        req.flash('error','You have not logged in.');
    	    res.redirect('/');
        }
    },
    updatePassword: function(req, res){
        sess = req.session;
        if(sess.user_id){
        	var id = sess.user_id;
        	var password = req.body.new_password;
        	var conf_password = req.body.confirm_password;
        	if(password == conf_password){
        		admin.updatePassword({id:id,password:password})
        		.then(function(row) {
					req.flash('success','Password updated successfully.');
    	    		res.redirect('/profile');
				})
				.catch(function(error) {
					req.flash('error','Please try again.');
    	    		res.redirect('/profile');
					
				})
			}
			else{
				req.flash('error','You have not logged in.');
    	    	res.redirect('/profile');
			}
        }
        else{
	        req.flash('error','You have not logged in.');
    	    res.redirect('/');
        }
    }
};
