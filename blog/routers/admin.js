
var express = require('express')
var router = express.Router()

var User = require('../models/User')
var Category = require('../models/Category')
var Content = require('../models/Content')

router.use((req, res, next) => {
    if (!req.userinfo.isAdmin) {
        res.send('对不起,您不是管理员')
        return
    }
    next()
})

router.get('/', (req, res, next) => {
    res.render('admin/index')
})

/**
 * 用户管理
 */
router.get('/user', (req, res, next) => {

    let pLimit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 2
    let pIndex = Number(req.query.page) > 0 ? Number(req.query.page) : 1

    User.count().then(count => {
        let maxPageNum = Math.ceil(count / pLimit)
        pIndex = Math.min(pIndex, maxPageNum)
        let skipNum = Math.max(pLimit * (pIndex - 1), 0)


        User.find().skip(skipNum).limit(pLimit).then(users => {
            res.render('admin/user/index', {
                users,
                count,
                pIndex,
                pLimit,
                link: '/admin/user'
            })
        })
    })
})

/** 
 * 分类首页
 */
router.get('/category', (req, res, next) => {

    let pLimit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 2
    let pIndex = Number(req.query.page) > 0 ? Number(req.query.page) : 1

    Category.count().then(count => {
        let maxPageNum = Math.ceil(count / pLimit)
        pIndex = Math.min(pIndex, maxPageNum)
        let skipNum = Math.max(pLimit * (pIndex - 1), 0)

        Category.find().skip(skipNum).limit(pLimit).then(categories => {
            res.render('admin/category/index', {
                categories,
                count,
                pIndex,
                pLimit,
                link: '/admin/category'
            })
        })
    })

})

/** 
 * 分类的添加
 */
router.get('/category/add', (req, res) => {
    res.render('admin/category/add')
})

router.post('/category/add', (req, res) => {
    var cateName = req.body.cateName || '';
    console.log(cateName)
    if (cateName === '') {
        res.render('admin/error', {
            message: '分类名称不能为空'
        });
    }

    Category.findOne({
        catename: cateName
    })
        .then(rs => {
            if (rs) {
                res.render('admin/error', {
                    message: '分类已经存在'
                })
            }
            else {
                return new Category({
                    catename: cateName
                }).save()
            }
        })
        .then(newCategory => {
            res.render('admin/success', {
                userinfo: req.userinfo,
                message: '分类保存成功',
                url: '/admin/category'
            })
        })
})

/**
 * 分类修改
 */
router.get('/category/edit', (req, res) => {

    var _id = req.query._id || ''

    Category.findOne({
        _id: _id
    })
        .then(category => {
            if (!category) {
                throw '分类信息不存在'
            }
            else {
                res.render('admin/category/edit', {
                    category: category
                })
            }
        })
        .catch(error => {
            res.render('admin/error', {
                message: error
            })
        })
})

/**
 * 分类的编辑
 */
router.post('/category/edit', (req, res) => {
    let _id = req.body._id
    let cateName = req.body.cateName

    if (!_id || !cateName) {
        res.render('admin/error', {
            message: '缺少cateName或者id字段缺失'
        })
    }
    Category.findOne({
        _id: _id
    })
        .then(category => {
            if (!category) {
                throw '找不到该分类'
            }
            else {
                if (category.catename === cateName) {
                    throw '没有做任何修改'
                }
                else {
                    return Category.update({
                        _id: _id
                    }, {
                            catename: cateName
                        })
                }
            }
        })
        .then(() => {
            res.render('admin/success', {
                message: '修改分类成功',
                url: '/admin/category'
            })
        })
        .catch(error => {
            res.render('admin/error', {
                message: error
            })
        })
})

/**
 * 分类的删除
 */
router.get('/category/delete', (req, res) => {
    var _id = req.query._id || ''
    Category.remove({
        _id: _id
    })
        .then(result => {
            if (!result) {
                res.render('admin/error', {
                    message: '删除失败请重试'
                })
            }
            else {
                res.render('admin/success', {
                    message: '删除成功',
                    url: '/admin/category'
                })
            }
        })
})

/** 
 * 内容首页
 */
router.get('/content', (req, res) => {

    let pLimit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 2
    let pIndex = Number(req.query.page) > 0 ? Number(req.query.page) : 1

    Content.count().then(count => {
        let maxPageNum = Math.ceil(count / pLimit)
        pIndex = Math.min(pIndex, maxPageNum)
        let skipNum = Math.max(pLimit * (pIndex - 1), 0)


        Content.find().skip(skipNum).populate('category')
            .populate('user').limit(pLimit).sort({
                addtime:-1
            })
            .then(contents => {
                console.log(contents)
                res.render('admin/content/index', {
                    contents,
                    count,
                    pIndex,
                    pLimit,
                    link: '/admin/content'
                })
            })
    })
})

/**
 * 内容添加页面
 */
router.get('/content/add', (req, res) => {
    Category.find().then(categories => {
        res.render('admin/content/add', {
            categories
        })
    })
})

/**
 * 内容的存储
 */
router.post('/content/add', (req, res) => {
    var { category, title, description, content } = req.body
    var user = req.userinfo._id.toString()
    verifyContentData(req.body)
        .then(() => {
            new Content({
                category,
                title,
                description,
                content,
                user
            }).save().then(rs => {
                res.render('admin/success', {
                    message: '内容保存成功',
                    url: '/admin/content'
                })
            })
        })
        .catch(error => {
            console.log(error)
            res.render('admin/error', {
                message: error
            })
        })
})

/**
 * 修改内容
 * 
 */
router.get('/content/edit', (req, res) => {
    var _id = req.query._id || '';
    Category.find().then(categories => {
        Content.findOne({
            _id: _id
        })
            .then(content => {
                console.log(content)
                if (!content) {
                    throw '该内容不存在'
                }
                else {
                    res.render('admin/content/edit', {
                        'data': content,
                        categories
                    })
                }
            })
            .catch(error => {
                console.log(error)
                res.render('admin/error', {
                    message: error
                })
            })
    })
})

/**
 * 修改内容保存
 */
router.post('/content/edit', (req, res) => {
    var { _id, category, title, description, content } = req.body;
    if (!_id) {
        res.render('admin/error', {
            message: '文章不存在'
        })
    }
    verifyContentData(req.body)
        .then(() => {
            Content.update({
                _id: _id
            }, {
                    category,
                    title,
                    description,
                    content
                })
                .then(result => {
                    if (!result) {
                        throw '修改失败,请重试'
                    }
                    if (result) {
                        res.render('admin/success', {
                            message: '修改成功',
                            url: '/admin/content'
                        })
                    }
                })
        })
        .catch(error => {
            res.render('admin/error', {
                message: error
            })
        })
})

/**
 * 内容的删除
 */
router.get('/content/delete', (req, res) => {
    var _id = req.query._id || ''
    Content.remove({
        _id
    })
        .then(result => {
            if (!result) {
                res.render('admin/error', {
                    message: '删除失败,请重试'
                })
            }
            else {
                res.render('admin/success', {
                    message: '删除成功',
                    url: '/admin/content'
                })
            }
        })
})

function verifyContentData({ category, title, description, content }) {
    return new Promise(resolve => {
        if (!category) {
            throw '分类不能为空'
        }
        if (!title) {
            throw '标题不能为空'
        }
        if (!description) {
            throw '简介不能为空'
        }
        if (!content) {
            throw '内容不能为空'
        }
        resolve(true)
    })
}




module.exports = router 