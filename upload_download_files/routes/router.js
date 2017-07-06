var router = require('express').Router()
var multer = require('multer')
var path = require('path')

var distStorage = multer.diskStorage({
  destination: setDirectionInfo,
  filename: setFileInfo
})

var upload = multer({ storage: distStorage })

var DIRECTORY_PATH = './public/upload_files'

function setFileInfo(req, file, cb) {

  var originalName = file.originalname
  
  var extensionName = path.extname(originalName) // 后缀
  var filename = path.basename(originalName, extensionName) + '_' + Date.now() // 文件名

  filename += extensionName
  cb(null, filename)
}

function setDirectionInfo(req, file, cb) {
  cb(null, DIRECTORY_PATH)
}

router.get('/', function (req, res, next) {
  res.redirect('home.html')
})

// 单文件
router.post('/uploadSingleFile', upload.single('avatar'), function (req, res, next) {
  res.send('上传成功')
})

// 多文件
var arr = [{name: 'avatar', maxCount: 3}]
router.post('/uploadMultiFiles', upload.fields(arr), function (req, res, next) {
  res.send('多文件上传成功!')
})

// 下载
router.get('/download', function (req, res, next) {
  var dir = path.join(__dirname, '../public/upload_files')
  var filePath = path.join(dir, '1.文件上传_1496807099241.wmv')
  console.log(filePath);
  res.download(filePath) 
})

router.get('*', function (req, res, next) {
    res.redirect('/')
})

module.exports = router