async function buildPage() {
    const fsProm = require('fs/promises');
    const path = require('path');
    const fs = require('fs');

    try {
        await fsProm.access(path.join(__dirname, 'project-dist', 'bundle.css'), fs.F_OK);
        // console.log("Файл найден");
        const delFile = await fsProm.rm(path.join(__dirname, 'project-dist', 'bundle.css'), { recursive: true });
    } catch (err) {
        // console.log(err);
        // console.log("Файл не найден");
    }

    try {
        fs.open(
            path.join(__dirname, 'project-dist', 'bundle.css'),
            'w',
            (err) => {
                if (err) throw err;
                console.log('File bundle.css created');
            }
        );

        const sourceFiles = await fsProm.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
        for (const file of sourceFiles) {

            let fileObj = path.parse(path.join(__dirname, 'styles', `${file.name}`));
            // console.log(fileObj);

            if (!file.isDirectory() && fileObj.ext === '.css') {
                // console.log(`${fileObj.name} - ${fileObj.ext.slice(1)} - ${fileObj.root}`);
                console.log(file);

                fs.readFile(path.join(__dirname, 'styles', `${file.name}`), "utf8",
                    function (error, data) {
                        if (error) throw error;
                        fs.appendFile(
                            path.join(__dirname, 'project-dist', 'bundle.css'),
                            `${data}`,
                            err => {
                                if (err) throw err;
                                console.log('File bundle.css was modified');
                            }
                        );
                    }
                );

                console.log('******************************************');
            }
        }
    } catch (err) {
        console.error(err);
    }

}

module.exports = buildPage;
