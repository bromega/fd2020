const RSS_URL = `https://www.omnycontent.com/d/playlist/4b5f9d6d-9214-48cb-8455-a73200038129/20c219b5-cb90-4f0a-abfa-a95c011f6c58/d8fe4423-74c4-4d40-9048-a95c011ffc53/podcast.rss`;



$.ajax(RSS_URL, {
    accepts: {
        xml: "application/rss+xml"
    },

    dataType: "xml",
    success: function(data) {
        // console.log(data);
        const templates = [];
        const titles = ['Run 1', 'Run 2', 'Pass 1', 'Pass 2'];
        $(data)
            .find("item")
            .each(function(i) {
                const el = $(this);
                const yid = "#onair" + i;
                const template = `
                  <a href="${el.find("link").text()}" target="_blank">
                    <h2>${titles[i]}</h2>
                    <h4>${el.find("title").text()}</h4>
                  </a>
                  <div></div>
                `;
                $(yid).html(template);
                if (i == 3) {
                    return false;
                }
            });
    }
});