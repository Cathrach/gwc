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
        info = '<div class="container-fluid gameWindow">';
        info += "<div class='container-fluid game-header'><h3 class='game-name'>" + list['results'][0]['trackName'] + ": " + list['results'][0]['artistName'] + "</h3><h3 class='game-price'>" + list['results'][0]['formattedPrice'] + "</h3></div>";
        info += "<div class='container-fluid gamePics'><img src='" + list['results'][0]['artworkUrl100'] + "' class='gameIcon' /><img src='" + list['results'][0]['screenshotUrls'][0] + "' class='gameScreenshot' /></div>";
        info += "<div class='container-fluid gameInfo'><h3 style='float: right;'>Tags:</h3></div>";
        info += "<div class='container-fluid gameTags'><p>" + tagStr + "</p></div></div>";

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
    selected = selected.filter(Boolean);
  }
  if (selected.length > 0) {
    filterByTags(selected);
  }
})
