var apiKey = 'cc9e9692411c4e6fa61260be9516ccd1';
var topNewsRoot = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey='+apiKey;

var Sports = 'https://newsapi.org/v2/top-headlines?sources=espn&'+
             'apiKey='+apiKey;

var Buzzfeed = "https://newsapi.org/v2/top-headlines?sources=buzzfeed&"+
          'apiKey='+apiKey;

var Tech = "https://newsapi.org/v2/top-headlines?sources=techcrunch&"+
          'apiKey='+apiKey;        

$('#loadingGIF').show();

$( document ).ready(function() {
  getNews(topNewsRoot);
  $('#loadingGIF').toggle();
});

function getNews(root){
      $.ajax({
          url: root,
          method: 'GET'
        }).then(function(data) {
          var articles = data.articles;
          $('#main.container').html("");
          for(i=0; i<5; i++){
            a = articles[i];
            html = addArticle(a, i+1);
            $('#main.container').append(html);
          }
        });
}


function addArticle(article, i){
  r = '<article class=' + '"article" data-title="'+article.title+
                          '" data-description="'+article.description+
                          '" data-source="'+article.source.name+
                          '" data-url="'+article.url+
                          '">' +
            '<section class="featuredImage">'+
              '<img src="'+article.urlToImage+'" alt="">' +
            '</section>'+
            '<section class="articleContent">'+
                '<a href="#"><h3>'+article.title + '</h3></a>'+
                '<h6>'+article.source.name+'</h6>' +
            '</section>'+
            '<section class="impressions">'+
              ''+i+''+
            '</section>'+
            '<div class="clearfix"></div>'+
          '</article>';
    return r;
}

$('#main.container').on('click', 'article', function(){
  title = $(event.target).closest("article").data("title");
  description = $(event.target).closest("article").data("description");
  source = $(event.target).closest("article").data("source");
  url = $(event.target).closest("article").data("url");
  $('#popUp.loader').html('<button class="closePopUp">X</button> <div class="container"></div>');
  $('#popUp.loader .container').html('<h1>' + title + '</h1><p>' + description + 
    '</p><a href="'+url+'" class="popUpAction" target="_blank">Read more from '+source+'</a>');

  $('#popUp.loader').attr("class", "loader");
  $('#popUp.loader .container').show();
  
});

$('#popUp.loader').on('click', 'button', function(){
    $('#popUp.loader').attr("class", "loader hidden");
});

$('.container').on('click', 'ul.pages', function(){
     page = $(event.target).closest("li").data("name");
     switch(page) {
     case "Sports":
        getNews(Sports);
        break;
     case "Buzzfeed":
        getNews(Buzzfeed);
        break;
      case "Tech":
        getNews(Tech);
        break;
    default:
        getNews(topNewsRoot);
}

});


