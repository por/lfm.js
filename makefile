# Set the default files to be built
default: lfm.min.js

# Compress lfm.js into lfm.min.js
lfm.min.js: lfm.js
	@@echo 'Compressing lfm.min.js...'
	@@java -jar build/compiler.jar --js $^ --js_output_file $@
	@@echo 'Done!'