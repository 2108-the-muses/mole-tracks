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
  const [Jinx, Bumpy, Sienna, Backy, Becky, Lumps, Bigs, Smalls, Reardon] =
    await Mole.bulkCreate([
      {
        nickname: "Jinx",
        side: "front",
        bodyPart: "arm-l",
      },
      {
        nickname: "Bumpy",
        side: "back",
        bodyPart: "torso",
      },
      {
        nickname: "Sienna",
        side: "back",
        bodyPart: "butt",
      },

      {
        nickname: "Backy",
        side: "back",
        bodyPart: "torso",
      },
      {
        nickname: "Becky",
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
        bodyPart: "leg-l",
      },
      {
        nickname: "Smalls",
        side: "front",
        bodyPart: "leg-r",
      },
      {
        nickname: "Reardon",
        side: "back",
        bodyPart: "butt",
      },
    ]);

  // Creating Entries
  const [
    Entry11,
    Entry12,
    Entry13,
    Entry14,
    Entry15,
    Entry16,
    Entry17,
    Entry21,
    Entry22,
    Entry23,
  ] = await Entry.bulkCreate([
    {
      notes: "New mole. A little asymmetrical, not much else to note.",
      date: new Date(2019, 7, 2),
      imgUrl:
        "https://live.staticflickr.com/65535/51599636232_d4b486378f_o.png",
    },
    {
      notes:
        "I think it's growing a little bit, but it's hard to tell. No symptoms to note.",
      date: new Date(2019, 10, 12),
      imgUrl:
        "https://live.staticflickr.com/65535/51600675958_c942c03acd_o.png",
    },
    {
      notes: "Felt just a little itchy today, taking a pic to make note.",
      date: new Date(2020, 3, 24),
      imgUrl:
        "https://live.staticflickr.com/65535/51600463476_d66d7d7759_o.png",
    },
    {
      notes:
        "Sigh. It's definitely getting itchier, but I don't think it's growing? Could be wrong.",
      date: new Date(2020, 8, 1),
      imgUrl:
        "https://live.staticflickr.com/65535/51601354370_526e13b2e6_o.png",
    },
    {
      notes: "Mole seems a little darker now than it was before.",
      date: new Date(2020, 11, 17),
      imgUrl:
        "https://live.staticflickr.com/65535/51601354355_a45204b819_o.png",
    },
    {
      notes:
        "No longer itchy, but it is getting darker/bigger. Not sure what's going on.",
      date: new Date(2021, 4, 8),
      imgUrl:
        "https://live.staticflickr.com/65535/51601354350_1fa4b8f471_o.png",
    },
    {
      notes:
        "Good new! Saw the doctor - he said the itching might have just been a sign of 'minor trauma' and not skin cancer. We will continue to monitor this mole regardless.",
      date: new Date(2021, 10, 12),
      imgUrl:
        "https://live.staticflickr.com/65535/51601354345_deca64dbd2_o.png",
    },
    {
      notes:
        "An old mole I've been monitoring for a while. No symptoms, just large.",
      date: new Date(2018, 3, 4),
      imgUrl:
        "https://live.staticflickr.com/65535/51601122064_62e0d113e7_o.png",
    },
    {
      notes: "Need to check growth - seems to be getting bigger.",
      date: new Date(2020, 9, 18),
      imgUrl:
        "https://live.staticflickr.com/65535/51600675908_013c9438fd_o.png",
    },
    {
      notes: "Starting to get redness and swelling.",
      date: new Date(2021, 8, 30),
      imgUrl:
        "https://live.staticflickr.com/65535/51601122049_282824f464_o.png",
    },
  ]);

  // Associations via Magic Methods
  await Sally.setMoles([
    Jinx,
    Bumpy,
    Sienna,
    Backy,
    Becky,
    Lumps,
    Bigs,
    Smalls,
    Reardon,
  ]);

  await Jinx.setEntries([
    Entry11,
    Entry12,
    Entry13,
    Entry14,
    Entry15,
    Entry16,
    Entry17,
  ]);
  await Sienna.setEntries([Entry21, Entry22, Entry23]);
  // @todo need to create these entries above and find photos
  // await Bumpy.setEntries([Entry31])
  // await Backy.setEntries([Entry41, Entry42])
  // await Becky.setEntries([Entry51])
  // await Lumps.setEntries([Entry61, Entry62])
  // await Bigs.setEntries([Entry71])
  // await Smalls.setEntries([Entry81])
  // await Reardon.setEntries([Entry91])

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
