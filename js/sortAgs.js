/*
    Bubble sort
 */
function bubbleSort(oA){
    alert("bubbleSort start");
    var arr = oA.slice(),len=oA.length;
    for (var i = 0;i<len-1;i++){
        var isSwap = false;
        for (var j=len-1;j>i;j--){
            var letter = arr[j-1];
            if(arr[j-1]>arr[j]){
                var temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
                isSwap = true;
                letter = arr[j];
            }
            this.pushHis(arr.slice(),i-1,j-1,j);
        }
        this.pushHis(arr.slice(),i);
        if(!isSwap){
            break;
        }
    }
    return arr;
}
function bubbleSortDom(arr,a,b,c){
    var html='',len=this.arr.length,spanClass;
    for (var i = 0;i<len;i++){
        spanClass ='sort_span';
        if (i <= a){
            spanClass += ' sort_span_blue';
        }else if (i == b || i == c){
            spanClass += ' sort_span_tag';
        }
        html += "<li class='sort_li'><span class='"+spanClass+"' style='height: "+arr[i]+"%'></span></li>";
    }
    document.querySelector(".ulWrapper").innerHTML = html;
}

/*
    Insert sort
 */
function insertSort(oA){
    alert("insertSort start");
    var len=oA.length,arr=oA.slice();
    for (var i = 1;i<len;i++){
        if(arr[i]<arr[i-1]){
            var temp = arr[i];
            var j = i-1;
            do {
                arr[j+1] = arr[j];
                j--;
                this.pushHis(arr.slice(),i-1,j+1,j);
            }while(j>=0 && arr[j] > temp);
            arr[j+1] = temp;
        }
        this.pushHis(arr.slice(),i-1);
    }
    return arr;
}
function insertSortDom(arr,c,a,b){
    var len = arr.length,spanClass='',html;
    for (var i = 0;i<len;i++){
        spanClass = 'sort_span';
        if (i <= c){
            spanClass += ' sort_span_blue';
        }
        if (i == a || i == b){
            spanClass += ' sort_span_green';
        }
        html += "<li class='sort_li'><span class='"+spanClass+"' style='height: "+arr[i]+"%'></span></li>";
    }
    document.querySelector(".ulWrapper").innerHTML = html;
}

/*
    Select sort
 */
function selectSort(oriArr){
    alert("select sort start");
    var arr = oriArr.slice(),i,j,k,len=arr.length,temp;
    for (i = 0; i < len-1; i++) {
        k=i;
        temp = arr[i];
        for (j = i+1; j < len; j++) {
            if(temp>arr[j]){
                temp = arr[j];
                k = j;
            }
            this.pushHis(arr.slice(),i-1,j,k,temp);
        }
        arr[k] = arr[i];
        arr[i] = temp;
        this.pushHis(arr.slice(),i);
    }
    return arr;
}
function selectSortDom(arr,a,b,c,temp){

    var html='',item= '',spanClass='',len = arr.length,i;
    for (i = 0; i <len; i++) {

        spanClass = 'sort_span';

        if(i<=a){
            spanClass += ' sort_span_blue';
        }
        if(c == i){
            spanClass += ' sort_span_tag';
        }

        if(i == b){
            item = 	'<li class="sort_li"><span class="'+ spanClass +'" style="height: '+arr[i]+'%"></span><span class="sort_span_in" style="height:'+temp+'%"></span></li>';
        }else{
            item = '<li class="sort_li"><span class="'+ spanClass +'" style="height: '+arr[i]+'%"></span></li>';
        }
        // console.log("current "+i+" times item is : "+item);
        html= html+item;
    }
    document.querySelector('.ulWrapper').innerHTML = html;
}
/*
    Quick sort I
 */
