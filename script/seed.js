"use strict";

const {
  db,
  models: { User, Mole, Entry },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const [Cody, Murphy, Sally] = await User.bulkCreate([
    {
      uid: "uHiPs9ZlgwPuLeLOIhdsfTUBqCM2",
      email: "cody@moletracks.com",
      firstName: "Cody",
      lastName: "Mole",
    },
    {
      uid: "q2LeZcqxbFW5Uy7KMTeJ6ohlBp13",
      email: "murphy@moletracks.com",
      firstName: "Murphy",
      lastName: "Mole",
    },
    {
      uid: "MD7YjRJ5UUYB2ymS0Z2OaMXPNIp2",
      email: "sally@moletracks.com",
      firstName: "Sally",
      lastName: "Mole",
    },
  ]);

  // Creating Moles
  const [Fuzzy, Bumpy, Slimy, Backy, Humps, Lumps, Bigs] =
    await Mole.bulkCreate([
      {
        nickname: "Fuzzy",
        side: "front",
        bodyPart: "arm-l",
      },
      {
        nickname: "Bumpy",
        side: "back",
        bodyPart: "head",
      },
      {
        nickname: "Slimy",
        side: "back",
        bodyPart: "butt",
      },

      {
        nickname: "Backy",
        side: "back",
        bodyPart: "torso",
      },
      {
        nickname: "Humps",
        side: "back",
        bodyPart: "torso",
      },
      {
        nickname: "Lumps",
        side: "back",
        bodyPart: "torso",
      },
      {
        nickname: "Bigs",
        side: "front",
        bodyPart: "torso",
      },
    ]);

  // Creating Entries
  const [March1, June1, July1, August1, September1, October1] =
    await Entry.bulkCreate([
      {
        notes: "Came out of nowhere. So fuzzy!!!",
        tags: ["border", "elevation"],
        imgUrl:
          "https://i.natgeofe.com/n/677bf565-9bbf-43a2-b1ba-888a9c270828/63927_3x2.jpg",
      },
      {
        notes: "It's getting fuzzier!",
        tags: ["border", "elevation"],
        imgUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFp3E2Fk1h_GvlCVrPdEM7Wnj5gkFtGNNfQ&usqp=CAU",
      },
      {
        notes: "It's bumpin'",
        tags: ["asymmetry", "elevation"],
        imgUrl:
          "https://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Wildlife/Mammals/mammal_mole_600x300.ashx",
      },
      {
        notes: "So much fuzz.",
        tags: ["asymmetry", "elevation"],
        imgUrl:
          "https://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Wildlife/Mammals/mammal_mole_600x300.ashx",
      },
      {
        notes: "The fuzziest",
        tags: ["asymmetry", "elevation"],
        imgUrl:
          "https://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Wildlife/Mammals/mammal_mole_600x300.ashx",
      },
      {
        notes: "SOS",
        tags: ["asymmetry", "elevation"],
        imgUrl:
          "https://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Wildlife/Mammals/mammal_mole_600x300.ashx",
      },
    ]);

  // Associations via Magic Methods
  await Sally.setMoles([Fuzzy, Bumpy, Bigs, Backy, Humps, Lumps]);
  // await Sally.setMoles(Slimy);

  await Fuzzy.setEntries([March1, June1, August1, September1, October1]);
  await Bumpy.setEntries(July1);

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
