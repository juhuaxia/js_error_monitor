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
            url: window.IFConfig.url + '/api/signup',
            type:'post',
            data:json,
            success:function(res){
                res = typeof res === 'string' ? JSON.parse(res) : res;
                console.log('signup success' , res);
            }
        })
    })
})