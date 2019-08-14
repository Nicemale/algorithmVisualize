var that;


function Dj(){
    that = this;
    this.vex=[];
    this.edge=[];
    this.vexnum=0;
    this.infinite = 999;
    this.selfDis = 0;
}
Dj.prototype = {
    self:this,

    //vertex
    clearVex:function () {
        this.vex = [];
        this.vexnum = 0;
    },
    setRandomVexNum:function () {
        this.vexnum = this.generateRandomNum(3,10);    //default: [1,10]
        console.log("this.vexnum is:"+this.vexnum);
    },
    createVex:function  ()  {
        for(var i = 0;i<this.vexnum;i++){
            this.vex[i] = "v"+i;     // vex={0,..,vexnum-1}
        }
    },
    showVexs:function () {
        if(this.vexnum == 0){
            $("#vertexWrapper").html('');
            // alert("请先指定创建节点个数");
        }else {
            for(var i = 0;i<this.vexnum;i++){
                var angle = (360/this.vexnum) * i;
                var x = 40 + Math.cos(angle * (Math.PI/180))*30;
                var y = 55 + Math.sin(angle * (Math.PI/180))*30;
                $verteies = $("#vertexWrapper").html();
                $verteies += '<div class="vertex" id="'+this.vex[i]+'" style="top: '+y+'%;left: '+x+'%">'+this.vex[i]+'</div>';
                console.log($verteies);
                $("#vertexWrapper").html($verteies);
            }
        }
    },

    //edge
    clearEdge:function () {
        this.edge = [];
    },
    initEdge:function () {
        //clear edge matrix to Infinite and 0
        for (var i = 0;i<this.vexnum;i++){
            var tempLine = [];
            for (var j = 0;j<this.vexnum;j++){
                if(i == j){
                    tempLine[j] = 0;
                }else {
                    tempLine[j] = this.infinite;
                }
            }
            this.edge[i] = tempLine;
        }
    },
    createEdge:function () {
        //Requirement: make sure the graph is a connected graph which each point have a edge at least;
        var tempLine = [];
        for (var i = 0;i<this.vexnum;i++){
            tempLine = this.edge[i];
            var degree = 0;
            for (var j = 0;j<this.vexnum;j++){
                // alert("current i,j is:"+i+j);
                var randomVex = 0;
                if (tempLine[j] != this.infinite && tempLine[j] != this.selfDis){
                    degree++;
                }else if(j==this.vexnum-1 && degree < 2){ //when current point haven't out degree then create one;  （j==this.vexnum-1 && degree == 0）
                    //make sure out degree vertex not equals current vertex
                    do {
                        randomVex++;
                    }while (randomVex == i || tempLine[randomVex]!=this.infinite);
                    var randomDis = this.generateRandomNum(1,15);
                    this.edge[i][randomVex] = this.edge[randomVex][i] = randomDis;
                    // alert( this.edge[i][randomVex]+" , "+this.edge[randomVex][i]+", randomVex is"+randomVex+",now vexnum is:"+this.vexnum);
                    degree++;
                }else if(tempLine[j] == this.infinite && this.generateRandomNum(1,100) > 30){
                    //other situations: choose randomly determin whether create a line by generate a random num that range in [0.5,1] means probability equals 0.5
                    var randomDis = this.generateRandomNum(1,15);
                    this.edge[i][j] = this.edge[j][i] = randomDis;
                    degree++;
                }
            }
            console.log("degree of line"+i+" is"+degree);
        }

    },
    showEdges:function () {
        if (this.edge.length == 0){
            $("#edgeWrapper").html('');
            // alert("请先创建边");
        }else {
            for (var i = 0;i<this.vexnum;i++){
                for(var j = 0;j<this.vexnum;j++){
                    if(i!=j && this.edge[i][j] != this.selfDis && this.edge[i][j] != this.infinite){
                        var x1 = this.getELementX(i);
                        var y1 = this.getElementY(i);
                        var x2 = this.getELementX(j);
                        var y2 = this.getElementY(j);
                        $lines = $("#edgeWrapper").html();
                        $lines += '<div class="weight" onclick="changeDis('+i+','+j+')" id="v'+i+'v'+j+'" style="left: '+(x1+(x2-x1)/2)+'px;top: '+(y1+(y2-y1)/2)+'px;">'+this.edge[i][j]+'</div>\n' +
                            '                    <svg class="lineWrap" id="v'+i+'v'+j+'">\n' +
                            '                        <line id="lv'+i+'lv'+j+'" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="red" stroke-width="2" marker-end="url(#arrow)"></line>\n' +
                            '                    </svg>';
                        $("#edgeWrapper").html($lines);
                    }
                }
            }
        }
    },
    //Dijkstra ag:
    dijkstra:function (oV) { //original vertex

        var v = oV;
        var edges = this.edge;
        var n = this.vexnum;
        var dist = [],path = [],S=[]; //S[i]=1表示顶点在S中，=0表示在U中
        var MINdis,i,j;
        var u = 0;
        for(i = 0;i<n;i++){
            dist[i] = edges[v][i];
            S[i] = 0;
            if(edges[v][i]<this.infinite){
                path[i] = v;
            }else {
                path[i] = -1;
            }
        }
        S[v] = 1;path[v] = 0;
        for(i = 0;i<n-1;i++){
            MINdis = this.infinite;
            for(j = 0;j<n;j++) {
                if (S[j] == 0 && dist[j] < MINdis) {
                    u = j;
                    MINdis = dist[j];
                }
            }
            S[u] = 1;
            for(j = 0;j<n;j++){
                if(S[j] == 0){
                    //alert(edges[u][j]);
                    if(edges[u][j] < this.infinite && dist[u]+edges[u][j]<dist[j]){
                        dist[j] = dist[u] +edges[u][j];
                        path[j] = u;
                    }
                }
            }

        }
        var k=0,d=0;
        var apath = [];
        for (i = 0;i<n;i++){
            if(S[i]==1 && i!=v){
                var title = "",pathInfo = "";
                // alert("从顶点v"+v+"到顶点v"+i+"的路径为"+dist[i]);
                console.log("从顶点v"+v+"到顶点v"+i+"的长度为"+dist[i]+"，路径为：");
                title = "从顶点v"+v+"到顶点v"+i+"的长度为"+dist[i]+"，路径为：";
                d = 0;apath[d] = i;
                k = path[i];
                if (k == -1){
                    alert("无路径");
                    console.log("无路径");
                }else {
                    while(k!=v){
                        d++;apath[d]=k;
                        k = path[k];
                    }
                    d++;
                    apath[d] = v;
                    pathInfo += "v"+apath[d]+"->";
                    // alert(apath[d]);
                    console.log(apath[d]);
                    for (j=d-1;j>=0;j--){
                        pathInfo += "v"+apath[j]+"->";
                        // alert(apath[j]);
                        console.log(","+apath[j]);
                    }
                }

                var pathArr = pathInfo.split("->");
                var rgba = that.generateRgba();
                for(var m = 0;m<pathArr.length-2;m++){
                    that.lineAnimation(pathArr[m],pathArr[m+1],rgba);
                }
                $("#textWrapper").append('<div class="textItem" style="background-color:'+rgba+'">\n' +
                    '                <div class="textItemLeft"></div>\n' +
                    '                <div class="textItemRight">\n' +
                    '                    <h5>v'+v+'至v'+i+'最短路径为'+dist[i]+'</h5>\n' +
                    '                    <span>路线为：'+pathInfo.substring(0,pathInfo.length-2)+'</span>\n' +
                    '                </div>\n' +
                    '                <div class="clearfix"></div>\n' +
                    '            </div>');
            }
        }

    },

    //Utils
    generateRgba:function () {
        var r = this.generateRandomNum(0,255);
        var g = this.generateRandomNum(0,255);
        var b = this.generateRandomNum(0,255);
        var a = this.generateRandomNum(0,255);
        return "rgb("+r+","+g+","+b+","+a+")";
    },
    lineAnimation:function (vi,vj,rgba) {
        var selector1 = "#l"+vj+"l"+vi;
        $(selector1).hide();
        $(selector1).attr("stroke",rgba).css("stroke-width",5);
        $(selector1).show(1000);
        var selector2 = "#l"+vi+"l"+vj;
        $(selector2).hide();
        $(selector2).attr("stroke",rgba).css("stroke-width",5);
        $(selector2).show(1000);
    },
    clearFront:function () {
        $("#edgeWrapper").html('');
        $("#vertexWrapper").html('');
    },
    clearGraph:function () {
          this.clearVex();
          this.clearEdge();
          this.showVexs();
          this.showEdges();
    },
    getELementX:function (val) { //val is integer value
        return this.getElementLeftOffset(this.getEleById(this.getVertex(val)));
    },
    getElementY:function (val) {
        return this.getElementTopOffset(this.getEleById(this.getVertex(val)));
    },
    getEleById:function (id) {
        return document.getElementById(id);
    },
    getElementTopOffset:function (element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    },
    getElementLeftOffset:function (element) {
        var actutalLeft = element.offsetLeft;
        var current = element.offsetParent;
        if(current != null){
            actutalLeft = current.offsetLeft;
            current = current.offsetParent;
        }
        return actutalLeft;
    },
    getVertex:function (val) { //in this.vex[], val like 1,2.. return v1,v2(id of elements)
        if(val < this.vexnum){
            return this.vex[val];
        }else {
            return -1;
        }
    },
    generateRandomNum:function (lower,upper) {
        return Math.floor(Math.random() * (upper -1) + lower);   // return [lower,upper]
    },
    addEvent:function () {
        var that = this;
        $("#clearGraphBtn").click(function () {
            that.clearGraph();
        });
        $("#clearEdge").click(function () {
            that.clearEdge();
            that.showEdges();
        });
        $("#generateEdgeRandomly").click(function () {
            that.clearEdge();
            that.showEdges();
            that.initEdge();
            that.createEdge();
            that.showEdges();
        });
        $("#generateVertex").click(function () {
            that.clearGraph();
            that.vexnum = $("#vertexAmount").val() > 0? $("#vertexAmount").val():3;
            that.createVex();
            that.showVexs();
        });
        $("#generateGraph").click(function () {
            that.clearGraph();
            that.start();
        });
        $("#dijkstra").click(function () {
            var $oV = $("#originalVertex").val().substring(1);
            that.dijkstra(parseInt($oV));
        });
    },
    printVexArr:function () {
        for (var i = 0;i<this.vex.length;i++){
            console.log("vex arr: "+this.vex[i]);
        }
    },
    printEdges:function () {
        for(var i = 0;i<this.vexnum;i++){
            for (var j = 0;j<this.vexnum;j++){
                console.log(this.edge[i][j]);
            }
        }
    },
    start:function () {
        this.addEvent();
        this.setRandomVexNum();
        this.createVex();
        this.printVexArr();
        this.showVexs();
        this.initEdge();
        this.createEdge();
        this.printEdges();
        this.showEdges();
    }

};
function changeDis(vi,vj) {
    var newDis = prompt("请输入新的权值：");
    if(newDis != null){
        that.edge[vi][vj] = that.edge[vj][vi] = newDis;
        that.clearFront();
        that.showVexs();
        that.showEdges();
    }else {
        alert("取消修改节点v"+vi+"到v"+vj+"的权值");
    }
}
var dj = new Dj();
dj.start();