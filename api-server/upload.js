const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const mime = require('mime')
const db = require('./models')

function imageFilter (req, file, cb) {
  if (!file.mimetype.startsWith('image')) {
    return cb(new Error('Only image files are allowed!'), false)
  }
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
    return cb(new Error('Only image files are allowed!'), false)
  }
  cb(null, true)
}

function pdfFilter (req, file, cb) {
  if (!file.originalname.match(/\.(pdf)$/)) {
    return cb(new Error('Only pdf files are allowed!'), false)
  }
  cb(null, true)
}

const options = {
  preview: multer({
    fileFilter: imageFilter,
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../web-server/public/content/preview'))
      },
      filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (_, raw) {
          cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype))
        })
      }
    })
  }),
  photos: multer({
    fileFilter: imageFilter,
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../web-server/public/content/gallery'))
      },
      filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (_, raw) {
          cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype))
        })
      }
    })
  }),
  slides: multer({
    dest: path.resolve(__dirname, '../web-server/public/content/slides'),
    fileFilter: imageFilter
  })
}

module.exports = function init (router) {
  router.put('/preview_image/:postid', options.preview.single('preview'), async (req, res) => {
    const id = req.params.postid
    try {
      await db.Post.update({
        previewUrl: '/content/preview/' + req.file.filename
      }, {
        where: { id }
      })
      res.json({ status: 200 })
    } catch (err) {
      res.json({ status: 400, message: 'Can not update preview image' })
    }
  })

  router.put('/post_image/:postid', options.photos.array('images', 15), async (req, res) => {
    const id = req.params.postid
    const data = req.files.map(file => ({
      postId: id,
      url: '/content/gallery/' + file.filename
    }))
    try {
      await db.PostImage.bulkCreate(data)
      res.json({ status: 200 })
    } catch (err) {
      res.json({ status: 400, message: 'Can not update post images' })
    }
  })
}
