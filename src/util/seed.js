export default async () => {
  await models.User.create(
    {
      username: 'joe',
      recipes: [
        {
          title: 'Taco Salad'
        },
        {
          title: 'Chili'
        },
        {
          title: 'Pasta Salad'
        },
        {
          title: 'Greek Salad'
        },
        {
          title: 'Brownies'
        }
      ]
    },
    {
      include: [models.Recipe]
    }
  );

  await models.User.create(
    {
      username: 'wiley',
      recipes: [
        {
          title: 'Pizza'
        },
        {
          title: 'Hot Dogs'
        },
        {
          title: 'Oatmeal'
        },
        {
          title: 'Waffles'
        },
        {
          title: 'Spaghetti'
        }
      ]
    },
    {
      include: [models.Recipe]
    }
  );
};
