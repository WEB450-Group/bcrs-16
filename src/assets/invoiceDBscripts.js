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


invoiceOne = {
  "invoiceId": 300,
  "employeeId": 1016,
  "fullName": "test",
  "phoneNumber": "1234567890",
  "customerEmail": "email@email.com",
  "lineItems": [
    {
      "itemId": 1,
      "itemName": "Password Reset",
      "price": 39.99,
      "checked": true
    },
    {
      "itemId": 2,
      "itemName": "Spyware Removal",
      "price": 99.99,
      "checked": true
    },
    {
      "itemId": 3,
      "itemName": "RAM Upgrade",
      "price": 129.99,
      "checked": true
    }
  ],
  "partsAmount": 0,
  "laborAmount": 100,
  "lineItemTotal": 269.97,
  "invoiceTotal": 369.97,
  "orderDate": "7/20/2024",
  "customOrderDescription": "Some interesting service text"
}

db.invoices.insertOne(invoiceOne);
