async function copyDir() {
  const fsProm = require('fs/promises');
  const path = require('path');
  const constants = require('fs');

  try {
    await fsProm.access(path.join(__dirname, 'files-copy'), constants.F_OK);
    // console.log("Файл найден");
    const delDir = await fsProm.rm(path.join(__dirname, 'files-copy'), { recursive: true });
  } catch (err) {
    // console.error(err);
  }

  try {
    const filesCopyDir = await fsProm.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });

    const sourceFiles = await fsProm.readdir(path.join(__dirname, 'files'), { withFileTypes: true });
    for (const file of sourceFiles) {
      console.log(file);
      await fsProm.copyFile(path.join(__dirname, 'files', `${file.name}`), path.join(__dirname, 'files-copy', `${file.name}`));
    }
  } catch (err) {
    console.error(err);
  }

}

copyDir();
