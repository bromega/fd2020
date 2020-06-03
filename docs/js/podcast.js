const RSS_URL0 = `https://feeds.captivate.fm/you-seem-interesting/`;


const channel = $.ajax(RSS_URL0, {
    accepts: {
        xml: "application/rss+xml"
    },
    dataType: "xml",
    success: function(data) {
        // console.log(data);
        const title = $(data).find("title:first").text();
        const thumb = $(data).find("image:first url").text();
        $(data)
            .find("item")
            .each(function(i) {
                const el = $(this);
                const yid = "#podcast" + i;
                const template = `
                  <a href="${el.find("link").text()}" target="_blank">
                    <img src="${thumb}" />
                    <div>
                        <h2>${title}</h2>
                        <h4>${el.find("title").text()}</h4>
                    </div>
                  </a>
                `;
                $(yid).html(template);
                if (i == 3) {
                    return false;
                }
            });
        return $(data);
    }
});