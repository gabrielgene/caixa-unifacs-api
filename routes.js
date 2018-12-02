const express = require('express');
const router = express.Router();
const User = require('./models/user');
const Client = require('./models/client');
const Product = require('./models/product');
const History = require('./models/history');

//Health Check
router.get('/', (_, res) => {
  return res.status(200).send('ok');
});

router.get('/api/user', (req, res) => {
  User.find((err, users) => {
    if (err) handlerError(res, err);
    res.status(200).json(users);
  });
});

router.post('/api/user', (req, res) => {
  const { body } = req;
  User.create(body, (err, user) => {
    if (err) handlerError(res, err);
    res.status(200).json(user);
  });
});

router.get('/api/client', (req, res) => {
  Client.find((err, clients) => {
    if (err) handlerError(res, err);
    res.status(200).json(clients);
  });
});

router.post('/api/client', (req, res) => {
  const { body } = req;
  Client.create(body, (err, client) => {
    if (err) handlerError(res, err);
    res.status(200).json(client);
  });
});

router.get('/api/product', (req, res) => {
  Product.find((err, products) => {
    if (err) handlerError(res, err);
    res.status(200).json(products);
  });
});

router.post('/api/product', (req, res) => {
  const { body } = req;
  Product.create(body, (err, product) => {
    if (err) handlerError(res, err);
    res.status(200).json(product);
  });
});

router.post('/api/auth/admin', (req, res) => {
  const { body } = req;
  User.findOne({ ...body, type: 'admin' }, (err, user) => {
    console.log(user);
    res.status(200).json(user);
  });
});

router.post('/api/auth/operator', (req, res) => {
  const { body } = req;
  User.findOne(body, (err, user) => {
    console.log(user);
    res.status(200).json(user);
  });
});

router.get('/api/populate', (req, res) => {
  const products = [
    {
      cod: 1,
      name: 'Arroz Tio João',
      price: 7,
      picture:
        'https://www.paodeacucar.com/img/uploads/1/678/510678.jpg?type=product',
      amount: 10,
    },
    {
      cod: 2,
      name: 'Vinho',
      price: 70,
      picture:
        'https://savegnago.vteximg.com.br/arquivos/ids/278721-1000-1000/VINHO-BRASILEIRO-CHALISE-750ML-SUAVE-TIN.jpg?v=636276558268370000',
      amount: 10,
    },
    {
      cod: 3,
      name: 'Cerveja',
      price: 4,
      picture:
        'https://superprix.vteximg.com.br/arquivos/ids/175068-600-600/Cerveja-Eisenbahn-Pilsen-600ml.png?v=636280351726700000',
      amount: 10,
    },
    {
      cod: 4,
      name: 'Suco',
      price: 3,
      picture:
        'https://araujo.vteximg.com.br/arquivos/ids/3765344-1000-1000/07894900660319.jpg?v=636386542513200000',
      amount: 10,
    },
    {
      cod: 5,
      name: 'Biscoito',
      price: 2.5,
      picture:
        'https://staples.vteximg.com.br/arquivos/ids/220791-1000-1000/Biscoito-Amanteigado-11-5-g-Bauducco-BSCBDBCCA.jpg?v=636111097174000000',
      amount: 10,
    },
    {
      cod: 6,
      name: 'Salgadinho',
      price: 1,
      picture:
        'https://www.deliveryextra.com.br/img/uploads/1/73/557073.png?type=product',
      amount: 10,
    },
    {
      cod: 7,
      name: 'Coca-cola',
      price: 6,
      picture:
        'https://static.carrefour.com.br/medias/sys_master/images/images/h3d/heb/h00/h00/12175673917470.jpg',
      amount: 10,
    },
    {
      cod: 8,
      name: 'Whisky',
      price: 120,
      picture:
        'https://www.paodeacucar.com/img/uploads/1/200/477200.jpg?type=product',
      amount: 10,
    },
    {
      cod: 9,
      name: 'Fanta',
      price: 3,
      picture:
        'https://www.deliveryextra.com.br/img/uploads/1/921/546921.jpg?type=product',
      amount: 10,
    },
    {
      cod: 10,
      name: 'Carne Kg',
      price: 20,
      picture:
        'https://png.pngtree.com/element_origin_min_pic/17/09/22/111a084f3a649a7c428e298040191c6c.jpg',
      amount: 10,
    },
  ];

  clients = [
    {
      cod: 1,
      picture: 'https://avatars1.githubusercontent.com/u/26730826?s=460&v=4',
      name: 'Peu',
    },
    {
      cod: 2,
      picture: 'https://avatars3.githubusercontent.com/u/19671668?s=460&v=4',
      name: 'Genê',
    },
    {
      cod: 3,
      picture: 'https://avatars0.githubusercontent.com/u/22510441?s=460&v=4',
      name: 'Ravi',
    },
  ];

  products.map(p => Product.create(p));
  // clients.map(c => Client.create(c));
  res.status(200).send('Finish');
});

router.post('/api/history', (req, res) => {
  const { body } = req;
  History.create(body, (err, his) => {
    his.products.map(p => {
      const { _id, amount, qtd } = p;
      console.log('input', p);
      Product.findOneAndUpdate(
        {
          _id,
        },
        {
          amount: amount - qtd,
        },
        (err, prod) => {
          console.log('returnado', prod);
          if (err) handlerError(res, err);
        },
      );
    });
    res.status(200).json(his);
  });
});

router.get('/api/history', (req, res) => {
  History.find((err, his) => {
    res.status(200).json(his);
  });
});

handlerError = (res, err) => {
  return res.status(500).json({ status: 500, message: err.message });
};

module.exports = router;
