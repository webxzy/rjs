define(['jquery', 'tip'], function($, tip) {
    return function() {
        $('#info').on('click', function() {
            tip.info({
                message: '这是一个测试页面'
            });
        })
    }
})