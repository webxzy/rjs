require.config({
    'baseUrl': './js',
    'paths': {
        'tools': 'tools'
    }
})
require(['tools'], function() {
    require(['main', 'area'], function(main) {
        main();
    })
})