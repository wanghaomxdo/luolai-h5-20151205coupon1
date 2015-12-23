var app = app || {};

/*-- html5-template
====================================================== */
app.template = function(){};

/* loader */
app.template.loader = function(){};
app.template.loader.init= function(){
	// loader
    var getSource = function(){
        var res = [];

        res.push("images/p1/bg.png");
        res.push("images/p1/e-1.png");
        res.push("images/p1/e-2_animation/1.png");
        res.push("images/p1/e-2_animation/2.png");
        res.push("images/p1/e-2_animation/3.png");
        res.push("images/p1/e-3_animation/1.png");
        res.push("images/p1/e-3_animation/2.png");
        res.push("images/p1/e-3_animation/3.png");

        res.push("images/p7/success/e-4-e-2.png");
        res.push("images/p7/success/e-4-e-3.png");
        res.push("images/p7/success/e-4-e-4.png");

        return res;
    }

    new mo.Loader(getSource(),{
        loadType : 1,
        minTime : 300,
        onLoading : function(count,total){
            console.log('onloading:single loaded:',arguments)
            $(".loader h1").html('LOADING ('+Math.round(count/total*100)+'%)');
        },
        onComplete : function(time){
            console.log('oncomplete:all source loaded:',arguments);
            app.template.destory();
            app.template.loader.done_callback.call();
            app.template.loader.done_callback2.call();
        }
    });
};
app.template.loader.done_callback = function(){};
app.template.loader.done_callback2 = function(){};

app.template.destory = function(){
    $(".loader").remove();
};

/* Landscape */
app.template.Landscape = function(){};
app.template.Landscape.init= function(){
    var Landscape = new mo.Landscape({
        pic: 'js/motion/landscape.png',
        picZoom: 3,
        mode:'portrait',//portrait,landscape
        prefix:'Shine'
    });
};

/* pageslide swiper */
app.template.swiper = function(){};
app.template.swiper.mySwiper = {};
app.template.swiper.init = function(){
	app.template.loader.done_callback = this.bind;
};
app.template.swiper.bind = function(){
 $(".swiper-container").css("display", "block");

    app.template.swiper.mySwiper = new Swiper ('.swiper-container', {
        speed:500,
        lazyLoading : true,
        lazyLoadingInPrevNext : true,
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画 

            app.template.swiper.on_pageslideend(0);
        }, 
        onSlideChangeStart: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画

            app.template.swiper.on_pageslideend(swiper.activeIndex);
            app.template.swiper.mySwiper.lockSwipes();
        } 
    });

    app.template.swiper.lock();
};
app.template.swiper.lock = function(){
	app.template.swiper.mySwiper.lockSwipes();
};
app.template.swiper.on_pageslideend = function(index){};

app.template.swiper.next = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideNext();
};

app.template.swiper.prev = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slidePrev();
};

app.template.swiper.to = function(index){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideTo(index);
};

app.template.touch = function(){};
app.template.touch.init = function(){

    // fastclick
    FastClick.attach(document.body);

    document.body.addEventListener("touchmove", function(e) {
        //e.stopPropagation();  // 阻止事件传递
        e.preventDefault();     // 阻止浏览器默认动作(网页滚动)
    });

    $("body").on("doubleTap longTap swipeLeft swipeRight", function(e){
        // e.stopPropagation();  // 阻止事件传递
        // e.preventDefault();   // 阻止浏览器默认动作(网页滚动)
        return false;
    });
};

app.template.data = {};
app.template.data.add = function(key, value){
    app.template.data[key] = value;
};
app.template.data.get = function(key){
    return app.template.data[key];
};

/*-- tools
====================================================== */
app.tools = function(){};
app.tools.random = function(n, m){
	var c = m-n+1;  
    return Math.floor(Math.random() * c + n);
};

app.tools.getpageurlwithoutparam = function(){
    var url = window.location.href;
    return url.substring(0, url.indexOf("?"));
};

app.tools.getbaseurl = function(){
    var url = window.location.href;
    return url.substring(0, url.lastIndexOf("/") + 1);
};

app.tools.gotourl = function(url){
    window.location.href = url;
};

app.tools.geturlparam = function(param){
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) 
        return unescape(r[2]);
    else
        return undefined;
};

app.tools.substr = function(str, len){
    if(str.length > len)
        str = str.substring(0, len) + "...";

    return str;
};

