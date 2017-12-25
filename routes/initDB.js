'use strict';
// 数据库初始化
const app = require('../WebApp');
const db = require("../coSqlite3");
const getHtml = require('./getHtml');

app.route('/initDB', 'post', function * (req, res) {
  console.log('初始化数据库...');
  const deleteBooks = 'drop table if exists books'
  const createBooks = 'create table books ( ' +
  // 'booksID integer primary key autoincrement, ' +
  'bID text, ' +
  'bName text, ' +
  'bPub text, ' +
  'bDate integer, ' +
  'bAuthor text, ' +
  'bMem text, ' +
  'bCnt integer, ' +
  'bCntLeft integer' +
  ' ); ';
  const deleteReaders = 'drop table if exists readers'
  const createReaders = 'create table readers ( ' +
  // 'readersID integer primary key autoincrement, ' +
  'rID text, ' +
  'rName text, ' +
  'rSex text, ' +
  'rDept text, ' +
  'rGrade integer ' +
  ' ); ';

  const createAdmin = 'create table admin ( ' +
  'aID text, ' +
  'aPassword text'
  ' ); ';

  const deleteLead = 'drop table if exists lend'
  const createLend = 'create table lend ( ' +
  'bID text, ' +
  'rID text, ' +
  'lendDate integer, ' +
  'shouldReturnDate integer, ' +
  'returnDate integer, ' +
  'isReturn integer ' +
  ' ); ';

  try {
    yield db.execSQL(deleteBooks);
    yield db.execSQL(deleteReaders);
    yield db.execSQL(deleteLead);
    yield db.execSQL(createBooks);
    yield db.execSQL(createReaders);
    yield db.execSQL(createLend);
    console.log('初始化数据库成功！');
    return getHtml("<div id='result' style='display:none'>0</div>成功");
  } catch (e) {
    console.log('初始化数据库出错: ', e);
    return getHtml("<div id='result' style='display:none'>0</div>返回信息：" + JSON.stringify(e));
  }

});
