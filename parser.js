module.exports = {
  parse: function parseMessage(message, type) {
    var output = {};
    message = message.toString();
    type += ':';

    var start = message.indexOf(type) + type.length;
    var end = message.indexOf(';', start);
    output.value = message.substring(start, end);

    var d = new Date();
    var second = d.getSeconds();
    var minute = d.getMinutes();
    var hour = d.getHours();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    output.theDate = + new Date();

    return output;
  }
};