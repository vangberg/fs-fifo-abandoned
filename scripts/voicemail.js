use("ODBC");

var number = "4571991062"
var db = new ODBC("freeswitch", "freeswitch", "sekret");
var sql = "select vmbox_id, number, pin, path, timezone, greeting_file, max_messages from voicemailbox where number='" + number + "'";

if (!db.connect()) {
  console_log("ERR", "Could not connect to database\n");
  exit();
}
if (!db.query(sql)) {
  console_log("ERR", "Could not query database\n");
  exit();
}

if (db.nextRow()) {
  var box = db.getData();
  console_log("INFO", "Found box: " + box.vmbox_id);
}

db.close();

var tmpFile = "/tmp/" + session.uuid + ".wav";

if (session.ready()) {
  session.answer();
  session.recordFile(tmpFile, null, null, 300, 500, 300);
  session.hangup();
}
