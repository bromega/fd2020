var paginate = function(pageToken) {
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/playlistItems",
        async: false,
        data: {
            key: youtubeKey,
            part: "snippet",
            playlistId: playlistId,
            maxResults: 4,
            pageToken: pageToken
        },
        success: function (data) {
            videos = videos.concat(data.items);
            pageToken = data.nextPageToken;
        }
    });
    return pageToken;
};

$(function () {
    var pageToken = "";
    var i = 0;
    // var videos = [];
    // while pageToken  != undefined {
    while (i < 2) {
        pageToken = paginate(pageToken);
        i = i + 1;
        console.log(pageToken, i);
    }
    for (v in videos) {
        // vid = videos[v].contentDetails.videoId;
        vid = videos[v].snippet.resourceId.videoId;
        title = videos[v].snippet.title;
        yid = "#youtube" + v;
        $(yid).html(`
            <div class="youtube-box">
                <a href="https://www.youtube.com/watch?v=${vid}&list=${playlistId}" target="_blank">
                    <img src="http://i3.ytimg.com/vi/${vid}/maxresdefault.jpg" />
                </a>
            </div>
            <h4>${title}</h4>
        `);
    };
});