//Description: MongoDB Shell Scripts for the lineItems collection.
const items = 
[
  {
    "itemId": 2001,
    "itemName": "Password Reset",
    "price": 39.99
  },
  {
    "itemId": 2002,
    "itemName": "Spyware Removal",
    "price": 99.99
  },
  {
    "itemId": 2003,
    "itemName": "RAM Upgrade",
    "price": 129.99
  },
  {
    "itemId": 2004,
    "itemName": "Software Installation",
    "price": 49.99
  },
  {
    "itemId": 2005,
    "itemName": "PC Tune-up",
    "price": 89.99
  },
  {
    "itemId": 2006,
    "itemName": "Keyboard Cleaning",
    "price": 45.00
  },
  {
    "itemId": 2007,
    "itemName": "Disk Clean-up",
    "price": 129.99
  },
  {
    "itemId": 2008,
    "itemName": "Custom Service",
    "price": 50
  }
]
db.lineItems.insertMany(items);