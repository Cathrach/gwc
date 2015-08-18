var gameList;

function buildList(data) {
  for (var i in data) {
    var iTunesData;
    $.ajax({
      dataType: "jsonp",
      url: "https://itunes.apple.com/lookup?id=" + data[i].ID,
    }).done( function(data) {
      console.log(data['results'][0]);
    })
  }
}