app.tools.platform = function(){};
app.tools.platform.os = "";
app.tools.platform.debug = ""; // 强制开始指定os模式
app.tools.platform.init = function(){
    var u = navigator.userAgent;

    if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1)
        app.tools.platform.os = "android";
    else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
        app.tools.platform.os = "ios";

    if(app.tools.platform.debug == "ios")
        app.tools.platform.os = "ios";
    else if(app.tools.platform.debug == "android")
        app.tools.platform.os = "android";
};

/*-- audio player
====================================================== */
app.audio = function(){};
app.audio.player = undefined;
app.audio.status = "";
app.audio.init = function(){
    app.audio.player = $("#audio-player");

    $(".audio-icon").on("touchend", function(){
        if(app.audio.player[0].paused)
        {
            app.audio.play();
            $(".audio-icon").addClass("audio-icon-animation");
        }
        else
        {
            app.audio.pause();
            $(".audio-icon").removeClass("audio-icon-animation");
        }
    });

    app.template.loader.done_callback2 = app.audio.show;
};


app.audio.show = function(){
    $(".audio-icon").css({"display": "block"});
    $(".audio-icon").addClass("audio-icon-animation");
    app.audio.play();
};

app.audio.play = function(){
    app.audio.player[0].play();
    if(!app.audio.player[0].paused)
        app.audio.status = "play";
};

app.audio.pause = function(){
    app.audio.status = "pause";
    app.audio.player[0].pause();
};

app.audio.stop = function(){
    app.audio.player.attr("src", "");
    app.audio.player[0].load();
};

app.audio.changesong = function(src){
    app.audio.player.attr("src", src);
    app.audio.player[0].load();

    if(app.audio.status == "play")
       app.audio.play(); 
};

app.audio.play_tap = function(){
    if(app.audio.status == "play")
        $("#audio-player-tap")[0].play();
};

/*-- p1
====================================================== */
app.p1 = function(){};
app.p1.init = function(){
    this.show_e2_animation();
    this.show_e3_animation();
};

app.p1.bind_touch_event = function(){
    $(".p1 .e-3").on("touchend", function(){
        app.template.swiper.next();
    });
};

app.p1.show_e2_animation = function(){
    var resource = ["images/p1/e-2_animation/1.png"
                    , "images/p1/e-2_animation/2.png"
                    , "images/p1/e-2_animation/3.png"
                ];

    $('#p1-e-2').html("");
    var multiplePic = new mo.Film(document.querySelector('#p1-e-2'),{
        resource : resource,
        totalFrame : 3,
        playTime: 500
    });

    multiplePic.play(500);
};

app.p1.show_e3_animation = function(){
    var resource = ["images/p1/e-3_animation/1.png"
                    , "images/p1/e-3_animation/2.png"
                    , "images/p1/e-3_animation/3.png"
                ];

    $('#p1-e-3').html("");
    var multiplePic = new mo.Film(document.querySelector('#p1-e-3'),{
        resource : resource,
        totalFrame : 3,
        playTime: 500
    });

    multiplePic.play(500);
};

app.p1.destory = function(){  
};

/*-- p2
====================================================== */
app.p2 = function(){};
app.p2.init = function(){
};

app.p2.bind_touch_event = function(){
    $(".p2 .e-2").on("touchend", function(){
        app.p2.gonextpage("boy");
    });

    $(".p2 .e-3").on("touchend", function(){
        app.p2.gonextpage("girl");
    });


    $(".p2 .confirm").on("touchend", function(){
        $(".p2 .gamerules").hide();
        $(".p2 .e-1").show();
        app.p2.show_e2_animation();
        app.p2.show_e3_animation();
    });

};

app.p2.gonextpage = function(sex){
        app.template.data.add("sex", sex);
        app.template.swiper.next();
};



app.p2.show_e2_animation = function(){
    var resource = ["images/p2/e-2_animation/1.png"
                    , "images/p2/e-2_animation/2.png"
                ];

    $('#p2-e-2').html("");
    var multiplePic = new mo.Film(document.querySelector('#p2-e-2'),{
        resource : resource,
        totalFrame : 2,
        playTime: 500
    });

    multiplePic.play(1000);
};

app.p2.show_e3_animation = function(){
    var resource = ["images/p2/e-3_animation/1.png"
                    , "images/p2/e-3_animation/2.png"
                ];

    $('#p2-e-3').html("");
    var multiplePic = new mo.Film(document.querySelector('#p2-e-3'),{
        resource : resource,
        totalFrame : 2,
        playTime: 1000
    });

    multiplePic.play(1000);
};

