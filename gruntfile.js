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
                    target: 'es5',
                    inlineSourceMap: true,
                    sourceMap: true,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    noImplicitAny: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('prod', 'Log some stuff.', function () {
        grunt.task.run('ts');

        var settings = grunt.file.read('public/app/core/settings.js');

        settings = settings.replace("https://app.vssps.visualstudio.com/oauth2/authorize" +
            "?client_id=45F0722C-BC39-447E-95C1-D3FE9B131C08" +
            "&response_type=Assertion&state=test" +
            "&scope=vso.code%20vso.build_execute%20vso.packaging_write%20vso.project_manage%20vso.release_execute%20vso.test%20vso.work_write" +
            "&redirect_uri=http://127.0.0.1:80/", "https://app.vssps.visualstudio.com/oauth2/authorize" +
            "?client_id=DE4A0837-6672-45EC-B9AF-66618A74BE74" +
            "&response_type=Assertion&state=test" +
            "&scope=vso.code%20vso.build_execute%20vso.packaging_write%20vso.project_manage%20vso.release_execute%20vso.test%20vso.work_write" +
            "&redirect_uri=http://vsts-mobile.azurewebsites.net/");

        grunt.file.write('public/app/core/settings.js', settings)

        grunt.task.run('zip');
    });
};