function SortAnimation(){
    this.arrHis = [];
    this.timer = '';
    this.sortName = 'bubble';
    this.sortType = {
        bubble:[bubbleSort,bubbleSortDom],
        insert:[insertSort,insertSortDom],
        select:[selectSort,selectSortDom],
        quick:[quickSort,quickSortDom],
        quick2:[quickSort2,quickSortDom2],
        merge:[mergeSort,mergeSortDom],
        shell:[shellSort,shellSortDom]
    };
    this.sort = this.sortType[this.sortName][0];
    this.sortDom = this.sortType[this.sortName][1];
    this.speed = 100;
    this.arr = [5,87,100,44,36,55,15,21,19,45,89,12,72,4,7,70,81,6,11,41,58,30,38,16,48,41,24,59,67,91,25,63,40,11,46,39,25,77,32,54,66,98,83,58,7,82,69,40,47,45,52,43,72,17,39,84,90,72,100,54,26,50,22,74,72,58,66,19,100,37,63,74,60,50,28,70,27,16,45,57,38,6,11,75,95,60,87,73,39,27,63,91,63,76,88,96,30,40,46,50,67,49,7,55,80,11,74,52,76,35,21];
    this.arrLen = 111;
    this.sortRes = [];
}


SortAnimation.prototype = {
    pushHis:function(){
        this.arrHis.push(arguments);
    },
    startAnimation:function(){
        var arrHis = this.arrHis;
        var that = this;
        this.timer = setInterval(function(){
            if(arrHis.length>0){
                console.log(arrHis[0]);
                that.sortDom(arrHis[0][0],arrHis[0][1],arrHis[0][2],arrHis[0][3],arrHis[0][4],arrHis[0][5],arrHis[0][6]);
                arrHis.shift();
            }else{
                that.initDom(that.sortRes);
                clearInterval(that.timer);
            }
        },this.speed);
    },
    changeSortType:function(arg){
        if(arg && this.sortType[arg]){
            this.sort = this.sortType[arg][0];
            this.sortDom = this.sortType[arg][1];
        }else{
            this.sort = this.sortType['bubble'][0];
            this.sortDom = this.sortType['bubble'][1];
        }
    },
    createNums:function(num){
        var arr = this.arr;
        arr.length = 0;
        // alert("num:"+num);
        this.arrLen = num || this.arrLen;
        // alert("this.arrlen:"+this.arrLen);
        for (var i = 0; i < this.arrLen; i++) {
            arr.push(this.getRandom(100));
        }
        $("textarea[name=arr]").html(JSON.stringify(arr));
        this.initDom(arr);
    },
    addEvent:function(){
        var that = this;
        $("form").click(function(event) {
            var target = event.target;
            // alert(target.id);
            var textAreaArr = $("textarea[name=arr]").val();
            // console.log(target);
            // console.log(event);
            if(target.type == 'button'){
                var id = target.id;
                if(id == 'createNums'){
                    var len = $("input[name=arrLen]").val();
                    that.createNums(len);
                    $("textarea[name=arr]").val(JSON.stringify(that.arr));
                }else if(id =='speedUp' || id == 'slowDown' || id=="pause"){
                    that.changeSpeed(id);
                }else{
                    $(".sorting_btn").removeClass('sorting_btn');
                    $(target).addClass('sorting_btn');
                    that.changeSortType(id);
                    if(textAreaArr != that.arr){
                        that.changeArr(textAreaArr);
                        that.initDom(that.arr);
                    }
                    that.arrHis.length = 0;
                    clearInterval(that.timer);
                    that.sortRes = that.sort(that.arr);
                    that.startAnimation();
                }

            }
        });
    },
    changeArr:function(modifyedArr){
        this.arr = [];
        // alert("modifyedArr"+modifyedArr);
        var strArr = modifyedArr.substring(1,modifyedArr.length-2).split(",");
        for(var i = 0;i<strArr.length;i++){
            this.arr.push(parseInt(strArr[i]));
        }
    },
    changeSpeed:function(id){
        if (id == "pause"){
            clearInterval(this.timer);
        }else {
            if(id == 'speedUp'){
                if(this.speed >=40){
                    this.speed = this.speed - 30;
                }else{
                    return;
                }
            }
            if(id == 'slowDown'){
                if(this.speed < 500){
                    this.speed = this.speed + 30;
                }else{
                    return;
                }
            }
            clearInterval(this.timer);
            this.startAnimation();
        }
    },
    init:function(){
        this.addEvent();
        this.initDom(this.arr);
    },
    initDom:function(arr){
        arr = arr || [];
        var html='',item= '',spanClass='',len = arr.length,i;
        for (i = 0; i <len; i++) {
            item = 	'<li class="sort_li"><span class="sort_span" style="height: '+arr[i]+'%"></span></li>';
            html= html+item;
        }
        document.querySelector('.ulWrapper').innerHTML = html;
    },
    getRandom:function(n){
        return Math.floor(Math.random()*n+1);
    }

};

var s = new SortAnimation();
s.init();

