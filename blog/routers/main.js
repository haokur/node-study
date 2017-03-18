
var express = require('express')
var router = express.Router()

var Category = require('../models/Category')
var Content = require('../models/Content')

var categories = []
var userinfo = {}

router.use((req, res, next) => {
    Category.find().then(cates => {
        categories = cates
        userinfo = req.userinfo
        next()
    })
})

router.get('/', (req, res) => {

    let pLimit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 2
    let pIndex = Number(req.query.page) > 0 ? Number(req.query.page) : 1
    let categoryNow = req.query.category
    let where = categoryNow ? { category: categoryNow } : {}

    Content.count().where(where).then(count => {
        let maxPageNum = Math.ceil(count / pLimit)
        pIndex = Math.min(pIndex, maxPageNum)
        let skipNum = Math.max(pLimit * (pIndex - 1), 0)

        Content.find().where(where).skip(skipNum).populate('category')
            .populate('user').limit(pLimit).sort({
                addtime: -1
            })
            .then(contents => {
                res.render('main/index', {
                    contents,
                    count,
                    pIndex,
                    pLimit,
                    categories,
                    userinfo,
                    categoryNow,
                    link: '/'
                })
            })
    })
})

/** 
 * 阅读文章详情
 */
router.get('/view/:id', (req, res) => {
    let articleId = req.params.id
    let articleContent = {}
    if (!articleId) {
        _render()
    }
    else {
        Content.findOne({
            _id: articleId
        })
            .populate('category').populate('user')
            .then(article => {
                articleContent = article
                article.views++
                article.save()
                _render()
            })
            .catch(error => {
                console.log(error)
                _render()
            })
    }

    function _render() {
        res.render('main/detail', {
            categories,
            articleContent,
            userinfo,
            articleId
        })
    }
})



module.exports = router 