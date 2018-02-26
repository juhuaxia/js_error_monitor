$(function(){
    var dayObj = createDays();
    $.ajax({
        url: window.IFConfig.url + '/api/getAllError',
        type:'post',
        // data:json,
        success:function(res){
            res = typeof res === 'string' ? JSON.parse(res) : res;
            if(res.code === 200){
                var str = createTable(res.data);
                $('#errorgrid').append(str);
                var chartData = HM2Arr(handleDataForChart(res.data));
                createChart($('.sales-chart'),chartData,dayObj.dayArr);
                var types = getTypes(res.data);
                // createTypeSelect(types);
                
            }
        }
    })


    /**
     * 
     * errorName,
        type,
        filePath,
        line,
        col,
        createTime
     */
    function createTable(data){
        var s = '<table id="visit-stat-table" class="table table-sorting table-striped table-hover datatable">';
            s += '<tr><th>错误类型</th><th>错误内容</th><th>错误文件</th><th>具体错误位置</th><th>发生时间</th></tr>'
            s += '<tbody>'
        
        for(var i=0,l=data.length;i<l;i++){
            var item = data[i];
            s += '<tr>'
                + '<td>'
                + item.type
                + '</td>'
                + '<td>'
                + item.errorName
                + '</td>'
                + '<td>'
                + item.filePath
                + '</td>'
                + '<td>'
                + '第'+item.line+'行，第'+item.col+'列'
                + '</td>'
                + '<td>'
                + timestampToTime(item.createTime)
                + '</td>'
        }
        s += '</tbody></table>'
        return s;
    }

    function timestampToTime(timestamp) {
        var date = new Date(parseInt(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
    }

    function createChart(placeholder,data,dayArr) {
        var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '本月错误汇总',
                textStyle:{
                    color:'#ff9966',
                    fontSize:18
                }
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: dayArr,
                axisLabel:{
                    color:'#ff9999',
                    align:'left'
                },
                boundaryGap:false,
                axisLine:{
                    lineStyle:{
                        color:'#fff'
                    }
                }
            },
            yAxis: {
                minInterval:1,
                axisLabel:{
                    color:'#ff9999'
                },
                axisLine:{
                    lineStyle:{
                        color:'#fff'
                    }
                }
            },
            series: [{
                name: '当天错误数量',
                type: 'line',
                data: data,
                itemStyle: {
                    // 点的颜色。
                    color: '#ffffcc'
                },
                label: {
                    show: false,
                    // 标签的文字。
                    formatter: 'This is a normal label.',
                    color:'#9999ff'
                },
                emphasis: {
                    itemStyle: {
                        // 高亮时点的颜色。
                        color: '#99ccff'
                    },
                    label: {
                        show: true,
                        // 高亮时标签的文字。
                        formatter: 'This is a emphasis label.'
                    }
                }
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        myChart.on('mouseover', function (params) {
            if (params.componentType === 'series') {
                myChart.setOption({
                    tooltip:{
                        show:true,

                    }
                })
            }
        });
    }

    function getTypes(data){
        let arr = [];
        for(var i =0,l=data.length;i<l;i++){
            arr.push(data[i].type);
        };
        return [...new Set(arr)];
    }

    function createTypeSelect(types){
        var s = '<select id="multiselect2" name="multiselect2" class="form-control" style="width:200px;margin:20px;">'

        for(var i =0,l=types.length;i<l;i++){
            var type = types[i];
            s += '<option value="'+type+'">'+type+'</option>'
        }
        s += '</select>';
        
        $('#selectbox').append(s);
    }

    /** 
     * 创建日期以及基于日期的数据
    */
    function createDays(){
        var dayArr = [],
            dayHM = {},
            i = 0;
        while(i<31){
            dayArr.push(++i + '日');
            dayHM[i.toString()] = 0;
        };
        return {
            dayArr:dayArr,
            dayHM:dayHM
        }
    }

    /** 
     * 数据转换成图表所需结构
    */
    function handleDataForChart(data){
        var hm = {
            xAxis:[],
            data:[]
        };
        var dayHM = Immutable.fromJS(dayObj.dayHM);//初始化日期数据
        var timeHM = {};
        for(var i=0,l=data.length;i<l;i++){
            var item = data[i];
            var date = parseInt(item.createTime); 
            var day = new Date(date).getDate();
            var oldValue = dayHM.get(day.toString());
            dayHM = dayHM.set(day.toString(),++oldValue);
        }
        return dayHM.toJS();
    }

    /** 
     * 对象转数组
    */
    function HM2Arr(obj){
        var arr = [];
        for(var k in obj){
            arr.push(obj[k]);
        }
        return arr;
    }
})