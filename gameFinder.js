var gameList;

function buildList(data) {
  for (var i in data) {
    var iTunesData;
    $.ajax({
      dataType: "jsonp",
      url: "https://itunes.apple.com/lookup?id=" + data[i].ID,
    }).done( function(data) {
      iTunesData = data;
    })
    console.log(iTunesData);
  }
}