function quickSort(arr,a,b,qArr){

    var len = arr.length,leftArr=[],rightArr=[],tag,i,k,len_l,len_r,lb,ra,temp;
    if(a == undefined && b == undefined){
        a = 0; b= arr.length-1;//初始化起始位置。
    }
    if(qArr == undefined){
        qArr = arr.slice();
    }

    if((len == 2 && arr[0] == arr[1])||len<2){
        return arr;
    }

    tag = qArr[a];

    for (i = 1; i < len;) {
        if(qArr[a+i]<=tag){
            leftArr.push(qArr[a+i]);
            qArr[a+i-1] = qArr[a+i];
            qArr[a+i] = tag;
            k = a+i;
            i++;
        }else{
            if(leftArr.length+rightArr.length == len-1){
                break;
            }
            temp = qArr[a+i];
            qArr[a+i] = qArr[b-rightArr.length];
            qArr[b-rightArr.length] = temp;
            rightArr.push(temp);
            k = a+i-1;
        }
        this.pushHis(qArr.slice(),a,b,k);
    }

    len_l = leftArr.length;
    len_r = rightArr.length;
    if(len_l== 0){
        lb = a;
    }else{
        lb = a+len_l -1;
        this.sort(leftArr,a,lb,qArr);
    }
    if(len_r == 0){
        ra = b;
    }else{
        ra = b + 1 - len_r;
        this.sort(rightArr,ra,b,qArr)
    }
    return qArr
}
function quickSortDom(arr,a,b,tag){
    var html='',item= '',len = arr.length,i;
    for (i = 0; i < len; i++) {
        spanClass = 'sort_span';
        if(a<=i && i<=b){
            spanClass += ' sort_span_blue';
        }
        if(i == tag){
            spanClass += ' sort_span_tag';
        }
        item = '<li class="sort_li"><span class="'+ spanClass +'" style="height: '+arr[i]+'%"></span></li>';
        html= html+item;
    }
    document.querySelector('.ulWrapper').innerHTML = html;
}
/*
    Quick sort II
 */
function quickSort2(arr,a,b,qArr){
    var len = arr.length,leftArr=[],rightArr=[],tag,i,j,k,temp,len_l,len_r,lb,ra;
    if(a == undefined && b == undefined){
        a = 0; b= arr.length-1;//初始化起始位置。
    }
    if(qArr == undefined){
        qArr = arr.slice();
    }
    if(len<2){
        return arr;
    }
    if(len == 2 && arr[0] == arr[1]){
        return arr;
    }
    tag = qArr[a];
    for (i = 1,k = 0; i < len;) {
        if(qArr[a+i]>=tag){
            rightArr.push(qArr[a+i]);
            i++;
        }else{
            temp = qArr[a+i];
            for(j = a+i;j>a+k;j--){

                qArr[j] = qArr[j-1];
                // this.pushHis(qArr.slice(),a,b,a+k);
            }
            qArr[a+k] = temp;
            leftArr.push(temp);
            k++;
            i++;
        }
        this.pushHis(qArr.slice(),a,b,a+k,i-1);
    }
    len_l = leftArr.length;
    len_r = rightArr.length;
    if(len_l== 0){
        lb = a;
    }else{
        lb = a+len_l -1;
        this.sort(leftArr,a,lb,qArr);
    }
    if(len_r == 0){
        ra = b;
    }else{
        ra = b + 1 - len_r;
        this.sort(rightArr,ra,b,qArr)
    }
    return qArr;
}
function quickSortDom2(arr,a,b,tag,k){
    var html='',item= '',len = arr.length,i;
    for (i = 0; i < len; i++) {
        spanClass = 'sort_span';

        if(a<=i && i<=b){
            spanClass += ' sort_span_blue';
        }
        if(i == tag){
            spanClass += ' sort_span_tag';
        }
        if(i == a+k){
            item = 	'<li class="sort_li"><span class="'+ spanClass +'" style="height: '+arr[i]+'%"></span><span class="sort_span_in" style="height:'+arr[tag]+'%"></span></li>';
        }else{
            item = '<li class="sort_li"><span class="'+ spanClass +'" style="height: '+arr[i]+'%"></span></li>';
        }
        html= html+item;
    }
    document.querySelector('.ulWrapper').innerHTML = html;
}
function mergeSort(oriArr){
    var arr=oriArr.slice(),len= arr.length,gap=1,maxgap=len-1,gapArr=[],glen,n=0;
    var that = this;
    while(gap<maxgap){
        gap = Math.pow(2,n);
        if(gap<=maxgap){
            gapArr.push(gap);
        }
        n++;
    }
    glen = gapArr.length;
    for (var i = 0; i < glen; i++) {
        gap = gapArr[i];
        for (var j = 0; j < len; j=j+gap*2) {
            s1.call(this,arr,j,j+gap*2-1,gap);//借用方法。其实是为了传递this。
        }
    }
    return arr;
}
/*
    Merge sort
 */
