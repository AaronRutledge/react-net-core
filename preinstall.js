var fs = require('fs')
var resolve = require('path').resolve
var join = require('path').join
var cp = require('child_process')
var copydir = require('copy-dir');
var componentManifest = {};
var componentLibrary = resolve(__dirname, './Components/');
var manifestPath = './wwwroot/components/AppManifests.json';

fs
    .readdirSync(componentLibrary)
    .forEach(function (component) {
        var componentPath = join(componentLibrary, component)
        // ensure path has package.json
        if (!fs.existsSync(join(componentPath, 'package.json'))) 
            return
            // install folder
        
        var child_process = require('child_process');
        var exec = child_process.exec;
        //exec(command, [options], callback);
        console.log("Building " + component);

        componentManifest[component] = 'wwwroot/components/' + component + '/asset-manifest.json'; 
        
        exec('npm i', {
            cwd: componentPath
        }, function (err, stdout, stderr) {
            if (err) {
                console.log('Building ' + component + ' exited with error code', err.code);
                return
            }
            // Copy the build to the components folder
            copydir.sync(componentPath + "/build", './wwwroot/components/' + component);
        });

    });

console.log("Hold on...this might take a few.")

// Write manifesto
var writeStream = fs.createWriteStream(manifestPath);
writeStream.write(JSON.stringify(componentManifest));
writeStream.end();
