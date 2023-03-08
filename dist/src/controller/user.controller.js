"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_model_1 = require("../schemas/user.model");
const blog_model_1 = require("../schemas/blog.model");
class UserController {
    static async showHomeUser(req, res) {
        const accountUser = req.decoded.name;
        const blog = await blog_model_1.Blog.find({ status: "Public" });
        res.render("user/home", { blog: blog, accountUser: accountUser });
    }
    static async addBlogPage(req, res) {
        res.render('user/addBlog');
    }
    static async addBlog(req, res) {
        let blog = new blog_model_1.Blog({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            avatar: req.file.originalname,
            date: req.body.date,
            user_id: req.decoded.user_id
        });
        console.log(blog);
        await blog.save();
        res.redirect("/user/home");
    }
    static async getBlog(req, res) {
        let user = await user_model_1.User.findById({ _id: req.decoded.user_id });
        let id = req.params.id;
        let blog = await blog_model_1.Blog.findOne({ _id: id });
        res.render('user/blog', { blog: blog, user: user });
    }
    static async getInfo(req, res) {
        let user = await user_model_1.User.findOne({ _id: req.decoded.user_id });
        res.render('user/info', { user: user });
    }
    static async editUserPage(req, res) {
        let user = await user_model_1.User.findById({ _id: req.decoded.user_id });
        res.render('user/editUser', { user: user });
    }
    static async editUser(req, res) {
        let id = req.params.id;
        console.log(req.file);
        await user_model_1.User.findOneAndUpdate({ _id: id }, {
            $set: {
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                avatar: req.file.originalname,
                description: req.body.description
            }
        });
        res.redirect('/user/info');
    }
    static async myBlog(req, res) {
        let user = await user_model_1.User.findById({ _id: req.decoded.user_id });
        let blog = await blog_model_1.Blog.find({});
        console.log(1, user);
        console.log(2, blog);
        res.render('user/myBlog', { user: user, blog: blog });
    }
    static async searchBlog1(req, res) {
        let blog = await blog_model_1.Blog.find({
            title: { $regex: req.query.keyword },
            user: req.decoded.user_id
        });
        res.status(200).json(blog);
    }
    static async deleteBlog(req, res) {
        try {
            let id = req.params.id;
            await blog_model_1.Blog.findOneAndDelete({ _id: id });
            res.redirect('/user/my-blog');
        }
        catch (e) {
            console.log(e.message);
        }
    }
    static async updateBlogPage(req, res) {
        let id = req.params.id;
        let user = await user_model_1.User.findById({ _id: req.decoded.user_id });
        let blog = await blog_model_1.Blog.findOne({ _id: id });
        res.render('user/updateBlog', { user: user, blog: blog });
    }
    static async updateBlog(req, res) {
        try {
            let id = req.params.id;
            await blog_model_1.Blog.findOneAndUpdate({ _id: id }, {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    avatar: req.file.originalname,
                    status: req.body.status,
                }
            });
            res.redirect('/user/my-blog');
        }
        catch (e) {
            console.log(e.message);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map