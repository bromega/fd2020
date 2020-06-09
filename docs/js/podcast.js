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
        $(data)
            .find("item")
            .each(function(i) {
                const el = $(this);
                const yid = "#podcast" + i;
                const template = `
                <div id="${yid}" class="row podcast" data-wow-duration="500ms">
                    <div class="col-lg-3 col-md-12 col-12">
                        <a href="${el.find("link").text()}" target="_blank">
                            <img src="${thumb}" />
                        </a>
                    </div>
                    <div class="col-lg-9 col-md-12 col-12">
                        <a href="${el.find("link").text()}" target="_blank">
                            <h4>${el.find("title").text()}</h4>
                        </a>
                     </div>
                </div>
                `;
                $('div.podcasts').html($('div.podcasts').html() + template);
                // if (i == 3) {
                //     return false;
                // }
            });
        return $(data);
    }
});