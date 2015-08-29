var gameList;
var filteredList;
var shown;
var inList = false;

// Make a function that takes an array of iTunes objects as a parameter and adds the HTMl for each game to filteredList (or something). 
// If there are tags, display them too (check to see if the ID exists in the gameList).

function getObjects(itunesArray) {
  inList = false;
  filteredList = [];
  for (var i in itunesArray['results']) {
    var info;
    var tags = [];
    var tagStringLinks = '';
    var tagString = '';
    info = '<div class="container-fluid gameWindow">';
    info += "<div class='container-fluid game-header'>";
    info += "<h5 class='game-name'><a href='" + itunesArray['results'][i]['trackViewUrl'] + "' target='_blank'>" + itunesArray['results'][i]['trackName'] + "</a>: <a href='" + itunesArray['results'][i]['artistViewUrl'] + "' target='_blank'>" + itunesArray['results'][i]['artistName'] + "</a></h5><h5 class='game-price'>" + itunesArray['results'][i]['formattedPrice'] + "</h5></div>";
    info += "<div class='container-fluid gamePics'>";
    info += '<a href="#gameModal" class="gameIcon" data-keyboard="true" data-toggle="modal" data-img-url="' + itunesArray["results"][i]["artworkUrl100"] + '" data-name="' + itunesArray["results"][i]["trackName"] + '" data-developer="' + itunesArray["results"][i]["artistName"] + '" data-price="' + itunesArray["results"][i]["formattedPrice"] + '" data-rating="';
    info += itunesArray["results"][i]["averageUserRatingForCurrentVersion"] + '" data-rates="' + itunesArray["results"][i]["userRatingCountForCurrentVersion"] + '" data-ios="' + itunesArray["results"][i]["minimumOsVersion"] + '" data-description="'
    info += itunesArray["results"][i]["description"].replace(/\n/g, "<br>").replace(/"/g, "&quot;");
    info += '">';
    info += "<img src='" + itunesArray['results'][i]['artworkUrl100'] + "' class='gameIcon'/></a>";
    info += "<a href='#screenshotModal' class='gameScreenshot' data-keyboard='true' data-toggle='modal' data-img-url='" + itunesArray['results'][i]['screenshotUrls'][0] + "'><img src='" + itunesArray['results'][i]['screenshotUrls'][0] + "' class='gameScreenshotOne'/></a>";
    info += "<a href='#screenshotModal' class='gameScreenshot' data-keyboard='true' data-toggle='modal' data-img-url='" + itunesArray['results'][i]['screenshotUrls'][1] + "'><img src='" + itunesArray['results'][i]['screenshotUrls'][1] + "' class='gameScreenshotTwo'/></a>";
    info += "<a href='#screenshotModal' class='gameScreenshot' data-keyboard='true' data-toggle='modal' data-img-url='" + itunesArray['results'][i]['screenshotUrls'][2] + "'><img src='" + itunesArray['results'][i]['screenshotUrls'][2] + "' class='gameScreenshotThree'/></a></div>";
    for (var j in gameList) {
      inList = false;
      tagStringLinks = '';
      tagString = '';
      if (gameList[j]['id'] == itunesArray['results'][i]['trackId']) {
        tags = gameList[j]['tags'];
        for (var k in tags) {
          tagStringLinks += '<a href="javascript:filterByTags([&quot;' + tags[k] + '&quot;])">' + tags[k] + '</a>, ';
        }
        tagStringLinks = tagStringLinks.slice(0, -2);
        info += "<div class='container-fluid gameInfo'><h4 style='float: right;'>Tags:</h4></div>";
        info += "<div class='container-fluid gameTags'><p>" + tagStringLinks + "</p></div></div>";
        filteredList.push({"name": itunesArray['results'][i]['trackName'], "collapsedInfo": info, "developer": itunesArray['results'][i]['artistName'], "tags": tags});
        inList = true;
        break;
      }
    }
    if (inList == false) {
      tags = [];
      info += "<div class='container-fluid gameInfo'><h4 style='float: right;'>Tags:</h4></div>";
      info += "<div class='container-fluid gameTags'><p>" + tagStringLinks + "</p></div></div>";
      filteredList.push({"name": itunesArray['results'][i]['trackName'], "collapsedInfo": info, "developer": itunesArray['results'][i]['artistName'], "tags": tags});
    }
  }
}

function buildList(data) {
  for (var i in data) {
    var info;
    var tags = data[i].Tags.split(',');
    var tagstringlinks = '';
    var tagstring = '';
    for (var j in tags) {
      tagstringlinks += '<a href="javascript:filterByTags([&quot;' + tags[j] + '&quot;])">' + tags[j] + '</a>, ';
      tagstring += tags[j] + ', ';
    }
    tagstring = tagstring.slice(0, -3);
    (function(tag, tagStr, tagStrLinks, url){
      $.ajax({
        dataType: "jsonp",
        url: "https://itunes.apple.com/lookup?id=" + url,
      }).done( function(list) {
        // list['results'][0] is what we're looking at~
        info = '<div class="container-fluid gameWindow">';
        info += "<div class='container-fluid game-header'>";
        info += "<h5 class='game-name'><a href='" + list['results'][0]['trackViewUrl'] + "' target='_blank'>" + list['results'][0]['trackName'] + "</a>: <a href='" + list['results'][0]['artistViewUrl'] + "' target='_blank'>" + list['results'][0]['artistName'] + "</a></h5><h5 class='game-price'>" + list['results'][0]['formattedPrice'] + "</h5></div>";
        info += "<div class='container-fluid gamePics'>";
        info += '<a href="#gameModal" class="gameIcon" data-keyboard="true" data-toggle="modal" data-img-url="' + list["results"][0]["artworkUrl100"] + '" data-name="' + list["results"][0]["trackName"] + '" data-developer="' + list["results"][0]["artistName"] + '" data-price="' + list["results"][0]["formattedPrice"] + '" data-rating="';
        info += list["results"][0]["averageUserRatingForCurrentVersion"] + '" data-rates="' + list["results"][0]["userRatingCountForCurrentVersion"] + '" data-tags="' + tagStr + '" data-ios="' + list["results"][0]["minimumOsVersion"] + '" data-description="'
        info += list["results"][0]["description"].replace(/\n/g, "<br>").replace(/"/g, "&quot;");
        info += '">';
        info += "<img src='" + list['results'][0]['artworkUrl100'] + "' class='gameIcon'/></a>";
        // info += '<a href="#screenshotModal" class="screenshots" data-keyboard="true" data-toggle="modal" data-local="screenshotCarousel">'
        info += "<a href='#screenshotModal' class='gameScreenshot' data-keyboard='true' data-toggle='modal' data-img-url='" + list['results'][0]['screenshotUrls'][0] + "'><img src='" + list['results'][0]['screenshotUrls'][0] + "' class='gameScreenshotOne'/></a>";
        info += "<a href='#screenshotModal' class='gameScreenshot' data-keyboard='true' data-toggle='modal' data-img-url='" + list['results'][0]['screenshotUrls'][1] + "'><img src='" + list['results'][0]['screenshotUrls'][1] + "' class='gameScreenshotTwo'/></a>";
        info += "<a href='#screenshotModal' class='gameScreenshot' data-keyboard='true' data-toggle='modal' data-img-url='" + list['results'][0]['screenshotUrls'][2] + "'><img src='" + list['results'][0]['screenshotUrls'][2] + "' class='gameScreenshotThree'/></a></div>";
        info += "<div class='container-fluid gameInfo'><h4 style='float: right;'>Tags:</h4></div>";
        info += "<div class='container-fluid gameTags'><p>" + tagStrLinks + "</p></div></div>";

        gameList.push({"name": list['results'][0]['trackName'], "collapsedInfo": info, "developer": list['results'][0]['artistName'], "tags": tag, "id": list['results'][0]['trackId']});
      });
    })(tags, tagstring, tagstringlinks, data[i].ID);
  }
}

$(document).on('click', '.gameIcon', function(e) {
  $('#game-icon img').attr('src', $(this).attr('data-img-url'));
  $('#game-info').html('<h5>' + $(this).attr('data-name') + ': ' + $(this).attr('data-developer') + '</h5><h5>' + $(this).attr('data-price') + '</h5>');
  $('#game-rating').html('<p>' + $(this).attr('data-rating') + '/5 (' + $(this).attr('data-rates') + ' ratings)</p>');
  $('#ios-version').html('<p>Minimum iOS Version: ' + $(this).attr('data-ios') + '</p>');
  $('#info-page').html('<p>' + $(this).attr('data-description') + '</p>');
  $('#gameModal').modal('show');
})

$(document).on('click', '.gameScreenshot', function(e) {
  $('#game-screen img').attr('src', $(this).attr('data-img-url'));
})

$(document).on('click', '#filter', function(e) {
  var selected = [];
  for (var check in $('input[name="sorting"]:checked')) {
    selected.push($('input[name="sorting"]:checked')[check].value);
    selected = selected.filter(Boolean);
  }
   filterByTags(selected);
   $('#searchField').val('');
})

$(document).on('click', '#clearFilter', function(e) {
	$('input[name="sorting"]').prop('checked', false);
	filterByTags([]);
  $('#searchField').val('');
})

$(document).on('click', '#searchNameBtn', function(e) {
  searchDevOrName($('#searchField').val());
})
