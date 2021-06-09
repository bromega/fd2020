const RSS_URL0 = `https://feeds.captivate.fm/you-seem-interesting/`;


const channel = $.ajax(RSS_URL0, {
    accepts: {
        xml: "application/rss+xml"
    },
    dataType: "xml",
    success: function(data) {
        // console.log(data);
        // const title = $(data).find("title:first").text();
        const thumb = $(data).find("image:first url").text();
        const pods = $(data).find('item')
        pods.each(function(i) {
                const el = $(this);
                const yid = "#podcast" + i;
                const template = `
                <div id="${yid}" class="row podcast" data-wow-duration="500ms">
                    <div class="col-lg-3 col-md-3 col-6">
                        <a href="${el.find("link").text()}" target="_blank">
                            <img src="${thumb}" />
                        </a>
                    </div>
                    <div class="col-lg-9 col-md-9 col-6">
                        <a href="${el.find("link").text()}" target="_blank">
                            <h4 class="podcast-title">${el.find("title").text()}</h4>
                        </a>
                     </div>
                </div>
                `;
                $('div.podcast-container').html($('div.podcast-container').html() + template);

                // limit results
                if (i == 2) {
                    return false;
                }
            });
        return $(data);
    }
});