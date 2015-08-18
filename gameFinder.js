var gameList;

function buildList(data) {
  for (var i in data) {
    var iTunesData;
    $.getJSON('https://itunes.apple.com/lookup?id=' + data[i].ID + '&callback?=', function( data ) {
      iTunesData = data;
    })
    console.log(data);
  }
}
