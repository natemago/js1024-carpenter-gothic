build:
	terser --compress --mangle --rename -- creepy.js > minified.js
	