exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("city")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("city").insert([
        {
          insee: "44109",
          cp: "44000",
          name: "Nantes",
        },
        {
          insee: "75056",
          cp: "75000",
          name: "Paris",
        },
        {
          insee: "35238",
          cp: "35000",
          name: "Rennes",
        },
      ]);
    });
};