app.p2.destory = function(){
    $(".p2 .gamerules").show();
    $(".p2 .e-1").hide();
};


/*-- p3
====================================================== */
app.p3 = function(){};
app.p3.init = function(){
    this.show_qrcode();
    this.add_player1();
    app.p3.check_player2_isonline();
};

app.p3.bind_touch_event = function(){
    $(".p3 .back").on("touchend", function(){
        app.template.swiper.prev();
    });
};

app.p3.show_qrcode = function(){
    app.template.data.add("openid", $OPENID);
    var url = app.tools.getbaseurl() + "player2.php?id=" + $OPENID;
    $("#qrcode").html("");
    var qrcode = new QRCode("qrcode");
    qrcode.makeCode(url);
};

app.p3.add_player1 = function(){
    $.post("db/addplayer1.php", {sex: app.template.data.get("sex")}, function(){});
};

app.p3.player2_isonline_timer = false;
app.p3.check_player2_isonline = function(){

    app.p3.player2_isonline_timer = setInterval(function(){
        $.getJSON("db/getplayer2info.php", function(data){
            var player2openid = data[0].player2openid;
            if(player2openid)
            {
                clearInterval(app.p3.player2_isonline_timer);
                app.template.swiper.next();
            }
        });

    }, 1000);

};

app.p3.destory = function(){  
};

/*-- p5
====================================================== */
app.p5 = function(){};
app.p5.init = function(){
};

app.p5.bind_touch_event = function(){
    $(".p5 .e-2").on("touchend", function(){
        app.p5.updateplayer1_thengogamepage("e-2");
    });

    $(".p5 .e-3").on("touchend", function(){
        app.p5.updateplayer1_thengogamepage("e-3");
    });

    $(".p5 .e-4").on("touchend", function(){
        app.p5.updateplayer1_thengogamepage("e-4");
    });
};

app.p5.updateplayer1_thengogamepage = function(props){
    app.audio.play_tap();
    app.template.data.add("props", props);
    $.post("db/updateplayer1.php", {props: app.template.data.get("props")}, function(){});
    
    app.template.swiper.next();
};

app.p5.destory = function(){  
};

/*-- p6
====================================================== */
app.p6 = function(){};
app.p6.init = function(){
    app.audio.stop();
    this.show_layout();
}

app.p6.bind_touch_event = function(){
    $(".p6 .confirm").on("touchend", function(){
        if(app.template.data.get("page") != "game")
        {
            app.template.data.add("page", "game");
            app.audio.play_tap();
            $(".p6 .wait-player").show();
            $(".p6 .confirm").hide();
            app.p6.check_player2_isready();
        }
    });
};

app.p6.check_player2_isready_timer = 0;
app.p6.check_player2_isready = function(){
    app.p6.check_player2_isready_timer = setInterval(function(){
        $.getJSON("db/getplayer2info.php", function(data){
            if(data[0].player2isready == "1")
            {
                clearInterval(app.p6.check_player2_isready_timer);
                app.p6.updateplayer1toready(1);
                app.template.data.add("bed", data[0].player2bed);
                $(".p6 .overlay").hide();
                app.p6.gamestart();
            }
            else
            {
                if(!app.p6.updateplayer1toread_isset)
                    app.p6.updateplayer1toready(1, "set");
            }
        });
    }, 1000);
};

app.p6.updateplayer1toread_isset = false;
app.p6.updateplayer1toready = function(isready, set){
    $.post("db/updateplayer1toready.php", {isready: isready}, function(){
        if(set)
            app.p6.updateplayer1toread_isset = true;
    });
};

app.p6.updateplayertonotready = function(){
    $.post("db/updateplayer1toready.php", {isready: 0}, function(){});
    $.post("db/updateplayer2toready.php", {isready: 0}, function(){});
};

app.p6.gamestart = function(){
    app.p6.show_shakeeffect();
    app.p6.bind_shakelistener();
    app.p6.show_countdowntimer();
    app.p6.start_shaketimer();
    app.p6.listener_updatescore();
};

app.p6.show_layout = function(){
    var sex = app.template.data.get("sex");
    $(".p6 ." + sex).css("display", "block");

    $(".props-" + sex).attr("src", "images/p6/e-2-" + app.template.data.get("props") + ".png");
};

