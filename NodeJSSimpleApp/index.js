#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');

// Method #2
// const lstat = util.promisify(fs.lstat);

// Method #3
const { lstat } = fs.promises;
const targetDir = process.argv[2] || process.cwd();

// Method #1
fs.readdir(targetDir, async (err, filenames) => {
   if(err) {
      console.log(err);
   }

   // Using Promise.all
   const statPromises = filenames.map(filename => {
      return lstat(path.join(targetDir, filename));
   });
   await Promise.all(statPromises);
   for(let stats of allStats) {
      const index = allStats.indexOf(stats);
      if(stats.isFile()) {
         console.log(filenames[index]);
      } else {
         console.log(chalk.bold(filenames[index]));
      }
   }
   // for(let filename of filenames) {
   //    try {
   //       const stats = await lstat(filename);
   //    console.log(filename, stats.isFile());
   //    } catch (err) {
   //       console.log(err);
   //    }
   // }

   /*
   // Using callbacks
   const allStats = Array(filenames.length).fill(null);
   //BAD CODE HERE
   for(let filename of filenames) {
      const index = filenames.indexOf(filename);
      fs.lstat(filename, (err, stats) => {
         if(err) {
            console.log(err);
         }

         allStats[index] = stats;

         const ready = allStats.every((stats) => {
            return stats;
         });

         if(ready) {
            allStats.forEach((stats, index) => {
               console.log(filenames[index], stats.isFile());
            });
         }
      });
   }
   // BAD CODE COMPLETE
   */
});

// Method #1
// Using Promises
// const lstat = (filename) => {
//    return new Promise((resolve, reject) => {
//       fs.lstat(filename, (err, stats) => {
//          if(err) {
//             reject(err);
//          }
//          resolve(stats);
//       });
//    });
// };