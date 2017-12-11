'use strict';
// 增加书籍数量
const app=require('../WebApp');
const getHtml = require('./getHtml');
const db=require("../coSqlite3");


app.route('/addBookNumber','post', function*(req, res) {
  console.log('增加书的数量...');
  const bID = req.body.bID;
  const bCnt = req.body.bCnt;
  if (!bID) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：请填写书的ISBN编号</p>");
  }
  if (!bCnt) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：请填写书籍的数量</p>");
  }
  if (!(parseInt(bCnt, 10) > 0)) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：书籍数量应该>0</p>");
  }

  const sqlFind = 'select bCnt,bCntLeft from books where bID=?';
  try {
    const books = yield db.execSQL(sqlFind, [bID]);
    if (books.length === 0) {
      console.log('[ERROR]该书不存在：', JSON.stringify(books));
      return getHtml("<div id='result' style='display:none'>1</div><p>该书不存在，请仔细核对书本的ISBN编号</p>");
    }
    // console.log('books: ', books);
    const bCntOld = books[0].bCnt;
    const bCntLeftOld = books[0].bCntLeft;
    const bCntNew = parseInt(bCntOld, 10) + parseInt(bCnt, 10);
    const bCntLeftNew = parseInt(bCntLeftOld, 10) + parseInt(bCnt, 10);
    // console.log('bCntNew: ', bCntNew);
    const sqlUpdate = 'update books set bCnt=?,bCntLeft=? where bID=?';
    const params = [bCntNew, bCntLeftNew, bID];
    if (!(/\d+/.test(bCntNew))) {
      console.log('[ERROR]添加新书出错，数量格式错误');
      return getHtml("<div id='result' style='display:none'>2</div><p>添加图书出错：图书数量格式错误</p>");
    }
    try {
      yield db.execSQL(sqlUpdate, params);
      console.log('增加书的数量成功！');
      return getHtml("<div id='result' style='display:none'>0</div><p>成功</p>");
    } catch (e) {
      console.log('[ERROR]增加书的数量出错：', JSON.stringify(e));
      return getHtml("<div id='result' style='display:none'>2</div><p>添加图书出错：" + JSON.stringify(e)+"</p>");
    }

  } catch(e) {
    console.log('[ERROR]查询数据库出错：', JSON.stringify(e));
    return getHtml("<div id='result' style='display:none'>2</div>查询数据库出错：" + JSON.stringify(e));
  }

  return getHtml("<div id='result' style='display:none'>0</div><p>添加图书数量成功</p>");
});