app.p6.show_animation_film = 0;
app.p6.show_animation = function(){
    var sex = app.template.data.get("sex");
    var resource = ["images/p6/"+ sex +"/animation/1.png"
                    , "images/p6/"+ sex +"/animation/2.png"
                ];

    $('#p6-'+ sex +'-e-2').html("");
    app.p6.show_animation_film = new mo.Film(document.querySelector('#p6-'+ sex +'-e-2'),{
        resource : resource,
        totalFrame : 2,
        playTime: 500
    });

    app.p6.show_animation_film.play(500);
};

app.p6.stop_animation = function(){
    var sex = app.template.data.get("sex");
    $('#p6-'+ sex +'-e-2').html('<img src="images/p6/'+sex+'/animation/1.png" alt="">');
};

app.p6.show_countdowntimer = function(){
    // timer
    TimerJS.destory();
    TimerJS.countdowntimer.callback = app.p6.countdowntimer_done;
    TimerJS.start({container: ".countdown", 
        type: "countdowntimer",
        countdown: 0, 
        countdown_animate: "", 
        timer: 30, 
        timer_animate: ""
    });
};

app.p6.countdowntimer_done = function(){
    app.audio.stop();
    app.template.data.add("score", "30");
    app.template.data.add("result", "fail");
    app.p6.updateplayertonotready();

    window.overlay = new mo.Overlay({
        content: '<img class="disclaimerimg" src="images/p6/m-3.png" >',
        width: 480,
        height: 773
    });

    overlay.on('open', function(){
        $(".mo-pop").css({"top": "0px"});
    });

    setTimeout(function(){
        window.overlay.close();
        app.template.swiper.next();
    }, 3000);
};

app.p6.show_shakeeffect = function(){
    var sex = app.template.data.get("sex");
    $(".p6 ." + sex + " .e-4").css({"animation" : "hand_shake infinite 2s", "-webkit-animation" : "hand_shake infinite 2s"});
};

app.p6.hide_shakeeffect = function(){
    var sex = app.template.data.get("sex");
    $(".p6 ." + sex + " .e-4").css({"animation" : "", "-webkit-animation" : ""});
};

app.p6.shake = function(){};
app.p6.shaketime = 0;
app.p6.shaketimercountdown = 1;
app.p6.bind_shakelistener = function(){
    app.p6.shake = new Shake({ threshold: 15 });  
    app.p6.shake.start();
    window.addEventListener('shake', function(){
        if(app.p6.shaketime == 0)
        {
            app.audio.changesong("images/audio/slowrun.mp3");
            app.p6.show_animation();
        }

        app.p6.shaketime ++;
    }, false);
};

app.p6.removebind_shakelistener = function(){
    app.p6.shake.stop();
    app.p6.shaketime = 0;
};

// timer
app.p6.shaketimer = function(){};
app.p6.shaketimer.shaketimer = 0;
app.p6.start_shaketimer = function(){
    app.p6.shaketimer.shaketimer = setInterval(function(){
         
        if(app.p6.shaketimercountdown > 30)
            app.p6.shaketimercountdown = 29;

        app.p6.shaketimercountdown++;            


    }, 1000);
};

app.p6.stop_shaketimer = function(){
    if(app.p6.shaketimer.shaketimer)
        clearInterval(app.p6.shaketimer.shaketimer);
};

// score
app.p6.shaketimer.updatescore_timeout = 0;
app.p6.shaketimer.updatescore_interval = 0;
app.p6.listener_updatescore = function(){
    app.p6.shaketimer.updatescore_timeout = setTimeout(function(){
        app.p6.shaketimer.updatescore_interval = setInterval(function(){
            $.getJSON('db/updatescorebyplayer1.php', {shaketime: app.p6.shaketime, score: app.p6.shaketimercountdown}, function(data){
                var player1shaketime = parseInt(data[0].player1shaketime);
                var player2shaketime = parseInt(data[0].player2shaketime);
                //$("#shaketime").html("player1in:player1shaketime:" + player1shaketime + ",player2shaketime:" + player2shaketime);
                if((player1shaketime + player2shaketime) > 10 && player1shaketime > 0 && player2shaketime > 0)
                {
                    app.p6.game_win();
                }else if(player1shaketime > 3)
                {
                    app.audio.changesong("images/audio/fastrun.mp3");
                    app.p6.show_animation_film.play(100);
                }
            });
        }, 1000);
    }, 3000);
};

app.p6.removelistener_updatescore = function(){
    if(app.p6.shaketimer.updatescore_timeout)
        clearInterval(app.p6.shaketimer.updatescore_timeout);  
    if(app.p6.shaketimer.updatescore_interval)
        clearInterval(app.p6.shaketimer.updatescore_interval);
};

