var gameList;

function buildList(data) {
  for (var i in data) {
    var iTunesData;
    var iTunesURL = 'https://itunes.apple.com/lookup?id=' + data[i].ID;
    $.getJSON(iTunesURL, function( data ) {
      iTunesData = data;
    })
    console.log(data);
  }
}
