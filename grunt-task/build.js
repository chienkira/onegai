module.exports = function (grunt) {
	/**
	 * Assets creation and minification
	 */

	//Builds all in one css app file 
	grunt.registerTask('buildCss', 'Minify All css', [
		'clean:cssmin',
		'concat:css',
		'cssmin:minify'
	]);

	//Builds external libraries minified js 
	grunt.registerTask('buildlib', 'Create lib.min.js asset', [
		'clean:lib',
		'concat:lib',
		'uglify:lib'
	]);

	//Builds complete app
	grunt.registerTask('buildapp', 'Create app.min.js asset', [
		'clean:app',
		'concat:app',
		'uglify:app'
	]);
	
	grunt.registerTask('buildDist', 'Create dist assets', [
		'concat:controllers',
		'concat:services',
		'uglify:controllers',
		'uglify:services',
		'clean:js'
	]);

	//Builds everything
	grunt.registerTask('build', 'Create production ready project in /assets', function () {
		grunt.task.run(['buildCss', 'buildlib', 'buildDist']);
	});

}
