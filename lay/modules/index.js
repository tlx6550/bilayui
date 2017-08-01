layui.define(['jquery','layer', 'form', 'element'], function(exports){
  var form = layui.form();
  var $ = layui.jquery;
  var element = layui.element(); 
  var device = layui.device();
  var layer = layui.layer;
  var isMobile = (device.weixin||device.android||device.ios);
  var jqIndex = function() {};
  //基础公共事件
  jqIndex.prototype.common = function(){
        //监听导航点击,阻止事件默认行为；
        $(".layui-nav").find('a').click(function(e){
            e.preventDefault();
        });

         //监听左侧导航新增tab页签
        element.on('nav(left-nav)', function(elem){
            var fromeDom   = $(elem).children('a'),
                toDom      = $(".layui-tab-title").find('li');
            if ( ! util.compareId (fromeDom,toDom ) ) {
                active.tabAdd(fromeDom);
                active.navTabChange(fromeDom);
            }else{
                active.navTabChange(fromeDom);
            }
        });


  }
  jqIndex.prototype.webOnPc = function(){
        //监听顶部导航,加载更多子菜单和加载左侧菜单
        element.on('nav(top-nav)', function(elem){
            $(".show-more-menu .layui-nav-child").removeClass("layui-show");

            action.showLeftNav();
        });

        //PC端左上角按钮事件，左侧菜单显示或者隐藏
           $('.icon-reorder').click(function(e){
                e.stopPropagation();
                var target = $('.sidebar-menu');
                action.toLeft(target,target.width());

        })
  }
  jqIndex.prototype.webOnMobile = function(){
     //左上角按钮事件
      $('.icon-reorder').click(function(e){
        e.stopPropagation();
                //展示配置菜单
         var target = $('.main-menu');
             action.showFirstMenu(target);
      })

      //监听配置菜单事件，如果点击后 隐藏或者显示配置菜单区域
            $('.main-menu').find('a').click(function(e){
                // e.stopPropagation();
                var leveA = $(this);
                var aL = leveA.next().length;
                var aPd= leveA.parent();
                if (aL == 0 ) {
                    var target = $('.main-menu');
                    action.showFirstMenu(target);
                    action.showLeftNav();
                }else if(aPd=='dd'){
                    var target = $('.main-menu');
                    action.showFirstMenu(target);
                    action.showLeftNav();
                }
            })

        //监听左侧导航新增tab页签,移动端情况点击后需要隐藏
        element.on('nav(left-nav)', function(elem){
           action.hideLeftNav();
        });

  }
  jqIndex.prototype.init = function () {
        this.common();
        if (isMobile) {
           this.webOnMobile();
        }else{
           this.webOnPc();
        }
        return this;
    }
  //基础触发事件
  var active = {
    tabAdd: function(fromeDom){
        console.log("ttt=="+this)
        var iLength = fromeDom.children('i').length;
        var title  =  iLength == 1 ? fromeDom.find('cite').text() : fromeDom.text() ;
          element.tabAdd('nav-tab-id', {
            title: title,
            content: title,
            id: fromeDom.attr('data-id') 
          })
    }
    ,
    tabDelete: function(othis){
      //删除指定Tab项
      element.tabDelete('nav-tab-id', '11'); //删除：“商品管理”
     
      othis.addClass('layui-btn-disabled');
    }
    ,tabChange: function(othis){
        var pp = othis.data('type');
      //切换到指定Tab项
      element.tabChange('nav-tab-id', 11); //切换到：用户管理
    }
    ,navTabChange: function(fromeDom){
        var index = fromeDom.data('id');
      //切换到指定Tab项
      element.tabChange('nav-tab-id', index); 
    }
    ,testthis:function(){
          var test = "888";
          console.log(test);
      }
  };
  var util ={
    compareId:function(fromeDom,toDom){
        var fromeId = fromeDom.attr('data-id');
        var hasId = false;
        toDom.each(function(){
            var toId = $(this).attr('lay-id');
            if ( toId == fromeId ) {
                hasId =  true;
                return false;
            }else{
                hasId =  false;
            }
        })
        return hasId;
    },
    //生成tab页需要生成iframe页面(次页面未使用)
    creatIfram:function(fromeDom){
      var url = fromeDom.attr("href");
      var parent = $("<div></div>");
      var child = $("<div></div>").addClass("embed-responsive embed-responsive-16by9");
      var iframe = $("<iframe></iframe>").attr("src",url);
      //var iframe = "<iframe "+ "src="+ url +">" +"</iframe>";
      var iframeParent = child.append(iframe);
      var container = parent.append(iframeParent);
      var html = container.get(0).innerHTML;
      return html;
    }
  }
  var action = {
    showFirstMenu:function(target){
      var targetDom = target;
      targetDom.slideToggle(100,'swing');
    },
    // 左侧导航收缩事件函数
    toLeft:function(targetDom,width){
      var moveDom = targetDom,
          leftWidth = width;
          // 使用data-* 后部分必须全为小写
          var toLeftFlag = moveDom.data('toleftflag');
          if (toLeftFlag==false) {
             moveDom.animate( { left: -leftWidth},100,'swing' );
             moveDom.data('toleftflag',true);
             $('#main-content').css("margin-left","10px");
          } else {
            moveDom.animate( { left: 0},100,'swing' );
            moveDom.data('toleftflag',false);
            $('#main-content').css("margin-left","220px");
          }
         
    }
    ,showLeftNav:function(){
       $('.sidebar-menu').css("left","0px");
       $('#main-content').css("margin-left","220px");
    }
    ,hideLeftNav:function(){
           $('.sidebar-menu').css("left","-220px");
           $('#main-content').css("margin-left","10px");
        }
  }
    var index = new jqIndex();
    index.init();
    //把active函数挂载到windows对象上，以便页面的子iframey页面或者祖孙页面调用
    //通过window.parent.actvie或者window.parent.parent获取
    //此方法待优化
    window.actvie = active;
    exports('index', index);
});
