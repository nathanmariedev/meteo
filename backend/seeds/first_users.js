exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        {
          userName: "JohnDoe",
          password: "$2y$10$vTCQVV6Hza3LPGES96C0vu5i.DKEg4wivKjAsEPoemIDuVqhc2vqu", //password123
          mainCity: "44109",
        },
        {
          userName: "JaneDoe",
          password: "$2y$10$6jNE/rjoCdorQCtzpl0z6OmF6VX.2ovIPnfB4Oxol8DLOg62nasvW", //password456
          mainCity: "44109",
        },
        {
          userName: "BobSmith",
          password: "$2y$10$QeMwq8dpTg7SywyKf78wmuCXzmcKaYLzSShqSCvSjOb4dns5eH1XC", //password789
          mainCity: "44109",
        },
        {
          userName: "LilZb",
          password: "$2y$10$km7G7bj5XoKrJ6MgGBxAKejTdHgURIcnMkYCDFmGPfxoP/Ul4/ek6", //password667
          mainCity: "44035",
        }
      ]);
    });
};
