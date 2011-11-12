# Set the default files to be built
default: install

# Install nodejs dependencies
install:
	npm install jslint

# Compress lfm.js into lfm.min.js
minify: lfm.js
	@@echo 'Compressing lfm.min.js...'
	@@java -jar lib/compiler.jar --js $^ --js_output_file lfm.min.js
	@@echo 'Done!'