
var express = require('express')
var router = express.Router()
var User = require('../models/User')
var Comment = require('../models/Comment')

/**
 * 统一返回格式
 */
var responseData
router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    }
    next()
})
/**
 * 用户注册
 * 1.用户密码不能为空
 * 2.用户名是否已经被注册(需数据库查询)
 */
router.post('/user/register', (req, res, next) => {
    let { username, password } = req.body
    checkData(username, password)
        .then(result => {
            User.findOne({
                username: username
            })
                .then(userinfo => {
                    if (userinfo) {
                        handlerErr(res, '用户名已经被注册')
                        return
                    }
                    var user = new User({
                        username,
                        password
                    })
                    return user.save()
                })
                .then((userinfo) => {
                    req.cookies.set('userinfo', JSON.stringify({
                        _id: userinfo._id,
                        username: userinfo.username,
                    }))
                    handleSucc(res, '注册成功')
                })
        })
        .catch(err => handlerErr(res, err))
})

/**
 * 用户登陆
 */
router.post('/user/login', (req, res) => {
    let { username, password } = req.body
    checkData(username, password)
        .then(result => {
            User.findOne({
                username,
                password
            })
                .then(userinfo => {
                    if (!userinfo) {
                        handlerErr(res, '用户名或密码错误')
                        return
                    }
                    req.cookies.set('userinfo', JSON.stringify({
                        _id: userinfo._id,
                        username: userinfo.username,
                    }))
                    handleSucc(res, '登陆成功', {
                        username: userinfo.username
                    })
                })
        })
        .catch(err => handlerErr(res, err))
})

/**
 * 退出登陆
 */
router.post('/user/logout', (req, res) => {
    req.cookies.set('userinfo', null)
    handleSucc(res, '退出成功')
})


/**
 * 获取评论
 */
router.get('/commentlist/:id/:page/:limit', (req, res) => {

    let pLimit = Number(req.params.limit) > 0 ? Number(req.params.limit) : 2
    let pIndex = Number(req.params.page) > 0 ? Number(req.params.page) : 1
    let contentId = req.params.id

    if (!pIndex) {
        handlerErr(res,'缺少文章id')
    }
    else {
        let where = { contentid: contentId }
        Comment.count().where(where)
            .then(count => {
                if (count > 0) {
                    let maxPageNum = Math.ceil(count / pLimit)
                    pIndex = Math.min(pIndex, maxPageNum)
                    let skipNum = Math.max(pLimit * (pIndex - 1), 0)

                    Comment.find().where(where).skip(skipNum).populate('user')
                        .sort({
                            addtime: -1
                        })
                        .limit(pLimit)
                        .then(data => {
                            handleSucc(res, '获取评论成功', {
                                data: data,
                                count
                            })
                        })
                }
                else {
                    handleSucc(res, '获取评论成功', {
                        data: []
                    })
                }
            })
            .catch(error => {
                handlerErr(res,'服务器错误')
            })
    }
})

/**
 * 添加评论
 */
router.post('/commentadd', (req, res) => {
    var userId = req.userinfo._id
    var { contentId, content } = req.body

    if (!content || !contentId) {
        handlerErr(res,'评论字段缺失')
    }
    else {
        new Comment({
            content,
            contentid: contentId,
            user: userId
        }).save()
            .then(result => {
                if (result) {
                    handleSucc(res, '添加评论成功', {
                        data: ''
                    })
                }
            })
            .catch(error => {
                handlerErr(res,'服务器错误')
            })
    }
})

/**
 * 检验数据是否合法
 */
function checkData(username, password) {
    return new Promise(resolve => {
        if (!username) {
            throw '用户名不能为空'
        }
        if (!password) {
            throw '密码不能为空'
        }
        resolve(true)
    })
}

/**
 * 错误处理
 */
function handlerErr(res, err) {
    responseData = {
        code: 4,
        message: err
    }
    res.json(responseData)
}

/**
 * 正确反馈
 */
function handleSucc(res, result, data = {}) {
    responseData = {
        code: 1,
        message: result,
        data: data
    }
    res.json(responseData)
}

module.exports = router 