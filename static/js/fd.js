$( document ).ready(function() {
    $('div#navigation-sticky-wrapper').css('height', '150px');


    glide = new Glide('.glide', {
        type: 'carousel',
        //startAt: 0,8
        perView: 1,
        autoplay: 1000,
        animationDuration: 2000,
        hoverpause: false
      })
    


    glide.on(['move.after', 'run'], function() {
        // Handler logic ...
        console.log('asdf');
        $('.tlt').textillate({
            minDisplayTime: 2000,
            initialDelay: 0,
            autoStart: true,
            loop: true,
            in: {
                effect: 'flipInY',
                // callback that executes once the animation has finished
                callback: function () {}
            },
            out: {
                effect: 'fadeOut',
                sync: true,
                delay: 2
            }
        });
      });
    
    glide.mount();


    

});

