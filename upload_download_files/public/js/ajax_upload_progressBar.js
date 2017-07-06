var submit = document.getElementById('submit')
var formEle = document.getElementById('formId')
var progressBar = document.getElementById('progressId')
var spanEle = document.getElementById('spanId')

submit.onclick = function () {
  console.log('submit');
  
  // 创建 xhr 对象
  var xhr = new XMLHttpRequest()

  // 创建form 对象
  var data = new FormData(formEle)


  // 注册结束事件的回调函数  整个ajax结束服务器返回消息
  xhr.onload = function () {
    var result = xhr.responseText
    console.log('result:', result);
    spanEle.innerHTML = result
  }

  // 注册上传进度事件的回调函数  
  xhr.upload.onprogress = function (event) {
    // 执行时机 --- 正在上传的时候 50ms执行一次
    if (event.lengthComputable) {
      var loaded = event.loaded  // 已经上传的数量
      var total = event.total  //总共要上传的数量   字节
      var rate = loaded / total
      rate = Math.floor(rate * 100) + '%'
      console.log(rate)

      progressBar.value = loaded
      progressBar.max = total

    }

  }

  // open 函数
  xhr.open('POST', '/uploadSingleFile')

  // send 函数发送数据
  xhr.send(data)
}