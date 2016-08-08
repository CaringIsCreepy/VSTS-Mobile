module.exports = function (grunt) {
    grunt.initConfig({
        zip: {
            './deploy.zip': ['**/*.js', '**/*.jade', '**/*.html', '**/*.json', '**/*.css', 'web.config', '!**/spec/**']
        },
        ts: {
            default: {
                src: ['**/*.ts', "!node_modules/**", "!public/node_modules/**"],
                outdir: 'dist',
                options: {
                    keepDirectoryHierarchy: true,
                    module: 'amd',
                    target: 'es5',
                    inlineSourceMap: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('prod', 'Log some stuff.', function () {
        grunt.task.run('ts');
        grunt.task.run('zip');
    });
};