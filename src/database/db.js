const DB = {
  "ingredients": [
    {
      "id": "1",
      "name": "Tortillas de maiz",
      "measurement": "pza"
    },
    {
      "id": "2",
      "name": "Queso chihuahua",
      "measurement": "g"
    },
    {
      "id": "3",
      "name": "Salsa verde",
      "measurement": "ml"
    },
    {
      "id": "4",
      "name": "Calabaza italiana",
      "measurement": "pza"
    }
  ],
  "meals": [
    {
      "id": "1",
      "name": "Chilaquiles",
      "ingredients": [
        {
          "ingredientId": "1",
          "quantity": 4
        }
      ],
      "recipe": "",
      "portions": 1
    },
    {
      "id": "2",
      "name": "Caldo de queso",
      "ingredients": [
        {
          "ingredientId": "2",
          "quantity": 5
        }
      ],
      "recipe": "",
      "portions": 1
    },
    {
      "id": "3",
      "name": "Calabazas con queso",
      "ingredients": [
        {
          "ingredientId": "2",
          "quantity": 100
        },
        {
          "id": "4",
          "quantity": 3
        }
      ],
      "recipe": "",
      "portions": 2
    }
  ]
}

export default DB;