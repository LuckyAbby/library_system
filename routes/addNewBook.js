'use strict';
// 添加新书
const app=require('../WebApp');
const getHtml = require('./getHtml');
const db=require("../coSqlite3");


app.route('/addNewBook','post', function*(req, res) {
  // console.log('req.body: ', req.body);
  console.log('增加新书...');
  const bID = req.body.bID;
  const bName = req.body.bName;
  const bPub = req.body.bPub;
  const bDate = req.body.bDate;
  const bAuthor = req.body.bAuthor;
  const bMem = req.body.bMem;
  const bCnt = req.body.bCnt;
  if (!bID) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：请填写书本的ISBN编号</p>");
  }
  if (bID.length > 30) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：书号最多30个字符</p>");
  }
  if (!bName) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：请填写书名</p>");
  }
  if (bName.length > 30) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：书名最多30个字符</p>");
  }
  if (!bDate) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：请填写出版日期</p>");
  }
  if (!(/\d{4}-\d{2}-\d{2}/.test(bDate))) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：出版日期提交格式为yyyy-mm-dd</p>");
  }
  if (!bAuthor) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：请填写作者</p>");
  }
  if (bAuthor.length > 20) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：作者最多20个字符<p>");
  }
  if (!bMem) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：请填写图书类别</p>");
  }
  if (bMem.length > 30) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：图书类别要最多30个字符</p>");
  }
  if (!bCnt) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：请填写数量</p>");
  }
  if (!(parseInt(bCnt, 10) > 0)) {
    return getHtml("<div id='result' style='display:none'>2</div><p>您提交的参数有误：数量应该>0</p>");
  }

  const sqlFind = 'select bID from books where bID=?';
  try {
    const books = yield db.execSQL(sqlFind, [bID]);
    if (books.length > 0) {
      console.log('[ERROR]该书已经存在：', JSON.stringify(books));
      return getHtml("<div id='result' style='display:none'>1</div>该书已经存在");
    }

    const sqlInsert = 'insert into books(bID,bName,bPub,bDate,bAuthor,bMem,bCnt, bCntLeft) ' +
      'values(?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [bID, bName, bPub, new Date(bDate).getTime(), bAuthor, bMem, parseInt(bCnt, 10), parseInt(bCnt, 10)];

    try {
      yield db.execSQL(sqlInsert, params);
      // console.log(params);
      console.log('增加新书成功！');
      return getHtml("<div id='result' style='display:none'>0</div><p>添加图书成功</p>");
    } catch (e) {
      console.log('[ERROR]添加新书出错：', JSON.stringify(e));
      return getHtml("<div id='result' style='display:none'>2</div><p>添加新书出错：" + JSON.stringify(e)+"</p>");
    }

  } catch(e) {
    console.log('[ERROR]查询数据库出错：', JSON.stringify(e));
    return getHtml("<div id='result' style='display:none'>2</div><p>查询数据库出错：" + JSON.stringify(e)+"</p>");
  }
});