app.p6.game_win = function(){
    app.audio.stop();
    app.template.data.add("score", app.p6.shaketimercountdown);
    app.template.data.add("result", "success");

    window.overlay_game_win = new mo.Overlay({
        content: '<img class="disclaimerimg" src="images/p6/m-2.png" >',
        width: 480,
        height: 773
    });

    overlay_game_win.on('open', function(){
        $(".mo-pop").css({"top": "0px"});
    });

    TimerJS.destory();

    setTimeout(function(){
        window.overlay_game_win.close();

        
        app.p6.removelistener_updatescore();
        app.p6.updateplayertonotready();

        app.template.swiper.next();
    }, 3000);
};

app.p6.updateplayer1shaketime = function(){
    $.getJSON('db/updatescorebyplayer1.php', {shaketime: 0, score: 0}, function(){});
};


app.p6.destory = function(){
    app.p6.updateplayer1toread_isset = false;
    $(".p6 .wait-player").hide();
    $(".p6 .overlay").show();
    $(".p6 .confirm").show();
    $(".p6 .countdown").html("30");
    app.p6.stop_animation();
    app.p6.hide_shakeeffect();
    app.p6.removebind_shakelistener();
    app.p6.stop_shaketimer();
    app.p6.removelistener_updatescore();
    app.p6.shaketime = 0;
    app.p6.shaketimercountdown = 1;
};


/*-- p7
====================================================== */
app.p7 = function(){};
app.p7.init = function(){

    if(app.template.data.get("result") == "success")
        app.audio.changesong("images/audio/score.mp3");
    else
    {
        if(app.template.data.get("page") != "rank")
            app.audio.changesong("images/audio/main.mp3");
    }

    this.show_layout();

    app.template.data.add("page", "score");
}

app.p7.bind_touch_event = function(){
    $(".p7 .e-4").on("touchend", function(){
        app.audio.stop();
        app.tools.gotourl("http://weigou.qq.com/wkd/coupon/2712664280/1301675/collar");
        //app.tools.gotourl("https://luolaijj.tmall.com/");
    });

    $(".p7 .e-5").on("touchend", function(){
        app.template.data.add("page", "rank");
        if(app.template.data.get("result") == "success")
            app.audio.changesong("images/audio/main.mp3");
        app.template.swiper.next();
    });

    $(".p7 .e-6").on("touchend", function(){
        app.template.data.add("replay", "replay");
        app.p7.destory();
        app.p6.updateplayer1shaketime();
        if(app.template.data.get("result") == "success")
            app.audio.changesong("images/audio/main.mp3");
        app.template.swiper.to(3);
    });

    $(".p7 .e-7").on("touchend", function(){
        window.overlay = new mo.Overlay({
            content: '<img class="sharehitimg" src="images/p7/m-1.png" />',
            width: 480,
            height: 773
        });
        
        overlay.on('open', function(){
            $(".mo-pop").css({"top": "0px"});

            $('.mo-pop-wrap').on('touchend', function(){
                window.overlay.close();
            });
        });
    });
};

app.p7.show_layout = function(){
    var result = app.template.data.get("result");
    $(".p7 ." + result).css("display", "block");

    if(result == "success")
    {
        app.p7.show_successanimation();
        app.p7.set_score();
    }else{
        app.p7.show_failanimation();
    }
};

app.p7.set_score = function(){
    $.getJSON("db/getplayer2info.php", function(data){
        $(".p7 .score").html(data[0].score);
        $(".p7 .bed").attr("src", "images/p7/success/e-4-" + data[0].player2bed + ".png");
    });

};

app.p7.show_successanimation = function(){
    var resource = ["images/p7/success/e-3_animation/1.png"
                , "images/p7/success/e-3_animation/2.png"
                , "images/p7/success/e-3_animation/3.png"
                , "images/p7/success/e-3_animation/4.png"
                , "images/p7/success/e-3_animation/5.png"
                , "images/p7/success/e-3_animation/6.png"
            ];

    $('#p7-success-e-3').html("");
    var multiplePic = new mo.Film(document.querySelector('#p7-success-e-3'),{
        resource : resource,
        totalFrame : 6,
        playTime: 100
    });

    multiplePic.play(100);
};

