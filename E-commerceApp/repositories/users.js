// Repository approach - a single class (repository) is responsible for data access. All records are stored and used as plain JS objects

// Active record approach - every record is an instance of a 'model' class that has methods to save, update, delete this record
const fs = require('fs');
const crypto = require('crypto');

class UsersRepository {
   constructor(filename) {
      if(!filename) {
         throw new Error('Creating a repository requires a filename');
      }
      this.filename = filename;

      try {
         fs.accessSync(this.filename);
      } catch (err) {
         fs.writeFileSync(this.filename, '[]');
      }
   }

   async getAll() {
      return JSON.parse(
         await fs.promises.readFile(this.filename, {
            encoding: 'utf8'
         })
      );
   }

   async create(attrs) {
      attrs.id = this.randomID();
      const records = await this.getAll();
      records.push(attrs);

      // write the updated 'records' array back to this.filename
      await this.writeAll(records);
   }

   async writeAll(records) {
      await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2)); // null is custom formatter
   }

   randomID() {
      return crypto.randomBytes(4).toString('hex');
   }

   async getOne(id) {
      const records = await this.getAll();
      return records.find(record => record.id === id);
   }

   async delete(id) {
      const records = await this.getAll();
      const filteredRecords = records.filter(record => record.id !== id);
      await this.writeAll(filteredRecords);
   }

   async update(id, attrs) {
      const records = await this.getAll();
      const record = records.find(record => record.id === id);

      if(!record) {
         throw new Error(`Record with id = ${id} not found!`);
      }

      Object.assign(record, attrs);
      await this.writeAll(records);
   }

   async getOneBy(filters) {
      const records = await this.getAll();

      // iterating through an array
      for(let record of records) {
         let found = true;

         // iterating through an object
         for(let key in filters) {
            if(record[key] !== filters[key]) {
               found = false;
            }
         }

         if(found) {
            return record;
         }
      }
   }
}

const test = async () => {
   const repo = new UsersRepository('users.json');
   // repo.create({ email: 'test@test.com', password: 'password' });
   // const users = await repo.getAll();
   // const user = await repo.getOne('02cf00e0');
   // console.log(user);
   // await repo.delete('02cf00e0');

   // await repo.update('14f0910b', { password: 'pass' });

   const user = await repo.getOneBy({
      email: 'test@test.com',
      password: 'password'
   });
   console.log(user);
}

test();

// exporting the class
// module.exports = UsersRepository;
// in another file ...
// const UsersRepository = require('./users.js');
// const repo = new UsersRepository('users.json');

// exporting an instance
module.exports = new UsersRepository('users.json');
// const repo = require('./users');
