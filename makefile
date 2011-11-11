# Set the default files to be built
default: lfm.min.js

# Install nodejs dependencies
install:
	npm install jslint
	npm install nopt

# Compress lfm.js into lfm.min.js
lfm.min.js: lfm.js
	@@echo 'Compressing lfm.min.js...'
	@@java -jar lib/compiler.jar --js $^ --js_output_file $@
	@@echo 'Done!'