app.p7.show_failanimation = function(){
    var resource = ["images/p7/fail/e-2_animation/1.png"
                , "images/p7/fail/e-2_animation/2.png"
            ];

    $('#p7-fail-e-2').html("");
    var multiplePic = new mo.Film(document.querySelector('#p7-fail-e-2'),{
        resource : resource,
        totalFrame : 2,
        playTime: 500
    });

    multiplePic.play(500);
};

app.p7.destory = function(){
    $(".p7 ." + app.template.data.get("result")).css("display", "none");
    $('#p7-success-e-3').html('<img src="images/p7/success/e-3_animation/1.png" alt="" class="e-3">');
    $('#p7-fail-e-2').html('<img src="images/p7/fail/e-2_animation/1.png" alt="" class="e-2">');
};

/*-- p8
====================================================== */
app.p8 = function(){};
app.p8.init = function(){
    this.set_rank();
    this.set_currentplayerrank();
}

app.p8.bind_touch_event = function(){
    $(".p8 .back").on("touchend", function(){
        app.template.swiper.prev();
    });
};

app.p8.set_rank = function(){
    $.getJSON("db/getrank.php", function(data){
        var html = "";

        var html_item_format = '<div class="rank{6}">'
                      + '<div class="icon"></div>'
                      + '<span class="no">NO.{0}</span>'
                      + '<div class="player1headimg-border"><img src="{1}" alt="" class="player1headimg"></div>'
                      + '<span class="player1nickname">{2}</span>'
                      + '<div class="player2headimg-border"><img src="{3}" alt="" class="player2headimg"></div>'
                      + '<span width="65px" class="player2nickname">{4}</span>'
                      + '<span class="score">{5}.00秒</span></div>';

        for(var i = 0; i< data.length; i++)
        {
            html += html_item_format.replace(/\{6\}/, i+1)
                                    .replace(/\{0\}/, i+1)
                                    .replace(/\{1\}/, data[i].player1headimgurl)
                                    .replace(/\{2\}/, data[i].player1nickname)
                                    .replace(/\{3\}/, data[i].player2headimgurl)
                                    .replace(/\{4\}/, data[i].player2nickname)
                                    .replace(/\{5\}/, data[i].score);
        }


        $(".rank-list").html(html);
    });
};

app.p8.set_currentplayerrank = function(){
    var url = "db/getcurrentplayerrank.php?r=" + Math.random();
    $.getJSON(url, function(data){ 
       $(".current-rank .no").html("NO." + data[0][0]);
        $(".current-rank .player1headimg").attr("src", data[0][2]);
        $(".current-rank .player1nickname").html(data[0][3]);
        $(".current-rank .player2headimg").attr("src", data[0][5]);
        $(".current-rank .player2nickname").html(data[0][6]);
        $(".current-rank .score").html(data[0][7] + ".00秒");
    });
};

/*-- for android
====================================================== */
var fuckandroid = {};
fuckandroid.app = function(){};
fuckandroid.app.p1 = function(){};
fuckandroid.app.p1.bind_touch_event = function(){
    $(".p1 .e-3").on("touchend", function(){
        // for android can't let audio autoplay
        if(app.audio.status != "pause")
        {
            app.audio.play();
        }
        app.template.swiper.next();
    });
};

/*-- page init
====================================================== */
(function(){
    app.tools.platform.init();
    // 如果开启android模式则重写响应函数用来兼容android
    if(app.tools.platform.debug == "android"
     || app.tools.platform.os == "android")
    {
        app.p1.bind_touch_event = fuckandroid.app.p1.bind_touch_event;
    }

    app.template.touch.init();
    app.template.loader.init();
    app.template.swiper.init();
    app.template.Landscape.init();
    //tracking.pv_byfrom();
    app.audio.init();
    
    /* page init */
    app.p1.bind_touch_event();
    app.p2.bind_touch_event();
    app.p3.bind_touch_event();
    app.p6.bind_touch_event();
    app.p5.bind_touch_event();
    app.p7.bind_touch_event();
    app.p8.bind_touch_event();
    

    app.template.swiper.on_pageslideend = function(index){
        switch(index)
        {
            case 0:
                app.p1.init();
                break;
            case 1:
                app.p2.init();
                break;
            case 2:
                app.p2.destory();
                app.p3.init();
                break;
            case 3:
                app.p5.init();
                break;
            case 4:
                app.p6.init();
                break;
            case 5:
                app.p6.destory();
                app.p7.init();
                break;
            case 6:
                app.p7.destory();
                app.p8.init();
                break;
        }
    };

})();

