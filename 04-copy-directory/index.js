async function copyDir() {

    const fs = require('fs/promises');
    const path = require('path');

    try {
        const filesCopyDir = await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });

        const sourceFiles = await fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true });
        for (const file of sourceFiles) {
            console.log(file);
            await fs.copyFile(path.join(__dirname, 'files', `${file.name}`), path.join(__dirname, 'files-copy', `${file.name}`));
        }
    } catch (err) {
        console.error(err);
    }

}

module.exports = copyDir;
