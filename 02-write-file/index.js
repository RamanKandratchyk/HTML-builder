const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

fs.open(
  path.join(__dirname, 'text.txt'),
  'w',
  (err) => {
    if (err) throw err;
    // console.log('File created');
  }
);

stdout.write('Введите текст для записи:\n');

stdin.on('data', data => {

  let dataStr = data.toString();
  // stdout.write(dataStr);
  // console.log(dataStr.length);

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

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  stdout.write('Процесс завершён. До скорого.');
});