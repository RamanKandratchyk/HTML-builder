function writeFile() {

    const fs = require('fs');
    const path = require('path');
    const { stdin, stdout } = process;
    // const rl = require('readline');
    // const rl = require("readline").createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });

    // rl.on("SIGINT", function () {
    //     process.emit("SIGINT");
    // });

    // process.on("SIGINT", function () {
    //     //graceful shutdown
    //     process.exit();
    // });

    fs.open(
        path.join(__dirname, 'text.txt'),
        'w',
        (err) => {
            if (err) throw err;
            console.log('File created');
        }
    );

    stdout.write('Введите текст для записи:\n');

    stdin.on('data', data => {

        // fs.writeFile(
        //     path.join(__dirname, 'text.txt'),
        //     `${data}`,
        //     (err) => {
        //         if (err) throw err;
        //         console.log('Файл был создан');
        //     }
        // );
        let dataStr = data.toString();
        // stdout.write(dataStr);
        console.log(dataStr.length);

        // let buffer = Buffer.from(data, 'utf-8');
        // console.log("buffer =", buffer);

        if (dataStr.length === 6 && dataStr.slice(0, 4) === 'exit') {
            stdout.write('Введен exit\n');
            process.exit();
        } else {
            fs.appendFile(
                path.join(__dirname, 'text.txt'),
                `${data}`,
                err => {
                    if (err) throw err;
                    console.log('Файл был изменен');
                }
            );
        }

    });

    // rl.on('close', () => {
    //     stdout.write('Процесс завершён. До скорого.');
    // });

    process.on('SIGINT', () => {
        process.exit();
        // stdout.write('Процесс завершён. До скорого.');
    });

    process.on('exit', () => {
        stdout.write('Процесс завершён. До скорого.');
    });

}

module.exports = writeFile;