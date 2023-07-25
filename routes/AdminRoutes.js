const express = require('express');
const routes  = express.Router();
const AdminController = require('../controller/Admin')
const {isLogin} = require('../middleware/authentication');
const multer = require('multer');
const DiskStorage = require('../config/multer-configration');
const upload = multer({
    storage:DiskStorage,
    fileFilter:(req,file,cb) =>{
        cb(null , true);
    }
});

routes.get('/dashboard' ,isLogin,AdminController.DashboardsUser);

routes.get('/add-blog' ,isLogin, AdminController.getAddPost);

routes.post('/add-blog' , isLogin, upload.single('fileUpload') , AdminController.postAddBlog);

routes.get('/edit-page/:id' , isLogin , AdminController.editPage);

routes.put('/edit-page/:id' ,isLogin, AdminController.editPost);

routes.delete('/delete/:id' ,isLogin ,AdminController.delete);

module.exports = routes;

