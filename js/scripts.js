$(document).ready(function() {

  $("#loadMore").hide();

  $("#searchbutton").click(function(e) {
    e.preventDefault();
    $("#loadMore").show();

    var api = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&srlimit=36&list=search&srsearch=" +
      $("#searchbox").val();

    $.getJSON(api,
      function(display) {

        var arrayLength = display.query.search.length;

        var results = [];
        for (i = 0; i < arrayLength; i++) {
          results.push("<div class='column is-one-third'><a href='http://en.wikipedia.org/?curid=" +
            display.query.search[i].pageid + "'><div class='card'><div class='card-content'><p id='title' class='title'>" +
            display.query.search[i].title + "</p><p id='description' class='subtitle'>" +
            display.query.search[i].snippet + "</p></div></a></div></div>");
        };
        $(".columns").html(results.join(""));

        $(".columns .card:lt(9)").show();

        var items = 36;
        var shown = 9;
        $("#loadMore").click(function() {

          shown = $(".columns .card:visible").length + 6;
          if (shown < items) {
            $(".columns .card").slice(0, shown).show();
          } else {
            $("#loadMore").hide();
          };
        });
      });
  });
});
