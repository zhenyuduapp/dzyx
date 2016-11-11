//创建游戏类
window.onload=function () {


var huanying=$(".huanying")[0]
var go=$(".go")[0]
go.onclick=function(){
    huanying.style.display="none"
    function game(){
        this.arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
   this.imgs={A:"img/a.png",
       B:"img/b.png",
       C:"img/c.png",
       D:"img/d.png",
       E:"img/e.png",
       F:"img/f.png",
       G:"img/G.png",
       H:"img/H.png",
       I:"img/I.png",
       J:"img/J.png",
       K:"img/K.png",
       L:"img/L.png",
       M:"img/M.png",
       N:"img/N.png",
       O:"img/O.png",
       P:"img/P.png",
       Q:"img/Q.png",
       R:"img/R.png",
       S:"img/S.png",
       T:"img/T.png",
       U:"img/U.png",
       V:"img/V.png",
       W:"img/W.png",
       X:"img/X.png",
       Y:"img/Y.png",
       Z:"img/Z.png"}
        this.len=4;
        this.yemianarr=[]
        this.xianshi=[]
        this.cx=document.documentElement.clientWidth
        this.cy=document.documentElement.clientHeight
        this.t
        this.speed=2
        this.life=$(".life")[0]
        this.guan=$(".guanka")[0]
        this.zongfen=$(".zongfen")[0]
        this.dangqian=$(".dangqian")[0]
        this.lifea=10
        this.guana=1
        this.zongfena=0
        this.dangqiana=0
        this.jiexian=10
        this.huanying1=$(".huanying1")[0]
        this.go1=$(".go1")[0]
        this.huanying2=$(".huanying2")[0]
        this.go2=$(".go2")[0]
    }
    game.prototype={
        play:function(){
            //创建随机字母
            // console.log(this._getrand(this.len))
            //创建随机span
            this._show( this._getrand(this.len))
            this._move()
            this._key()
        },
        _getrand:function(num){
            var newarr=[]

            for (var i = 0; i < num; i++) {

                var suiji=this.arr[Math.floor(Math.random()*this.arr.length)]
                while(this._check(suiji,this.yemianarr)){
                    suiji=this.arr[Math.floor(Math.random()*this.arr.length)]
                }
                this.yemianarr.push(suiji)
                newarr.push(suiji)
            }
            return newarr

        },
        _check:function(val,arr1){
            for (var i = 0; i < arr1.length; i++) {
                if (val==arr1[i]) {
                    return true
                };
            };
            return false
        },
        _show:function(arr){
            var newarr=[]
            for (var i = 0; i < arr.length; i++) {
                var span=document.createElement("span")
                span.innerHTML="<img src="+this.imgs[arr[i]]+">"
                span.values=arr[i]
                var lefts=100+Math.random()*(this.cx-200)
                span.lefts=lefts
                while(this._checkshow(lefts,this.xianshi)){
                    lefts=100+Math.random()*(this.cx-200)
                    span.lefts=lefts
                }
                this.xianshi.push(span)
                newarr.push(span)
                span.style.cssText="position:absolute;left:"+lefts+"px;top:"+(Math.random()*30)+"px;width:80px;height:80px;"
                document.body.appendChild(span)
            };
            return newarr
        },
        _checkshow:function(lefts,spans){
            for (var i = 0; i < spans.length; i++) {
                if(lefts>spans[i].offsetLeft-100&&lefts<spans[i].offsetLeft+100){
                    return true
                }
            };
            return false
        },
        _move:function(){
            var that=this
            that.t=setInterval(function(){
                for (var i = 0; i < that.xianshi.length; i++) {
                    var tops=that.xianshi[i].offsetTop+that.speed
                    that.xianshi[i].style.top=tops+"px"
                    if (tops>that.cy) {
                        document.body.removeChild(that.xianshi[i])
                        that.yemianarr.splice(i,1)
                        that.xianshi.splice(i,1)
                        that._show(that._getrand(1))
                        that.lifea--
                        that.life.innerHTML=that.lifea
                        if (that.lifea<=0) {
                            for (var j = 0; j < that.xianshi.length; j++) {
                                document.body.removeChild(that.xianshi[j])
                            }
                            clearInterval(that.t)
                            that.huanying1.style.display="block"
                            that.go1.onclick=function(){
                                that.huanying1.style.display="none"
                                location.reload()
                            }

                        };
                    };
                };
            },50)
        },
        _key:function(){
            var that=this
            document.onkeydown=function(e){
                var e=e||window.event
                var jianpan=String.fromCharCode(e.keyCode)
                for (var i = 0; i < that.xianshi.length; i++) {
                    if (jianpan==that.xianshi[i].values) {
                        document.body.removeChild(that.xianshi[i])
                        that.yemianarr.splice(i,1)
                        that.xianshi.splice(i,1)
                        that._show(that._getrand(1))
                        that.zongfena++
                        that.zongfen.innerHTML=that.zongfena
                        that.dangqiana++
                        that.dangqian.innerHTML=that.dangqiana
                        if (that.dangqiana>=that.jiexian) {
                            clearInterval(that.t)
                            that.huanying2.style.display="block"
                            document.onkeydown=null
                            that.go2.onclick=function(){
                                that.huanying2.style.display="none"
                                that._next()
                            }
                        };
                    }
                }
            }
        },
        _next:function(){
            var that=this
            clearInterval(that.t)
            for (var i = 0; i < that.xianshi.length; i++) {
                document.body.removeChild(that.xianshi[i])
            };
            that.guana++
            that.guan.innerHTML=that.guana
            that.dangqiana=0
            that.dangqian.innerHTML=that.dangqiana
            that.speed+=1
            if (that.speed>=5) {
                that.speed=5
            };
            that.len+=1
            if (that.len>=10) {
                that.len=10
            };
            that.jiexian+=10
            that.yemianarr=[]
            that.xianshi=[]
            that._show( that._getrand(that.len))
            that._move()
            that._key()
        }
    }
    var game=new game()
    game.play()
}
}

//**********************************************************
//对象的方法是属于谁的，方法里面的this就指向谁