const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const random = require('random');

const FILE_PATH = './data.json';

const makeCommit = (n) => {
    if (n === 0) return simpleGit().push();

    // 🧠 Chọn ngẫu nhiên ngày trong 365 ngày gần nhất (hôm nay trở về trước)
    const daysAgo = random.int(0, 364);
    const DATE = moment().subtract(daysAgo, 'd').format();

    const data = { date: DATE };
    console.log("📅 Commit on:", DATE);

    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit()
            .add([FILE_PATH])
            .commit(DATE, { '--date': DATE }, makeCommit.bind(this, --n));
    });
};

makeCommit(120);
