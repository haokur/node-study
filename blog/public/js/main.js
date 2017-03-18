$(function () {

    var registerBox = $('#regsiter')
    // 注册
    registerBox.find('button').on('click', () => {
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: registerBox.find('[name="username"]').val(),
                password: registerBox.find('[name="password"]').val(),
            }
        })
            .then(res => {
                if (res.code === 1) {
                    window.location.reload()
                }
            })
    })

    // 登陆
    var loginBox = $('#login')
    loginBox.find('button').on('click', () => {
        $.post('/api/user/login', {
            username: loginBox.find('[name="username"]').val(),
            password: loginBox.find('[name="password"]').val(),
        })
            .then(res => {
                if (res.code === 1) {
                    window.location.reload()
                }
            })
    })

    $('#logout').on('click', () => {
        $.post('/api/user/logout')
            .then(res => {
                if (res.code === 1) {
                    window.location.reload()
                }
            })
    })

    // 切换登陆界面
    $('#to-login').on('click', () => {
        registerBox.hide()
        loginBox.show()
    })
    // 切换登陆界面

    $('#to-regsiter').on('click', () => {
        registerBox.show()
        loginBox.hide()
    })


    // 获取评论
    new Vue({
        el: '#comment-list',
        delimiters: ['[[', ']]'],
        mounted() {
            var urlPath = window.location.pathname
            this.contentId = urlPath.split('/')[2]
            this.getCommentList()
        },
        data() {
            return {
                commentList: [],
                totalPage: 0,
                indexNow : 1,
                contentId:''
            }
        },
        methods: {
            getCommentList(pIndex = 1, pSize = 4) {
                var me = this
                $.get(`/api/commentlist/${this.contentId}/${pIndex}/${pSize}`)
                    .then(res => {
                        me.commentList = res.data.data
                        me.totalPage = Math.ceil(res.data.count / pSize)
                        console.log(me)
                    })
            },
            submitComment() {
                var me = this
                $.post('/api/commentadd', {
                    content: $('#comment-content').val(),
                    contentId: $('#content-id').val()
                })
                    .then(res => {
                        $('#comment-content').val('')
                        me.getCommentList(1)
                    })
            },
            changePage(index) {
                this.indexNow = index
                this.getCommentList(index)
            }
        }
    })


})