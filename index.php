<!--WeChat Autho
====================================================== -->
<?php 

    session_start();

    
    $_SESSION['url'] = 'http://'.$_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"];

    if(!isset($_SESSION["openid"]) && !isset($_SESSION["headimgurl"]) && !isset($_SESSION["nickname"]))
    {
        include_once 'weChat/weChatAutho.php';
    }else
    {
        // userinfo
        // echo 'openid:'.$_SESSION['openid'] . '<br />';
        // echo 'headimgurl:'.$_SESSION['img'] . '<br />';
        // echo 'nickname:'.$_SESSION['nickname'] . '<br />';
    }
    // for debug
    // $_SESSION['openid'] = 'o1zitjlK5QY7rH113wDe2f96ThUtOw';
    // $_SESSION['img'] = 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLBUibh2dXOLU3DkiblnVLNCfOb6D6ViawSD8mtPSFl86lVg59cdSIZ7u40lBLPr3ibvVc1xynrpn2U2UQ/0';
    // $_SESSION['nickname'] = 'coton_chen';


?>
<!DOCTYPE html>
<!-- <html lang="en" manifest="app.appcache"> -->
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>罗莱家纺</title>
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=480, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no">
    <link rel="stylesheet" href="js/swiper/swiper.min.css">
    <link rel="stylesheet" href="js/swiper/animate.min.css">
    <link rel="stylesheet" href="css/app.css">


    <!-- baidu tongji -->
    <script>
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "//hm.baidu.com/hm.js?1218e62d841f4b781e821a7e35fd30ce";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    </script>

</head>

<body>
<!-- loading -->
<div class="loader"><h1>LOADING ...</h1><span></span><span></span><span></span></div>

