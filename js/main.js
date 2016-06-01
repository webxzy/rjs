define(['data'], function(data) {
    return function () {
        var oFooter = document.getElementById("footer"),
            aInp = oFooter.getElementsByTagName("input"),
            oList = document.getElementById("list"),
            aLink = oFooter.getElementsByTagName("a"),
            oPage = document.getElementById("page"),
            hash = window.location.hash,
            oLeft = document.getElementById("left"),
            oRight = document.getElementById("right"),
            aTitle = oLeft.getElementsByTagName("a"),
            Search = window.location.search,
            renderData = null;

        /*切换*/
        switch (Search) {
            case "":
                window.location.search = "?world"; //初始
                break;
            case "?world":
                renderData = data.data;
                aTitle[0].className = "show";
                oRight.children[0].innerHTML = "社会招聘";
                break;
            case "?shool":
                renderData = data.data2; //利用替换数据
                aTitle[1].className = "show";
                oRight.children[0].innerHTML = "校园招聘";
                break;
        }

        /*添加页码 每5条内容为一页 */
        var num = Math.ceil(renderData.length / 5);
        for (var i = 0; i < num; i++) {
            var alink = document.createElement("a");
            alink.href = "javascript:;"
            alink.innerHTML = i + 1;
            oPage.appendChild(alink);
        }

        /*内容初始化*/
        hash = hash.split("=")[1] || 1; //初始hash值
        myData(); //初始内容
        aLink[hash - 1].className = "active"; //背景色
        window.location.hash = "page=1"

        /*点击页码*/
        oPage.onclick = function(ev) {
            var Even = ev || event;
            var target = Even.target || Even.srcElement;
            if (target.nodeName === "A") { //判断被点击的是否是a元素
                oList.innerHTML = ""; //清空  
                window.location.hash = "page=" + target.innerHTML; //改变hash值
                hash = window.location.hash.split("=")[1]; //这个值是给循环使用的
                active();
                myData();
            }
        }

        /*上一页*/
        aInp[0].onclick = function() {
            oList.innerHTML = "";
            hash--;
            if (hash < 1) {
                hash = 1
            }
            window.location.hash = "page=" + hash;
            myData();
            active();
        }

        /*下一页*/
        aInp[1].onclick = function() {
            oList.innerHTML = "";
            hash++;
            if (hash > num) {
                hash = num
            };
            window.location.hash = "page=" + hash;
            myData();
            active();
        }

        /*封装初始化内容 myData*/
        function myData() {
            for (var j = (hash - 1) * 5; j < hash * 5; j++) {
                if (renderData[j]) { //因为循环条件是5个5个累加的 因此需要判断renderData还有没有 防止运行报错 
                    var cLi = document.createElement("li");
                    cLi.innerHTML = '<span>' + renderData[j].num + '</span><dl class="clearfix"><dt>职位需求：</dt><dd>' + renderData[j].type + '</dd><dt>需求人数：</dt><dd>' + renderData[j].quantity + '</dd><dt>发布日期：</dt><dd>' + renderData[j].data + '</dd></dl><p>' + renderData[j].p + '</p>';
                    oList.appendChild(cLi);
                }
            }
        }

        /*封装背景色 active*/
        function active() {
            for (var i = 0; i < aLink.length; i++) {
                aLink[i].className = "";
            }
            aLink[hash - 1].className = "active";
        }

        /*window.onhashchange = function() {
            alert(window.location.hash)
        }*/
    }
})
