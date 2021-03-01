//调用getUserInfo函数获取用户基本信息
$(function () {
    getUserInfo()
    
    var layer = layui.layer
    //点击按钮实现退出功能 
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空本地存储的token
            localStorage.removeItem('token')
            //重新跳转到登录页面
            location.href = '/login.html'

            //关闭confirm询问框
            layer.close(index);
        })
    })
})


//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers  请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            renderAvatar(res.data)
        },
        //不论成功或失败，最终都会调用complete回调函数
        // complete: function (res) {
        //     console.log(res);
        //     //在complete回调函数中可以使用res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清空token
        //         localStorage.removeItem('token')
        //         //强制跳转登录页面
        //         location.href='/login.html'
        //     }
        // }
    })
}
    

//渲染用户的头像
 function renderAvatar(user) {
    var name = user.nickname || user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    //按需 渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('scr', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('text-avatar').html(first).show()
    }
}
