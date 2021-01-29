const config = {
    publicPath: './',
    configureWebpack: {
        externals: [ 'vue', 'filepond' ],
        output: {
            libraryExport: 'default',
        }
    }
};

module.exports = config;