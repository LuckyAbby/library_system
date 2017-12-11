'use strict';
// 查询某个读者的未归还信息
const app=require('../WebApp');
const getHtml = require('./getHtml');
const db=require("../coSqlite3");
const time = require('./timeFormat');


app.route('/findOverdue', 'post', function*(req, res) {
  // console.log('req.body: ', req.body);
  console.log('查询某个读者的未归还信息...');
  const rID = req.body.rID;

  const sqlReader = 'select * from readers where rID=?';
  try {
    const readers = yield db.execSQL(sqlReader, [rID]);
    if (readers.length === 0) {
      console.log('该证号不存在：', rID);
      return getHtml("<div id='result' style='display:none'>1</div>该证号不存在");
    }
  } catch (e) {
    console.log('查询读者失败：', JSON.stringify(e));
    return getHtml("<div id='result' style='display:none'>2</div>查询读者失败：" + JSON.stringify(e));
  }


  let sqlLend = 'select * from lend ' +
  'left join books ' +
  'on lend.bID = books.bID ' +
  'where lend.rID=? and lend.isReturn=0';


  try {
    let html;
    const lendList = yield db.execSQL(sqlLend, [rID]);
    if (lendList.length === 0) {
      html="<p>该读者没有未还的图书</p>";
      return getHtml(html);
    } else {
      console.log('lendList: ', lendList);
      html = '<table border=1 id=\'result\' class="table table-striped table-hover">' +
        '<tr>' +
        '<td>书号</td>' +
        '<td>书名</td>' +
        '<td>借书日期</td>' +
        '<td>应该还书的日期</td>' +
        '<td>是否超期</td>' +
        '</tr>';
      lendList.map((item) => {
        console.log('item: ', item);
        let isOverdue = '否';
        if (new Date().getTime() > item.showReturnTime) {
          isOverdue = '是';
        }
        html += '<tr>' +
          `<td>${item.bID}</td>` +
          `<td>${item.bName}</td>` +
          `<td>${time.timestampToDate(item.lendDate)}</td>` +
          `<td>${time.timestampToDate(item.shouldReturnDate)}</td>` +
          `<td>${isOverdue}</td>` +
        '</tr>';
      });
      html += '</table>';
      console.log('查询某个读者的未归还信息成功：', lendList);
      return getHtml(html);
    }
  } catch(e) {
    console.log('查询某个读者的未归还信息失败：', JSON.stringify(e));
    return getHtml("<div id='result' style='display:none'>2</div><p>查询某个读者的未归还信息失败：" + JSON.stringify(e)+"</p>");
  }

});
