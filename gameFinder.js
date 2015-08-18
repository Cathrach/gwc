var gameList;
var filteredList;
var shown;

function buildList(data) {
  for (var i in data) {
    var iTunesdata;
    var info;
    var tags = data[i].Tags.split(',');
    var tagstring = '';
    for (var j in tags) {
      tagstring += tags[j] + ', ';
    }
    tagstring = tagstring.slice(0, -2);
    (function(tag, tagStr, url){
      $.ajax({
        dataType: "jsonp",
        url: "https://itunes.apple.com/lookup?id=" + url,
      }).done( function(list) {
        // list['results'][0] is what we're looking at~
        info = '<div class="container-fluid" style="width: 650px; height: 225px; float: right; margin-left: 10px; margin-top: 10px; border-style: solid; border-radius: 10px; border-color: teal; position: relative;"><div class="container-fluid" style="width: 150px; float: left; margin-left: 10px;"><h6>' + list['results'][0]['trackName'] + '</h6><img src="' + list['results'][0]['artworkUrl100'] + '" width="100" height="100"><br><h6>' + list['results'][0]['artistName'] + '</h6></div><div class="container-fluid" style="width: 150px; float: left;"><img src="' + list['results'][0]['screenshotUrls'][0] + '" style="height: 200px; margin-top: 10px;"></div><div class="container-fluid" style="width: 250px; margin-right: 10px; margin-left: 20px; margin-top: 20px; float: left;"><h5>Tags</h5><p>' + tagStr;
        info += '</p><a href="' + list['results'][0]['trackViewUrl'] + '">App Store</a></div><div class="container-fluid" style="width: 60px; height: 25px; margin-right: 0px; border-style: solid; border-color: blue; border-radius: 5px; position: absolute; bottom: 5px; right: 5px;"><p style="margin-left: -10px; float: left;">' + list['results'][0]['formattedPrice'] + '</p></div></div>';

        gameList.push({"name": list['results'][0]['trackName'], "collapsedInfo": info, "developer": list['results'][0]['artistName'], "tags": tag});
      });
    })(tags, tagstring, data[i].ID);
  }
  filteredList = gameList;
}

$(document).on('click', '#searchNameBtn', function(e) {
  e.preventDefault();
  searchName($('#searchNameField').val());
})

$(document).on('click', '#searchDevBtn', function(e) {
  e.preventDefault();
  searchDev($('#searchDevField').val());
})

$(document).on('click', '#filter', function(e) {
  var selected = [];
  for (var check in $('input[name="sorting"]:checked')) {
    selected.push($('input[name="sorting"]:checked')[check].value);
  }
  selected = selected.filter( Boolean );
  console.log(selected);
})
