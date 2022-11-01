async function buildPage() {
  const fsProm = require('fs/promises');
  const path = require('path');
  const fs = require('fs');

  let components = new Object;

  try {
    await fsProm.access(path.join(__dirname, 'project-dist'), fs.F_OK);
    // console.log("Dir found");
    const delDir = await fsProm.rm(path.join(__dirname, 'project-dist'), { recursive: true });
  } catch (err) {
    // console.log(err);
    // console.log("Dir not found");
  }


  try {
    const projectDistDir = await fsProm.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

    fs.open(
      path.join(__dirname, 'project-dist', 'index.html'),
      'w',
      (err) => {
        if (err) throw err;
        console.log('File index.html created');
      }
    );

    fs.open(
      path.join(__dirname, 'project-dist', 'style.css'),
      'w',
      (err) => {
        if (err) throw err;
        console.log('File style.css created');
      }
    );
  } catch (err) {
    console.error(err);
  }


  try {
    const componentsFiles = await fsProm.readdir(path.join(__dirname, 'components'), { withFileTypes: true });
    for (const file of componentsFiles) {

      let fileObj = path.parse(path.join(__dirname, 'components', `${file.name}`));

      if (!file.isDirectory() && fileObj.ext === '.html') {

        console.log(fileObj.name);

        fs.readFile(path.join(__dirname, 'components', `${file.name}`), "utf8",
          function (error, data) {
            if (error) throw error;

            components[fileObj.name] = data;
            // console.log(components);

            // fs.appendFile(
            //   path.join(__dirname, 'project-dist', 'bundle.css'),
            //   `${data}`,
            //   err => {
            //     if (err) throw err;
            //     console.log('File bundle.css was modified');
            //   }
            // );

          }
        );

      }



    }
  } catch (err) {
    console.error(err);
  }


  try {
    fs.readFile(path.join(__dirname, 'template.html'), "utf8",
      function (error, data) {
        if (error) throw error;
        fs.appendFile(
          path.join(__dirname, 'project-dist', 'index.html'),
          `${data}`,
          err => {
            if (err) throw err;
            console.log('File index.html was modified');
            // console.log(components.header);
          }
        );
      }
    );
  } catch (err) {
    console.error(err);
  }



















  // *******************************************************************************
  // try {
  //   const sourceFiles = await fsProm.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
  //   for (const file of sourceFiles) {

  //     let fileObj = path.parse(path.join(__dirname, 'styles', `${file.name}`));
  //     // console.log(fileObj);

  //     if (!file.isDirectory() && fileObj.ext === '.css') {
  //       // console.log(`${fileObj.name} - ${fileObj.ext.slice(1)} - ${fileObj.root}`);
  //       console.log(file);

  //       fs.readFile(path.join(__dirname, 'styles', `${file.name}`), "utf8",
  //         function (error, data) {
  //           if (error) throw error;
  //           fs.appendFile(
  //             path.join(__dirname, 'project-dist', 'bundle.css'),
  //             `${data}`,
  //             err => {
  //               if (err) throw err;
  //               console.log('File bundle.css was modified');
  //             }
  //           );
  //         }
  //       );

  //       console.log('******************************************');
  //     }
  //   }
  // } catch (err) {
  //   console.error(err);
  // }




}

module.exports = buildPage;
