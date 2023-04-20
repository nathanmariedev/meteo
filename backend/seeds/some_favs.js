// eslint-disable-next-line @typescript-eslint/typedef
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('favs')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('favs').insert([
        {
          insee: '44109',
          userName: 8,
        },
        {
          insee: '75056',
          userName: 9,
        },
        {
          insee: '44109',
          userName: 9,
        },
      ]);
    });
};
