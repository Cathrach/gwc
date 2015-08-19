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
        info += '<div class="container-fluid gameIcon"><h6>' + list['results'][0]['trackName'] + '</h6><img src="' + list['results'][0]['artworkUrl100'] + '" class="gameArt"><br><h6>' + list['results'][0]['artistName'] + '</h6></div>';
        info += '<div class="container-fluid gameInfo">';
        info += '<img src="' + list['results'][0]['screenshotUrls'][0] + '" class="gameScreenshot"></div>';
        info += '<div class="container-fluid gameTags"><h5>Tags</h5><p>' + tagStr + '</p><a href="' + list['results'][0]['trackViewUrl'] + '">App Store</a></div>';
        info += '<div class="container-fluid gamePrice"><p style="margin-left: -10px; float: left;">' + list['results'][0]['formattedPrice'] + '</p></div></div>';

        gameList.push({"name": list['results'][0]['trackName'], "collapsedInfo": info, "developer": list['results'][0]['artistName'], "tags": tag});
      });
    })(tags, tagstring, data[i].ID);
  }
  filteredList = gameList;
}

$('.ratings_stars').hover(
  function() {
    $(this).prevAll().andSelf().addClass('ratings_over');
    $(this).nextAll().removeClass('ratings_vote');
  },
  function() {
    $(this).prevAll().andSelf().removeClass('ratings_over');
    set_vote($(this).parent());
  }
)

$(document).on('click', '#searchNameBtn', function(e) {
  e.preventDefault();
  searchName($('#searchNameField').val());
})

$(document).on('click', '#searchDevBtn', function(e) {
  e.preventDefault();
  searchDev($('#searchDevField').val());
})

$(document).on('click', '.gameScreenshot', function(e) {
  $('#screenshotPreview').attr('src', $(this).attr('src'));
  $('#imageModal').modal('show');
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
