module.exports = function (grunt) {
    grunt.initConfig({
        zip: {
            './deploy.zip': ['**/*.js', '**/*.jade', '**/*.html', '**/*.json', '**/*.css', 'web.config', '!**/spec/**']
        },
        ts: {
            default: {
                src: ['**/*.ts', "!node_modules/**", "!public/node_modules/**"],
                options: {
                    keepDirectoryHierarchy: true,
                    module: 'system',
                    moduleResolution: "node",
                    target: 'es6',
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    noImplicitAny: false
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        typings: {
            install: {}
        }
    });

    //grunt.loadNpmTasks('grunt-typings');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('prod', ['ts', 'transformAzure', 'zip']);

    grunt.registerTask('test', '', function () {
        grunt.task.run('ts');
        grunt.task.run('karma');
    });

    grunt.registerTask('transformAzure', '', function () {
        var settings = grunt.file.read('./public/app/core/settings.js');

        settings = settings.replace("client_id=45F0722C-BC39-447E-95C1-D3FE9B131C08", "client_id=DE4A0837-6672-45EC-B9AF-66618A74BE74");

        settings = settings.replace("http://127.0.0.1/", "http://vsts-mobile.azurewebsites.net");

        grunt.file.write('public/app/core/settings.js', settings)
    });
};