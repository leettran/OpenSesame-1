(function() {
    var w = window, l = location;
    var url_index = '/', url_logout = '/logout/?type=3', url_list = '/appList/?';

    //列表页删除按钮
    $('.list_del_bt').each(function() {
        var value = $(this).attr('id');

        $($(this)).bind('click', function() {
            $('#pop_confirm').confirmModal({
                heading: '主人',
                body: '您想清楚了吗？',
                enter: '是的',
                close: '手抖了',
                callback: function() {
                    $('#key').attr('value', value);
                    $('#del').submit();
                }
            });
        });
    });

    //单页modify按钮
    $('.info_up_bt').each(function() {
        var key = $(this).attr('title');
        var value = $(this).attr('id');

        $($(this)).bind('click', function() {
            $('#field_name').prop('value', key);
            $('#field_value').prop('value', value).focus();
        });
    });

    //单页选择邮箱
    $('.emails').each(function() {
        var email = $(this).attr('data');

        $($(this)).bind('click', function() {
            $('#field_name').prop('value', '邮箱');
            $('#field_value').prop('value', email);
            $('#info_enter').click();
        });
    });

    //单页查看按钮
    $('.info_show_bt').each(function() {
        var value = $(this).attr('id');

        $($(this)).bind('click', function() {
            $('#pop_content').text(value);
            $('#popup').modal('show');
        });
    });

    //单页复制按钮
    $('.info_copy_bt').each(function() {
        var client = new ZeroClipboard($(this), {
            moviePath: '/static/vendor/zeroclipboard/ZeroClipboard.swf'
        });

        client.on('load', function(client) {
            client.on('complete', function(client, args) {
                $(this).text('已复制');
                $(this).attr('disabled', 'disabled');
            });
        });
    });

    //单页删除按钮
    $('.info_del_bt').each(function() {
        var value = $(this).attr('title');

        $($(this)).bind('click', function() {
            $('#pop_confirm').confirmModal({
                heading: '主人',
                body: '您三思啊！',
                enter: '删除',
                close: '我再想想',
                callback: function() {
                    $('#key').attr('value', value);
                    $('#del').submit();
                }
            });
        });
    });

    //搜索按钮
    $('#search_bt').bind('click', function() {
        var key = $('#search').val();
        var url = url_list;

        if (key) {
            url += 'key=' + key;
            l.href = url;
        }
    });

    //语音搜索
    $('#search').bind('webkitspeechchange', function() {
        var key = $('#search').val().replace(/\s+/g, "");
        var url = url_list;

        if (key) {
            url += '&key=' + key;
            l.href = url;
        }
    });

    //生成密码按钮
    $('#pwd_bt').bind('click', function() {
        var l = 14;
        var x = '23456789abcdefghijkmnpqrstuvwxyz()', s = '';
        var field_name = $('#field_name');

        for (var i = 0; i < l; i++) {
            s += x.charAt(Math.ceil(Math.random() * 100000) % x.length);
        }

        if (field_name.val() === '') {
            field_name.attr('value', '密码');
        }

        $('#field_value').prop('value', s);
        $('#info_enter').click();
    });

    //生成默认密码按钮
    $('#pwd_bt_default').bind('click', function() {
        var v = $(this).attr('data');
        $('#field_name').prop('value', '密码');
        $('#field_value').prop('value', v);
        $('#info_enter').click();
    });

    //退出按钮
    $('#logout_bt').bind('click', function() {
        $('#pop_confirm').confirmModal({
            heading: '主人',
            body: '您慢走。',
            enter: '好',
            close: '等等吧',
            callback: function() {
                $.ajax({
                    url: url_logout,
                    success: function() {
                        l.reload();
                    }
                });
            }
        });
    });

    //显示添加网站的表单
    $('#add_pull').bind('click', function() {
        $(this).hide();
        $('#add_input').slideDown();
    });

    //键盘事件
    var key_combo = [
        {
            keys: '`',
            on_keydown: function() {
                l.replace(url_index);
                ('#search').val('');
            }
        },
        {
            keys: 'enter',
            on_keydown: function() {
                $('#search_bt').click();
            }
        },
        {
            keys: 'alt w',
            on_keydown: function() {
                var url = $('#home_url').attr('href');

                if (url) {
                    w.open(url);
                }
            }
        }
    ];
    keypress.register_many(key_combo);

    //首页搜索框自动获得焦点。
    $('#search').focus();
})();
