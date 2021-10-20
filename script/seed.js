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
        x: 275,
        y: 257
      },
      {
        x: 200,
        y: 200,
        nickname: "Bumpy",
        side: "back",
        bodyPart: "torso",
      },
      {x: 300,
        y: 300,
        nickname: "Sienna",
        side: "back",
        bodyPart: "butt",
      },
      {x: 148,
        y: 127,
        nickname: "Backy",
        side: "back",
        bodyPart: "torso",
      },
      {x: 225,
        y: 275,
        nickname: "Becky",
        side: "back",
        bodyPart: "torso",
      },
      {x: 200,
        y: 175,
        nickname: "Lumps",
        side: "back",
        bodyPart: "torso",
      },
      {x: 235,
        y: 487,
        nickname: "Bigs",
        side: "front",
        bodyPart: "leg-l",
      },
      {x: 141,
        y: 575,
        nickname: "Smalls",
        side: "front",
        bodyPart: "leg-r",
      },
      {x: 222,
        y: 300,
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
    Entry31,
    Entry41,
    Entry42,
    Entry51,
    Entry61,
    Entry62,
    Entry71,
    Entry81,
    Entry91,
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
    {
      notes: "Dark brown with light brown ring.",
      date: new Date(2021, 1, 15),
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmPH0ZRxVAtVv-dj9lN0m3E4i3qGCfC4ZI4g&usqp=CAU",
    },
    {
      notes: "Definitley elevated, but small",
      date: new Date(2020, 1, 19),
      imgUrl:
        "https://www.aimatmelanoma.org/wp-content/uploads/Untitled-design-70.png",
    },
    {
      notes: "Looking the same as last month-- still elevated. Nothing else to report; no news is good news!",
      date: new Date(2021, 2, 19),
      imgUrl:
        "https://www.aimatmelanoma.org/wp-content/uploads/Untitled-design-70.png",
    },
    {
      notes: "Patchy looking mole, reminds me of an undiscovered island",
      date: new Date(2018, 11, 12),
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtzvbOR2FYMV6jvCdahMoYlfENM9eiKRBHFA&usqp=CAU",
    },
    {
      notes: "Pretty small-- I just want to keep track of it in case it gets bigger though.",
      date: new Date(2021, 3, 27),
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ioz4B6tKnArbs8-yrSB-x-VlLLoYYqL3wQ&usqp=CAU",
    },
    {
      notes: "Is it possible for a mole to shrink? Because I feel like this mole is definitley getting smaller and smaller-- phew! ",
      date: new Date(2021, 4, 27),
      imgUrl:
        "https://i.redd.it/5fx8zhhl5k861.jpg",
    },
    {
      notes: "Dark brown and raised in the middle. Not too big so not too worried!!! Should keep an eye on this though, just in case ",
      date: new Date(2021, 6, 22),
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZObSYsI4t73DkpOsYZuLCjcAlj7U1rNqWWg&usqp=CAU",
    },
    {
      notes: "Kinda light, kinda small. Not too worrisome though! Let's just cross our fingers and hope for the best!",
      date: new Date(2021, 4, 9),
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7Yx-TZP_2u7d_6BdCs1-eGfa3J2M5gScsw&usqp=CAU",
    },
    {
      notes: "Holey Moley! This one isn't too bad but I just want to keep any eye on this lil guy. Ya can't be too safe, ya know what I mean?",
      date: new Date(2020, 10, 3),
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9VcGdJWmgvGH4U9yWcVqewzFkePSTRrS1g&usqp=CAU",
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

  await Bumpy.setEntries([Entry31])
  await Backy.setEntries([Entry41, Entry42])
  await Becky.setEntries([Entry51])
  await Lumps.setEntries([Entry61, Entry62])
  await Bigs.setEntries([Entry71])
  await Smalls.setEntries([Entry81])
  await Reardon.setEntries([Entry91])

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
