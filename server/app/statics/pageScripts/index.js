$(function(){
    $.ajax({
        url: window.IFConfig.url + '/api/getAllError',
        type:'post',
        // data:json,
        success:function(res){
            res = typeof res === 'string' ? JSON.parse(res) : res;
            console.log('login success' , res);
        }
    })
})