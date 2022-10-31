async function readFilesInfo() {

    // const { Dirent } = require('fs');
    const fs = require('fs/promises');
    const path = require('path');
    // const { stdin, stdout } = process;

    // console.log(path.join(__dirname, 'secret-folder'));

    try {
        const files = await fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
        // console.log(files);
        for (const file of files) {
            // console.log(file.name);
            // console.log(file.isDirectory());

            // let fileExt = path.extname(path.join(__dirname, 'secret-folder', `${file.name}`));
            // console.log(fileExt);
            // console.log(typeof(path.extname(path.join(__dirname, 'secret-folder', `${file.name}`))));

            let fileObj = path.parse(path.join(__dirname, 'secret-folder', `${file.name}`));
            // console.log(fileObj);

            let statFile = await fs.stat(path.join(__dirname, 'secret-folder', `${file.name}`));
            // console.log(statFile);
            let sizeInKb = (statFile.size / 1024).toFixed(3);

            if (!file.isDirectory()) {
                // console.log(path.join(__dirname, `${file.name}`));
                console.log(`${fileObj.name} - ${fileObj.ext.slice(1)} - ${sizeInKb} Kb`);
                console.log('******************************************');
            }
        };
    } catch (err) {
        console.error(err);
    }

}

module.exports = readFilesInfo;