
                // 1、布局
                // 2、定义当前第几张图片和应该向什么方向运动
                // 3、将需要放置的图片根据方向放在前面或者后面
                // 4、将整个容器向左或者向右移动，
                // 5、完成后将上一次的图片删除

                // imgCon  放置所有图片的容器
                // dotList 放置小圆点列表
                // bnList  放置左右按钮的数组
                // imgList  放置所有图片的数组
                // pos是确定当前是第几个图片
                // direction 图片运行的方向
                // imgSrcList 存储轮播图图片地址的数组
                var loin_1 = document.querySelector(".loin_1");
                var loin_2 = document.querySelector(".loin_2");
                var imgCon,ul,preDot;
                var pos=0,
                    x=0,
                    bool=false,
                    autoBool=false,
                    dotList=[],
                    imgList=[],
                    bnList=[],
                    time=300,
                    imgSrcList=["./img/CN_homepage-2020-Opus.jpg","./img/CN_homepage-Pokemon-Hammerhead-True-Wireless.jpg","./img/CN_homepage-viper-ultimate.jpg","./img/CN_homepage-Huntsman-Tournament-Edition.jpg","./img/CN_homepage-2020-blade15-01.jpg"]
                    direction="";
                const WIDTH=1903;
                const HEIGHT=800;
                const SPEED=40;
                const LEFT=Symbol();
                const RIGHT=Symbol();

                init();
                /* 
                    init  初始化函数
                1、 创建轮播图的外层容器
                2、创建轮播图图片容器
                3、创建按钮列表
                4、创建小圆点列表
                5、将轮播图容器放在body中
                6、切换小圆点，因为当前是第0张，所以就会让第0个小圆点变红
                7、将小圆点容器水平居中
                8、设置时间间隔，每16毫秒执行animation函数一次，因为一秒是1000毫秒
                一秒中执行60次，就是60帧频，每次花费的时间是16.6666毫秒
                9、给外层的轮播图增加事件侦听，一个鼠标进入，一个是鼠标离开
                */
                function init(){
                    var carousel=ce("div",{
                        width:WIDTH+"px",
                        height:HEIGHT+"px",
                        position:"relative",
                        margin:"auto",
                        overflow:"hidden"
                    });
                    createImgCon(carousel);
                    createButton(carousel);
                    createDotList(carousel)
                    loin_1.appendChild(carousel);
                    
                    changeDot();
                    ul.style.left=(WIDTH-ul.offsetWidth)/2+"px";
                    
                    setInterval(animation,16);
                    
                    carousel.addEventListener("mouseenter",mouseHandler);
                    carousel.addEventListener("mouseleave",mouseHandler);
                }

                /* 
                    轮播图进入和离开的事件函数
                    1、如果进入轮播图，设置自动轮播的开关是false，就不会自动轮播
                        并且重新将计时设为300
                    2、如果离开轮播图，设置自动轮播开关是true，就会自动轮播了


                */
                function mouseHandler(e){
                    if(e.type==="mouseenter"){
                        autoBool=false;
                        time=300;
                    }else if(e.type==="mouseleave"){
                        autoBool=true;
                    }
                }

                /* 
                    创建轮播图容器和图片
                    参数 
                    parent  父容器，  元素类型  将创建好的容器和图片放在这个父容器内
                    1、创建图片容器，宽度是2张图片宽度
                    2、根据所有轮播图地址数组创建所有图片，并且放在数组imgList中
                    3、将第0张图片放在创建图片容器imgCon中
                    4、将图片容器放在轮播图容器中
                */
                function createImgCon(parent){
                    imgCon=ce("div",{
                        position:"absolute",
                        width:2*WIDTH+"px",
                        height:HEIGHT+"px",
                        left:0
                    });
                    for(var i=0;i<imgSrcList.length;i++){
                        var img=ce("img",{
                            width:WIDTH+"px",
                            height:HEIGHT+"px"
                        });
                        img.src=imgSrcList[i];
                        imgList.push(img);
                    }
                    imgCon.appendChild(imgList[0]);
                    parent.appendChild(imgCon);
                }

                /*
                    创建左右按钮
                    参数 
                    parent  父容器，  元素类型  将创建好的按钮放在这个父容器内
                    1、创建按钮地址数组
                    2、循环这个地址数组，创建所有图片，并且放置对应的位置
                    3、设置图片的地址
                    4、将按钮图片放在轮播图容器中
                    5、给左右按钮增加点击事件执行函数bnClickHandler
                */
                function createButton(parent){
                    var arr=["left","right"];
                    for(var i=0;i<arr.length;i++){
                        var img=ce("img",{
                            position:"absolute",
                            // （外容器高度-当前图片高度）/2 垂直居中
                            top:(HEIGHT-60)/2+"px",
                            // 如果是第0张图片，左边按钮，让他居左50像素，否则是none
                            left:i===0 ? "50px" : "none",
                            // 如果是第1张图片，右边按钮，让他居右50像素，否则是none
                            right:i===1 ? "50px" : "none"
                        });
                        img.src=`./img/${arr[i]}.png`;
                        parent.appendChild(img);
                        bnList.push(img);
                        img.addEventListener("click",bnClickHandler);
                    }
                }


                /* 

                    创建小圆点
                    参数 
                    parent  父容器，  元素类型  将创建好的小圆点放在这个父容器内
                    1、创建ul，设置样式
                    2、根据图片地址的数组，循环若干次，有多少图片就循环多少次创建小圆点
                    3、将每一个小圆点存在数组dotList中
                    4、将小圆点放在ul中
                    5、给ul增加点击事件，事件是点击小圆点，事件委托
                */
                function createDotList(parent){
                    ul=ce("ul",{
                        listStyle:"none",
                        margin:0,
                        padding:0,
                        position:"absolute",
                        left:"0",
                        top:"0",
                        width:"100px",
                        height:"12px",
                        margin:"0 auto"

                    });
                    for(var i=0;i<imgSrcList.length;i++){
                        var dot=ce("li",{
                            width:"10px",
                            height:"10px",
                            borderRadius:"50%",
                            backgroundColor:"#434343",
                            border: 0,
                            float:"left",
                            marginLeft:i===0 ? "0px" : "15px",
                            margin:" 0 3px 0 3px "
                        });
                        dotList.push(dot);
                        ul.appendChild(dot);
                    }
                    // dotList=Array.from(ul.children);
                    loin_2.appendChild(ul);
                    ul.addEventListener("click",dotClickHandler);
                }

                /* 
                    点击左右按钮事件函数
                    e   点击事件  MouseEvent
                    e.target 是被点击的按钮图片
                    如果bool是true，也就是当前轮播图正在播放时，点击按钮跳出，不继续执行
                    1、判断被点击图片的地址里面是否包含有left.png字符串，
                    如果有，就是点击左侧按钮，反之是右按钮
                    2、如果点击了左侧按钮，当前图片下标-1，如果小于0，
                        就让他为当前图片地址数量-1，也就是最大应该有图片下标
                    并且设置方向是向右运动
                    3、如果点击了右侧按钮，当前图片下标+1，如果大于前图片地址数量-1，
                        就让他为0，回到最开始第0张图片
                    并且设置方向是向左运动
                */
                function bnClickHandler(e){
                    if(bool) return;
                    if(e.target.src.includes("left.png")){
                        pos--;
                        if(pos<0) pos=imgSrcList.length-1;
                        direction=RIGHT;
                    }else{
                        pos++;
                        if(pos>imgSrcList.length-1) pos=0;
                        direction=LEFT;
                    }
                    createNextImg();
                }

                /* 
                    小圆点点击事件函数
                    e   鼠标事件对象  MouseEvent
                    e.target 是鼠标点击的目标
                    因为使用时事件委托，因此判断点击目标是不是li，如果不是就跳出
                    如果bool是true，也就是当前轮播图正在播放时，点击按钮跳出，不继续执行
                    1、判断点击目标是否是li，不是跳出
                    2、获取当前点击的小圆点是数组中第几个
                    3、如果当前的点击小圆点的下标和当前展示图片的下标相同时，跳出不处理
                    4、如果大于当前展示图片的下标，方向设为向左运动，反之向右
                    5、将当前点击的下标设为当前应展现图片的下标

                */
                function dotClickHandler(e){
                    if(bool) return;
                    // if(e.target.nodeName!=="LI") return;
                    if(e.target.constructor!==HTMLLIElement) return;
                    var index=dotList.indexOf(e.target);
                    if(index===pos) return;
                    direction=index>pos ? LEFT : RIGHT;
                    pos=index;
                    createNextImg();
                }


                /* 
                    创建下一张需要显示图片
                    当点击左右按钮和当点击小圆点时，触发该函数
                    1、如果方向向左运动，给图片容器尾部添加新的图片
                    2、如果方向向右运动，给图片容器的最头部添加新图片，
                    但是这时候原图被挤到后面，我们将这个容器向左挪动一个宽度位置
                    3、设置完成后，设置bool是true，这时候就打开了动画的播放开关
                    动画就可以完成播放了
                    4、切换当前小圆点

                */
                function createNextImg(){
                    // console.log(direction,pos,imgList[pos]);
                    if(direction===LEFT){
                        imgCon.appendChild(imgList[pos]);
                        x=0;
                    }else if(direction===RIGHT){
                        imgCon.insertBefore(imgList[pos],imgCon.firstElementChild);
                        imgCon.style.left=-WIDTH+"px";
                        x=-WIDTH;
                    }
                    bool=true;
                    changeDot();
                }

                /* 
                    切换小圆点
                    preDot是对上一次小圆点的引用变量
                    刚开始第一次时，没有这个引用，因此不执行，并且设置第一次设置了第0个小圆点
                    更改了第0个小圆点的背景色
                    第二次进来时，上次小圆点的引用时第0个小圆点，所以就将上次小圆点修改背景透明
                    将本次小圆点设置给这个引用，并且修改背景色
                    这样再次进入时就可以修改原来的，设置新的
                */
                function changeDot(){
                    if(preDot){
                        preDot.style.backgroundColor="#434343";
                    }
                    preDot=dotList[pos];
                    preDot.style.backgroundColor="#0f0";
                }

                /* 
                    创建元素
                    参数：
                    type   创建元素的类型  字符串
                    style  创建元素的样式  对象  使用对象方式给出所有该元素的样式
                    1、根据类型创建元素
                    2、将给入的样式设置给元素的行内样式
                    3、返回创建好的元素 

                */
                function ce(type,style){
                    var elem=document.createElement(type);
                    // ES6的方法   将后面的对象中的属性复制到前面对象中
                    Object.assign(elem.style,style);
                    return elem;
                }

                /* 
                    每16毫秒执行该函数一次
                    1、执行imgConMove这个函数，这是让图片移动方法
                    2、执行自动轮播

                */
                function animation(){
                    imgConMove();
                    autoPlay();
                }

                /* 
                    每16毫秒让图片移动一次
                    开始的时候就一直运行，因为有一个bool值判断，如果是false时，一直就不能进入
                    如果可以进入
                    1、如果方向向左
                    不断让变量x递减，每16毫秒减40像素，设置图片容器位置，图片容器就可以移动了
                    当图片容器的第一张图完全移动到最左侧以后，也就是x小于等于负的图片宽度
                    设置bool是false，16毫秒后进入时直接跳出，并且删除掉移到最左侧的图片，
                    这时候后面的图片就会补充到最前面，因此我们设置将这x为0，让整个容器向后
                    挪回初始位置
                    2、如果方向向右
                    x不断增加40像素
                    如果x大于0，表示左侧的图片已经移到中间位置，原图片移到了右侧
                    这时候停止运动，bool设为false，x设为初始的0，删除右侧的图片

                */
                function imgConMove(){
                    if(!bool) return;
                    if(direction===LEFT){
                        x-=SPEED;
                        if(x<=-WIDTH){
                            imgCon.firstElementChild.remove();
                            x=0;
                            bool=false;
                        }
                        imgCon.style.left=x+"px";
                    
                    }else if(direction===RIGHT){
                        x+=SPEED;
                        if(x>=0){
                            bool=false;
                            x=0;
                            imgCon.lastElementChild.remove();
                        }
                        imgCon.style.left=x+"px";
                    }
                }

                /* 
                    自动轮播
                    1、如果自动轮播开关是false时，跳出
                    2、time不断减少
                    3、如果time大于0就不继续执行，跳出
                    4、time值等于0，设置time初始为300
                    5、创建一个点击事件对象
                    6、向右侧按钮抛发这个点击事件

                */
                function autoPlay(){
                    if(!autoBool) return;
                    time--;
                    if(time>0)return;
                    time=200;
                    var evt=new MouseEvent("click");
                    bnList[1].dispatchEvent(evt);
                }