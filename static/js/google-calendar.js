$(function () {
    var options = { month: 'short', day: 'numeric' };
    var formatLocation = function (loc) {
        if (loc === undefined) {
            return {
                name: "",
                street: "",
                citystatezip: ""
            }
        } else {
            items = loc.split(',');
            return {
                name: items[0],
                street: items[1],
                citystatezip: items[2] + "," + items[3] + " " + items[4]
            };
        }
    }
    var formatDescription = function (description) {
        if (description === undefined) {
            return {
                cost: "",
                tickets: ""
            }
        } else {
            items = description.split('\n');
            if (items[1] === undefined) {
                tickets = ""
            } else {
                tickets = `<a href="${items[1]}" target="_blank">Tickets</a>`
            }
            return {
                cost: items[0],
                tickets: tickets
            }
        }
    };

    $.ajax({
        url: googleCalendarURL,
        async: false,
        success: function (data) {
            var shows = data.items.sort((a,b)=>(a.start.dateTime < b.start.dateTime?1:-1))
            shows = shows.filter((s)=>(Date.parse(s.start.dateTime) > Date.now())) 
            $(shows).each(function (i, item) {
                showdate = new Date(item.start.dateTime)
                boxdate = showdate.toLocaleDateString('en-US', options);
                var details = formatDescription(item.description)
                var loc = formatLocation(item.location);
                $('.shows-title').after(`
                <div class="col-lg-3 col-md-6 col-12 wow fadeInDown show" data-wow-duration="500ms">
                    <div class="show-box">${boxdate}</div>
                    <p>${item.summary}</p>
                </div>
            `
                );
            });
        }
    });
});