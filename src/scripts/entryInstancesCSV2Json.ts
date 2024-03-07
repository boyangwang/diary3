// this typescript file reads a csv file and converts it to a json file without using any external dependencies
// the csv file is a list of instances of a class
// the json file is a list of instances of a class

// import fs using esm
// import path using esm
// import readline using esm
// import stream using esm
import fs from 'fs';
import readline from 'readline';

const instream = fs.createReadStream('./src/scripts/entry-instances-history-20230211-0106.csv');
const outstream = fs.createWriteStream('./src/scripts/entry-instances-history-20230211-0106.json');
const rl = readline.createInterface(instream, outstream);

interface OldEntryInstance {
  id: string; // timesstamp + random number
  entryTypeId: string;

  createdAt: number;
  updatedAt: number;

  points: number;
  notes: string;
}

const results: OldEntryInstance[] = [];
let headers: (keyof OldEntryInstance)[] = [];

rl.on('line', (line: string) => {
  const row = line.split(',');
  if (!headers.length) {
    headers = row as (keyof OldEntryInstance)[];
    return;
  }
  if (row[0] === '') {
    return;
  }

  const data: OldEntryInstance = {
    id: '',
    entryTypeId: '',

    createdAt: -1,
    updatedAt: -1,

    points: -1,
    notes: '',
  };
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < headers.length; i++) {
    const dateComponents = row[0].split('/');
    const createDate = new Date(2000 + Number(dateComponents[2]), Number(dateComponents[1]) - 1, Number(dateComponents[0]));

    data.entryTypeId = row[1];
    data.id = `${data.entryTypeId}-${createDate.toISOString()}-${Math.floor(Math.random() * 120)}`;
    data.createdAt = Number(createDate);
    data.updatedAt = Number(new Date());
    data.points = Number(row[2]);
    data.notes = row[3];
  }
  if (row.find((item) => item !== '')) {
    results.push(data);
  }
});

rl.on('close', () => {
  const json = JSON.stringify(results, null, 2);
  fs.writeFileSync('./src/scripts/entry-instances-history-20230211-0106.json', json);
});
