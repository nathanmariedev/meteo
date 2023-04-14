exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        {
          userName: "JohnDoe",
          password: "password123",
          mainCity: "44109",
        },
        {
          userName: "JaneDoe",
          password: "password456",
          mainCity: "44109",
        },
        {
          userName: "BobSmith",
          password: "password789",
          mainCity: "44109",
        },
      ]);
    });
};
