const app=require('../WebApp');
const getHtml = require('./getHtml');
const db=require("../coSqlite3");

app.route('/login', 'get', function*(req, res) {
  // return JSON.stringify({ success: true })
  // return getHtml("<div style='margin:20px auto; width: 200px'><div><label style='width:48px'>用户名:</label><input type='text'/></div><div><label style='width:48px'>密码:</label><input type='text'/></div><div><button>登录</button></div></div>")
  return getHtml(`
    <form class="form-horizontal" style="margin: 160px 0">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-5 control-label">账号：</label>
    <div class="col-sm-3">
      <input id="input1" type="text" class="form-control" id="inputEmail3" placeholder="请输入账号">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-5 control-label">密码：</label>
    <div class="col-sm-3">
      <input id="input2" type="password" class="form-control" id="inputPassword3" placeholder="请输入密码">
    </div>
  </div>
  <div class="form-group">
    <div class="col-xs-offset-6 col-sm-5">
      <button id="submit" type="button" class="btn btn-primary">登录</button>
    </div>
  </div>
</form>
<script>
window.onload= function(){
  $('h3').hide();
}
$('#submit').click(function() {
  var aID = $('#input1').val();
  var aPassword = $('#input2').val();
  console.log(aID, aPassword);
  if(aID == 'admin' && aPassword == 'admin') {
    window.location.href = '/__index.htm';
  } else {
    alert('密码与账号不符，请重新输入')
  }
})
</script>
    `)
})

app.route('/login', 'post', function*(req, res) {
  console.log('req: ', req)
  console.log('res: ', res)
  const aID = req.body.aID;
  const aPassword = req.body.aPassword;
  if(aID === 'admin' && aPassword === 'admin') {
    return JSON.stringify({ success: true })
  }

  return JSON.stringify({ success: false, message: 'password error' })

  // let sql = `select * from admin where aID = ${aID} and aPassword = ${aPassword}`;
  // try {
  //   const admin = yield db.execSQL(sql);
  //   if (admin.length === 0) {
  //     return JSON.stringify({ success: false, message: 'USER NOT EXIST' })
  //   }
  //   if (admin[0].password === aPassword) {
  //     return JSON.stringify({ success: true })
  //   }
  //   return JSON.stringify({ success: false, message: 'password error' })
  // } catch(e) {
  //
  // }
})
