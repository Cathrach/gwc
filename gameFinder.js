var gameList;
var filteredList;
var shown;

function buildList(list) {
  for (var i in list) {
    var iTuneslist;
    var info;
    var tags = list[i].Tags.split(',');
    console.log(tags);
    var tagstring = '';
    for (var j in tags) {
      tagstring += tags[j] + ', ';
    }
    tagstring = tagstring.slice(0, -2);
    console.log(tagstring);
    $.ajax({
      listType: "jsonp",
      url: "https://itunes.apple.com/lookup?id=" + list[i].ID,
    }).done( function(data) {
      // data['results'][0] is what we're looking at~
      info = '<div class="container-fluid" style="width: 650px; height: 225px; float: right; margin-left: 10px; margin-top: 10px; border-style: solid; border-radius: 10px; border-color: teal; position: relative;"><div class="container-fluid" style="width: 150px; float: left; margin-left: 10px;"><h6>' + data['results'][0]['trackName'] + '</h6><img src="' + data['results'][0]['artworkUrl100'] + '" width="100" height="100"><br><h6>' + data['results'][0]['artistName'] + '</h6></div><div class="container-fluid" style="width: 150px; float: left;"><img src="' + data['results'][0]['screenshotUrls'][0] + '" style="height: 200px; margin-top: 10px;"></div><div class="container-fluid" style="width: 250px; margin-right: 10px; margin-left: 20px; margin-top: 20px; float: left;"><h5>Tags</h5><p>' + tagstring;
      info += '</p><a href="' + data['results'][0]['trackViewUrl'] + '">App Store</a></div><div class="container-fluid" style="width: 60px; height: 25px; margin-right: 0px; border-style: solid; border-color: blue; border-radius: 5px; position: absolute; bottom: 5px; right: 5px;"><p style="margin-left: -10px; float: left;">' + data['results'][0]['formattedPrice'] + '</p></div></div>';

      gameList.push({"name": data['results'][0]['trackName'], "collapsedInfo": info, "developer": data['results'][0]['artistName'], "tags": tags});
    })
  }
  filteredList = gameList;
}

$('#searchNameField').keypress( function(event) {
  if (event.keyCode == 13) {
    searchName($('#searchNameField').val());
  }
})
