'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

let condense_dir = process.env.CONDENSE_DIR;

if (condense_dir == null || condense_dir == "") {
    console.error("Expected CONDENSE_DIR environment variable to be set.");
    return;
}

function condense_file(filename) {
	console.log("Compressing " + filename + "...");
	let reader = fs.createReadStream(filename);
	let writer = fs.createWriteStream(filename + ".gz");
	let gzip = zlib.createGzip();
	reader.pipe(gzip).pipe(writer).on('finish', (err) => {
		if(err) {console.error(err); return;}
		console.log("Compressed " + filename + "!");
		// Delete it
		fs.unlink(filename, (err) => {
			if(err) {
				console.error(filename + " failed to delete (round probably not done)");
			} else {
				console.error("Deleted uncompressed demo at " + filename);
			}
		});
	});
}

fs.readdir(condense_dir, (err, files) => {
    if(err) {console.error(err); return;}
    for(let file of files) {
        let full = path.join(condense_dir, file);
        fs.stat(full, (err, stat) => {
            if(err) {console.error(err); return;}
            if(stat.isDirectory()) {
                condense(full);
            } else if(file == "demo.txt") {
                condense_file(full);
            }
        });
    }
});