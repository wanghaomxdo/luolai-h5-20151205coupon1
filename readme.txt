绑定的微信公众号开发者ID：
微信公众号：创意疯人院
AppID(应用ID) wxa63a911280d120ae
AppSecret(应用密钥) 089e7ac86d3d4f97f2de4ac75838e56c

部署url:
天猫：www.createcdigital.com/luolai-h5-20151205/index.php
微商：www.createcdigital.com/luolai-h5-20151205coupon1/index.php

部署信息：
服务器：master
目录：/usr/share/nginx/html
软件架构：Apache + Mysql + PHP


调试使用：
-- 部署：
cd /Applications/XAMPP/xamppfiles/htdocs/
tar cvf luolai-h5-20151205coupon.tar luolai-h5-20151205coupon
put /usr/share/nginx/html/luolai-h5-20151205coupon.tar /usr/share/nginx/html


-- 注册测试：
mysql -uluolai151205cp -p
luolai151205cp

use luolai151205cp;

select player1nickname, player2nickname,score from user where score != 'NULL' ;

delete from user where player1openid = 'o1zitjlK5QY7rH113wDe2f96ThUtOw';
delete from user where player1openid = 'o1zitjlK5QY7rH3wDe2f96ThUtOw';

drop table user;