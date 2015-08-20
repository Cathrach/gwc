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
        info += "<div class='container-fluid game-header'>";
        info += "<h5 class='game-name'><a href='" + list['results'][0]['trackViewUrl'] + "'>" + list['results'][0]['trackName'] + "</a>: <a href='" + list['results'][0]['artistViewUrl'] + "'>" + list['results'][0]['artistName'] + "</a></h5><h5 class='game-price'>" + list['results'][0]['formattedPrice'] + "</h5></div>";
        info += "<div class='container-fluid gamePics'>";
        info += '<a href="#gameModal" class="gameIcon" data-keyboard="true" data-toggle="modal" data-img-url="' + list["results"][0]["artworkUrl100"] + '" data-name="' + list["results"][0]["trackName"] + '" data-developer="' + list["results"][0]["artistName"] + '" data-price="' + list["results"][0]["formattedPrice"] + '" data-rating="';
        info += list["results"][0]["averageUserRatingForCurrentVersion"] + '" data-rates="' + list["results"][0]["userRatingCountForCurrentVersion"] + '" data-tags="' + tagStr + '" data-ios="' + list["results"][0]["minimumOsVersion"] + '" data-description="' + list["results"][0]["description"] + '">';
        info += "<img src='" + list['results'][0]['artworkUrl100'] + "' class='gameIcon'/><img src='" + list['results'][0]['screenshotUrls'][0] + "' class='gameScreenshot' /></a></div>";
        info += "<div class='container-fluid gameInfo'><h4 style='float: right;'>Tags:</h4></div>";
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

$(document).on('click', '.gameIcon', function(e) {
  $('#game-icon img').attr('src', $(this).attr('data-img-url'));
  $('#game-info').html('<h5>' + $(this).attr('data-name') + ': ' + $(this).attr('data-developer') + '</h5><h6>' + $(this).attr('data-price') + '</h6>');
  $('#game-rating').html('<p>' + $(this).attr('data-rating') + '/5 (' + $(this).attr('data-rates') + ' ratings)</p>');
  $('#game-tags').html('<p>Tags: ' + $(this).attr('data-tags') + '</p>');
  $('#ios-version').html('<p>Minimum iOS Version: ' + $(this).attr('data-ios') + '</p>');
  $('#info-page').html('<pre>' + $(this).attr('data-description') + '</pre>');
  $('#gameModal').modal('show');
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
