'use strict';
// 删除读者
const app=require('../WebApp');
const getHtml = require('./getHtml');
const db=require("../coSqlite3");


app.route('/deleteReader','post', function*(req, res) {
  console.log('删除读者...');
  const rID = req.body.rID;
  if (!rID) {
    return getHtml("<div id='result' style='display:none'>3</div><p>删除读者失败：请填写证号</p>");
  }

  // 查询证件号是否存在
  const findReader = 'select rID from readers where rID=?';
  try {
    const readers = yield db.execSQL(findReader, [rID]);
    console.log('readers: ', readers);
    if (readers.length === 0) {
      return getHtml("<div id='result' style='display:none'>1</div><p>删除读者失败：该证号不存在</p>");
    }
  } catch(e) {
    console.log('删除读者失败：', JSON.stringify(e));
    return getHtml("<div id='result' style='display:none'>3</div><p>删除读者失败：" + JSON.stringify(e)+"</p>");
  }

  // 查询是否有未归还书籍
  const findLend = 'select rID from lend where rID = ?';
  try {
    const lendList = yield db.execSQL(findLend, [rID]);
    if (lendList.length > 0) {
      return getHtml("<div id='result' style='display:none'>2</div><p>删除读者失败：该读者尚有书籍未归还</p>");
    }
  } catch (e) {
    console.log('删除读者失败：', JSON.stringify(e));
    return getHtml("<div id='result' style='display:none'>3</div><p>删除读者失败：" + JSON.stringify(e)+"</p>");
  }

  const deleteSql = 'delete from readers where rID = ?';
  try {
    const res = yield db.execSQL(deleteSql, [rID]);
    console.log('删除读者成功！');
    return getHtml("<div id='result' style='display:none'>0</div><p>删除读者成功</p>");
  } catch(e) {
    console.log('删除读者失败：', JSON.stringify(e));
    return getHtml("<div id='result' style='display:none'>0</div><p>删除读者失败：" + JSON.stringify(e)+"</p>");
  }



});
