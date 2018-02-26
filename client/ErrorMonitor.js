window.onerror = function(a,b,c,d,e){
    e = e || {stack:'',message:'未捕获到错误'}
    var IFurl = 'http://127.0.0.1:3000'

    var reg = /\w*(?=:)/;
    var str = e.stack;
    var type = str.match(reg);
    var json = {
        errorName: e.message,
        filePath: b,
        line: c,
        col: d,
        type:type
    }
    var queryStr = '';
    for(var k in json){
        queryStr += k + '=' + json[k] + '&';
    }
    var url = IFurl + '/api/addError' + '?' + queryStr;
    var img = new Image();
    img.onload = img.onerror = function(){
        img = null;
    };
    img.src = url;
}