var gameList;
var filteredList;
var shown;

function buildList(data) {
  for (var i in data) {
    var iTunesdata;
    var info;
    $.ajax({
      dataType: "jsonp",
      url: "https://itunes.apple.com/lookup?id=" + data[i].ID,
    }).done( function(list) {
      console.log(i);
      var tags = data[i].Tags.split(',');
      console.log(tags);
      var tagstring = '';
      for (var j in tags) {
        tagstring += tags[j] + ', ';
      }
      tagstring = tagstring.slice(0, -2);
      console.log(tagstring);
      // list['results'][0] is what we're looking at~
      info = '<div class="container-fluid" style="width: 650px; height: 225px; float: right; margin-left: 10px; margin-top: 10px; border-style: solid; border-radius: 10px; border-color: teal; position: relative;"><div class="container-fluid" style="width: 150px; float: left; margin-left: 10px;"><h6>' + list['results'][0]['trackName'] + '</h6><img src="' + list['results'][0]['artworkUrl100'] + '" width="100" height="100"><br><h6>' + list['results'][0]['artistName'] + '</h6></div><div class="container-fluid" style="width: 150px; float: left;"><img src="' + list['results'][0]['screenshotUrls'][0] + '" style="height: 200px; margin-top: 10px;"></div><div class="container-fluid" style="width: 250px; margin-right: 10px; margin-left: 20px; margin-top: 20px; float: left;"><h5>Tags</h5><p>' + tagstring;
      info += '</p><a href="' + list['results'][0]['trackViewUrl'] + '">App Store</a></div><div class="container-fluid" style="width: 60px; height: 25px; margin-right: 0px; border-style: solid; border-color: blue; border-radius: 5px; position: absolute; bottom: 5px; right: 5px;"><p style="margin-left: -10px; float: left;">' + list['results'][0]['formattedPrice'] + '</p></div></div>';

      gameList.push({"name": list['results'][0]['trackName'], "collapsedInfo": info, "developer": list['results'][0]['artistName'], "tags": tags});
    })
  }
  filteredList = gameList;
}

$('#searchNameField').keypress( function(event) {
  if (event.keyCode == 13) {
    searchName($('#searchNameField').val());
  }
})
