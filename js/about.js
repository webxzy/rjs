require.config({
    baseUrl: './js',
    paths: {
        tools: 'tools'
    }
})

require(['tools'], function() {
    require(['info'], function(info) {
        info();
    })
})