<!-- pagelist-->
<div class="swiper-container">

    <div class="swiper-wrapper">

        <div class="swiper-slide p1">
            <img src="images/p1/e-1.png" alt="" class="e-1 ani" swiper-animate-effect="slideInDown" swiper-animate-duration="0.3s" swiper-animate-delay="0s">
            <div id="p1-e-2" class="e-2 ani" swiper-animate-effect="fadeIn" swiper-animate-duration="0.2s" swiper-animate-delay="0.2s"><!-- <img src="images/p1/e-2_animation/1.png" alt=""> --></div>
            <div id="p1-e-3" class="e-3 ani" swiper-animate-effect="slideInUp" swiper-animate-duration="0.2s" swiper-animate-delay="0.4s"><!-- <img src="images/p1/e-3_animation/1.png" alt=""> --></div>
        </div>

        <div class="swiper-slide p2">
            <img src="images/p2/e-1.png" alt="" class="e-1 ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="1s">
            <div id="p2-e-2" class="e-2 ani" swiper-animate-effect="slideInLeft" swiper-animate-duration="0.2s" swiper-animate-delay="1s"><!-- <img src="images/p2/e-2_animation/1.png" alt=""> --></div>
            <div id="p2-e-3" class="e-3 ani" swiper-animate-effect="slideInRight" swiper-animate-duration="0.2s" swiper-animate-delay="1s"><!-- <img src="images/p2/e-3_animation/1.png" alt=""> --></div>
        </div>

        <div class="swiper-slide p3">
            <img src="images/transparent.png" alt="" class="back">
            <div class="qr" id="qrcode"></div>
        </div>

        <div class="swiper-slide p5">
            <img src="images/p4/e-1.png" alt="" class="e-1 ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.1s">
            <img src="images/p5/e-2.png" alt="" class="e-2 ani" swiper-animate-effect="zoomIn" swiper-animate-duration="1s" swiper-animate-delay="0.2s">
            <img src="images/p5/e-3.png" alt="" class="e-3 ani" swiper-animate-effect="slideInLeft" swiper-animate-duration="1s" swiper-animate-delay="0.4s"> 
            <img src="images/p5/e-4.png" alt="" class="e-4 ani" swiper-animate-effect="slideInRight" swiper-animate-duration="1s" swiper-animate-delay="0.4s">            
        </div>

        <div class="swiper-slide p6">
            <!-- <div id="shaketime" class="shaketime">0</div> -->
            <div class="countdown">30:00</div>
            <div class="boy">
                <img src="images/p6/boy/e-1.png" alt="" class="e-1">
                <div id="p6-boy-e-2" class="e-2"><img src="images/p6/boy/animation/1.png" alt=""></div>
                <img src="" alt="" class="e-3 props-boy"> 
                <img src="images/p6/boy/e-4.png" alt="" class="e-4">
                <img src="images/p6/boy/e-5.png" alt="" class="e-5">
            </div>

            <div class="girl">
                <img src="images/p6/girl/e-1.png" alt="" class="e-1">
                <div id="p6-girl-e-2" class="e-2"><img src="images/p6/girl/animation/1.png" alt=""></div>
                <img src="" alt="" class="e-3 props-girl"> 
                <img src="images/p6/girl/e-4.png" alt="" class="e-4">
                <img src="images/p6/girl/e-5.png" alt="" class="e-5">
            </div>

            <div class="overlay">
                <img src="images/p6/m-1.png" alt="" class="m-1">
                <img src="images/p6/confirm.png" alt="" class="confirm">
                <img src="images/p6/wait_player.png" alt="" class="wait-player">
            </div>
        </div>

        <div class="swiper-slide p7">
            <div class="success">
                <img src="images/p7/success/e-1.png" alt="" class="e-1">
                <img src="images/p7/success/e-2.png" alt="" class="e-2">
                <img src="" alt="" class="bed">
                <div id="p7-success-e-3" class="e-3"><img src="images/p7/success/e-3_animation/1.png" alt=""></div>
                <div class="score"><!-- 30.00秒 --></div>
            </div>

            <div class="fail">
                <img src="images/p7/fail/e-1.png" alt="" class="e-1">
                <div id="p7-fail-e-2" class="e-2"><img src="images/p7/fail/e-2_animation/1.png" alt=""></div>
            </div>

            <img src="images/p7/e-4-1.png" alt="" class="e-4 ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.2s">
            <img src="images/p7/e-5.png" alt="" class="e-5 ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.2s">
            <img src="images/p7/e-6.png" alt="" class="e-6 ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.2s">
            <img src="images/p7/e-7.png" alt="" class="e-7 ani" swiper-animate-effect="fadeIn" swiper-animate-duration="1s" swiper-animate-delay="0.2s">
        </div>

        <div class="swiper-slide p8">
            <img src="images/transparent.png" alt="" class="back">

            <div class="rank-list"></div>

            <div class="current-rank">
                <span class="no">NO.11</span>
                <div class="player1headimg-border"><img src="" alt="" class="player1headimg"></div>
                <span class="player1nickname">Name</span>
                <div class="player2headimg-border"><img src="" alt="" class="player2headimg"></div>
                <span width="65px" class="player2nickname">Name</span>
                <span class="score">13.00秒</span>
            </div>
        </div>

    </div>

</div>

<!-- audio -->
<div class="audio-icon">
    <audio id="audio-player" src="images/audio/main.mp3" preload="preload" loop="loop" />
    <audio id="audio-player-tap" src="images/audio/tap.mp3" preload="preload" />
    <audio id="audio-player-run" src="images/audio/slowrun.mp3" preload="preload" loop="loop" />
</div>

<!--Script
====================================================== -->
<script src="js/zepto/zepto.min.js"></script>
<script src="js/motion/loader.min.js"></script>
<script src="js/swiper/swiper.min.js"></script>
<script src="js/swiper/swiper.animate1.0.2.min.js"></script>
<script src="js/motion/landscape.min.js"></script>
<script src="js/motion/overlay.min.js"></script>
<script src="js/motion/film.min.js"></script>
<script src="js/fastclick/fastclick.js"></script>
<script src="js/qrcode/qrcode.min.js"></script>
<script src="js/timer/timer.min.js"></script>
<script src="js/shake/shake.js"></script>
<script src="tracking/tracking.js"></script>
<!--WeChat
====================================================== -->
<?php include_once 'weChat/weChatShareJS.php'; ?>
<script>
    var $OPENID = "<?php echo $_SESSION['openid'] ?>";
    var $HEADIMGURL = "<?php echo $_SESSION['img'] ?>";
    var $NICKNAME = "<?php echo $_SESSION['nickname'] ?>";
</script>
<script src="js/app.js"></script>
</body>
</html>
