#!/bin/bash
#
# 正式环境使用的web.ini应该放在本目录下。

#检查 & 过滤
base_str='No syntax errors detected in '
cur=`pwd`
cd ../src/

find . -name "*.php" | while read php_file
do
    ret=`php -l $php_file`
    msg="$base_str$php_file"

    if [ "$msg" != "$ret" ]; then
        echo $msg
        exit
    fi

    cp -R $php_file{,.bak}
    php -w $php_file.bak > $php_file
done

git clean -df

cp $cur/web.ini ./ini/web.ini

#打包
cd $cur
php phar-packer.php --name=open-sesame --path=/Users/liuxd/Documents/github.com/open-sesame/src --init=index.php

#部署
mv open-sesame.phar /Users/liuxd/Documents/web/

#恢复开发环境
cd $cur/../src/
git reset --hard
cp ini/web.ini.sample ini/web.ini

#EOF
