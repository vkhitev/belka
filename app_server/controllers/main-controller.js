const posts = [{
  id: 0,
  title: 'Google Summer of Code',
  brief: '27 марта в BelkaSpace Александр Дудинский презентовал проект Google Summer of Code.',
  date: '27.03.2017',
  author: 'IT КПІ',
  img: '/img/preview/0.jpg',
  link: 'post/0'
}, {
  id: 1,
  title: 'Как изменение технологий создает новый рынок?',
  brief: '24 марта у нас состоялась лекция от Максима Плахтия на тему: "Как изменение технологий создает новый рынок?"',
  date: '24.03.2017',
  author: 'Максим Плахтий',
  img: '/img/preview/1.jpg',
  link: 'post/1'
}]

function getPage (req, res) {
  // res.render('index', { posts })
  res.render('index', {
    title: 'Belka',
    body: 'Wow'
  })
}

exports.getPage = getPage