function s1(arr,a,b,n){
    var len = arr.length;
    var rn;//右边数组的长度。
    var n;
    if(len<2 || n == 0 || b - a + 1 == n){
        return arr;
    }
    if(b>len-1){//归并时后面一个数组的b可能超出数组。因为它是加的gap*2。这时要让这个b标识到整个数组最后一位去。
        b = len -1;
    }
    rn = b - a +1  - n;
    for (var i = a,j = a+n; n>0,i<=b,rn>0,j<=b; ) {
        if(arr[i]<arr[j]){
            i++;
            n--;
            this.pushHis(arr.slice(),i-1,j,a,b);
            continue ;
        }else{
            temp = arr[j];
            for(var k = j;k>i;k--){
                this.pushHis(arr.slice(),i,j,a,b,k,temp);
                arr[k] = arr[k-1];
            }
            arr[i] = temp;
            j++;
            i++;
            rn--;
            this.pushHis(arr.slice(),i-1,j-1,a,b);
            continue ;
        }
    }
}
function mergeSortDom(arr,a,b,c,d,tag,temp){
    var html='',item= '',len = arr.length,i;
    if(a == b){
        a = a-1;
    }
    for (i = 0; i < len; i++) {
        spanClass = 'sort_span';
        if(c<=i && i<=d){
            spanClass += ' sort_span_blue';
        }
        if(i == a || i==b){
            spanClass += ' sort_span_green';
        }
        if(tag && i == tag){
            item = 	'<li class="sort_li"><span class="'+ spanClass +'" style="height: '+arr[i]+'%"></span><span class="sort_span_in" style="height:'+temp+'%"></span></li>';
        }else{
            item = '<li class="sort_li"><span class="'+ spanClass +'" style="height: '+arr[i]+'%"></span></li>';
        }
        html= html+item;
    }
    document.querySelector('.ulWrapper').innerHTML = html;
}
/*
    Shell sort
 */
function shellSortDom(arr,a,b,c,temp,gap){
    var html='',item= '',len = arr.length,i;
    for (i = 0; i < len; i++) {
        spanClass = 'sort_span';
        if(c<=i &&((i-c)%gap == 0)){
            spanClass += ' sort_span_blue';
        }
        if(c<=i && i<= a && ((i-c)%gap == 0)){
            spanClass += ' sort_span_green';
        }
        if(i == b){
            item = 	'<li class="sort_li"><span class="'+ spanClass +'" style="height: '+arr[i]+'%"></span><span class="sort_span_in" style="height:'+temp+'%"></span></li>';
        }else{
            item = '<li class="sort_li"><span class="'+ spanClass +'" style="height: '+arr[i]+'%"></span></li>';
        }
        html= html+item;
    }
    document.querySelector('.ulWrapper').innerHTML = html;
}
function shellSort(oriArr){
    var arr =oriArr.slice(),i,k,j,len=arr.length,gap = Math.ceil(len/2),temp;
    while(gap>0){
        for (var k = 0; k < gap; k++) {
            for (i = k+gap; i < len; i=i+gap) {
                temp = arr[i];
                for (j=i-gap; j >-1; j=j-gap) {
                    if(arr[j]>temp){
                        this.pushHis(arr.slice(),i,j,k,temp,gap);
                        arr[j+gap] = arr[j];
                    }else{
                        break;
                    }
                }
                arr[j+gap] = temp;
                this.pushHis(arr.slice(),i,j+gap,k,temp,gap);
            }
        }
        gap = parseInt(gap/2);
    }
    return arr;
}

