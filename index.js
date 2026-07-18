import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";
import { promises as fs } from "fs";

const path = "./data.json";

const markCommit = (x, y) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();
  const data = {
    date: date,
  };
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = async (n) => {
  if (n === 0) {
    await simpleGit().push();
    console.log("Done!");
    return;
  }
  const startDate = moment("2026-07-04");
  const endDate = moment("2026-07-06");
  const randomDay = random.int(0, endDate.diff(startDate, "days"));
  const date = startDate.clone().add(randomDay, "d").format();

  const data = {
    date: date,
  };
  
  console.log(date);
  await fs.writeFile(path, JSON.stringify(data));
  await simpleGit().add([path]).commit(date, { "--date": date });
  await makeCommits(n - 1);
};

makeCommits(20);
