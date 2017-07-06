var submit = document.getElementById('submit')
var formEle = document.getElementById('formId')

submit.onclick = function () {

  // 创建 xhr 对象
  var xhr = new XMLHttpRequest()

  // 创建 FormData 对象
  var data = new FormData(formEle)

  // 设置回调函数
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = xhr.responseText
      console.log(result);
    }
  }

  // open 函数设置参数
  xhr.open('post', '/uploadSingleFile')

  // 发送数据, 注意：使用了FormData就不用设置请求头
  xhr.send(data)

}
