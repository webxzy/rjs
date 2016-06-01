/**
 * @file tip
 * @desc 消息提示
 * @author HI:fanxiaopeng
 */

define([
    'jquery'
], function ($) {
    /**
     * tipType success  fail info
     * @type {Object}
     */
    var defaults = {
        appendTo: 'body',
        position: 'fixed',
        top: '50%',
        left: '50%',
        opacity: 0.5,
        zIndex: 999999,
        message: '',
        tipType: 'success',
        time: 2000,
        okCallback: null
    };

    function closeEvents($tip, time, tipType) {
        var time = time ? time : 10000;
        if (tipType === 'info') {
            $tip.find('.close, .dialog-cancel-btn').on('click', function () {
                $tip.fadeOut(0, function () {
                    $tip.remove();
                    if (typeof defaults.okCallback === 'function') {
                        defaults.okCallback = null;
                    }
                });
                $('.overlay').fadeOut(0);
            });
            $tip.find('.dialog-ok-btn').on('click', function () {
                $tip.fadeOut(0, function () {
                    $tip.remove();
                    if (typeof defaults.okCallback === 'function') {
                        defaults.okCallback();
                        defaults.okCallback = null;
                    }
                });
                $('.overlay').fadeOut(0);
            });
        }
        else {
            setTimeout(function () {
                $tip.fadeOut(function () {
                    $tip.remove();
                });
            }, time);
        }
    }

    function initDialog(opts) {
        $.extend(defaults, opts);
        var $infoTip = $('.tip-pop');
        var tipTmpl = [];
        if ($infoTip.length) {
            $infoTip.remove();
        }
        if (defaults.tipType === 'info') {
            if (document.getElementsByClassName('overlay')[0]) {
                // 添加遮罩
                $('.overlay').fadeTo(200, defaults.opacity);
            } else {
                var overlayStr = '<div class="overlay"></div>';
                $('body').append(overlayStr);
                $('.overlay').fadeTo(200, defaults.opacity);
            }
            tipTmpl = ['<div class="info-tip tip-pop box-shadow-popup">' +
                '<div class="dialog-header">' + defaults.title +
                    '<span class="close">×</span>' +
                '</div>' +
                '<div class="clearfix p t-l">' +
                    '<p class="text"><span class="display-block pd10">' + defaults.message + '</span></p>' +
                '</div>' +
                '<div class="dialog-footer mb-20 t-r mr-20">' +
                    '<a class="confirm-btn-low dialog-ok-btn" href="javascript:;">确定</a>' +
                '</div>' +
                '</div>'
            ];

            if (typeof defaults.okCallback === 'function') {
                tipTmpl = ['<div class="info-tip tip-pop box-shadow-popup">' +
                    '<div class="dialog-header">' + defaults.title +
                        '<span class="close">×</span>' +
                    '</div>' +
                    '<div class="clearfix p t-l">' +
                        '<p class="text"><span class="display-block pd10">' + defaults.message + '</span></p>' +
                    '</div>' +
                    '<div class="dialog-footer mb-20 t-r">' +
                        '<a class="confirm-btn-low dialog-ok-btn mr-10" href="javascript:;">确定</a>' +
                        '<a class="cancel-btn-low dialog-cancel-btn mr-20" href="javascript:;">取消</a>' +
                    '</div>' +
                    '</div>'
                ];
            }
        }
        else {
            // 小提示窗口
            tipTmpl = ['<div class="info-tip tip-pop box-shadow">' +
                '<div class="clearfix p">' +
                    '<p class="text"><span class="icon icon_' + defaults.tipType +
                    '"></span><span>' + defaults.message + '</span></p>' +
                    '</div>' +
                '</div>'
            ];
        }
        var $tip = $($(tipTmpl.join('')));
        $tip.appendTo($(defaults.appendTo));
        $tip.css({
            position: defaults.position,
            top: defaults.top,
            left: defaults.left,
            marginTop: function () {
                return -$(this).height() / 2;
            },
            marginLeft: function () {
                return -$(this).width() / 2;
            },
            zIndex: defaults.zIndex
        }).hide().fadeIn();
        closeEvents($tip, defaults.time, defaults.tipType);
        return $tip;
    }

    return {
        success: function (opts) {
            return initDialog($.extend(opts, {tipType: 'success'}));
        },
        fail: function (opts) {
            return initDialog($.extend({tipType: 'fail', time: 3000}, opts));
        },
        info: function (opts) {
            return initDialog($.extend(opts, {tipType: 'info', title: '提示'}));
        }
    };
});
