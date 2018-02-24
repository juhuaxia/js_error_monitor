$(function(){
    var $userName = $('#userName'),
        $password = $('#password'),
        $submitBtn = $('#submit');

    $submitBtn.click(function(){
        var userName = $userName.val(),
            password = $password.val();
        
        var json = {
            userName: userName,
            password: password
        };

        $.ajax({
            url: window.IFConfig.url + '/api/login',
            type:'post',
            data:json,
            success:function(res){
                res = typeof res === 'string' ? JSON.parse(res) : res;
                if(res.code == 200){
                    window.location.href = 'http://127.0.0.1:3000'
                }else{
                    alert('登录失败： '+ res.code)
                }
            }
        })
    })
})