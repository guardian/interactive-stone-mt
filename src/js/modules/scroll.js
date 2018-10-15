var windowTop, windowHeight, windowBottom, steps = [], chartHeight;
var currentChart = 1;
var currentQuote = 0;
var currentStep = 1;
var video = document.getElementById('bgvid');
var source = document.createElement('SOURCE');

module.exports =  {
    init: function() {
        this.bindings();
        this.getSteps();
        this.onScroll();

    },

    getSteps: function() {
        $('.uit-step').each(function(i, el) {
            steps.push($(el).attr('data-step'));
        }.bind(this));
    },

    bindings: function() {
        $(window).scroll(function() {
            this.onScroll();
        }.bind(this));

        $(window).resize(function() {
            this.onScroll();
        }.bind(this));

        $('#video_svg_thurmond').click(function(e) {
            e.preventDefault();
            $('#uit-section-divider-3').html('<iframe id="interview_vid" src="//www.youtube.com/embed/9B7te184ZpQ?rel=0autoplay=1" frameborder="0" allowfullscreen></iframe>');
            //$('#uit-section-divider-1').hide();
            console.log('third');
        }.bind(this));

        $('#video_svg_colletti').click(function(e) {
            e.preventDefault();
            $('#uit-section-divider-2').html('<iframe id="interview_vid" src="//www.youtube.com/embed/9B7te184ZpQ?rel=0autoplay=1" frameborder="0" allowfullscreen></iframe>');
            //$('#uit-section-divider-2').hide();
            console.log('second');
        }.bind(this));

        $('#video_svg_desmond').click(function(e) {
            e.preventDefault();
            $('#uit-section-divider-1').html('<iframe id="interview_vid" src="//www.youtube.com/embed/9B7te184ZpQ?rel=0autoplay=1" frameborder="0" allowfullscreen></iframe>');
            //$('#uit-section-divider-3').hide();
            console.log('first');
        }.bind(this));

        source.setAttribute("id", "testng");
        source.setAttribute('src', '{{ path }}/assets/stone-mt.mp4');
        video.append(source);
        video.play();
    },

    onScroll: function() {
        this.updateValues();
        this.fixMap();
        this.unFixMap();
        this.setStep();
        this.showQuote();
    },

    updateValues: function() {
        windowTop = window.pageYOffset || document.documentElement.scrollTop;
        windowHeight = $(window).height();
        windowBottom = windowTop + windowHeight;
        chartHeight = $('.uit-chart').height() + 48;
    },

    fixMap: function() {
        //check to see if top of marker div is in view; if it is, fix the map
        $('.uit-chart-marker').each(function(i, el) {
            if (windowTop > $(el).offset().top - this.percentageOfHeight(1)) {
                ($('#uit-chart-number--'+ $(el).attr('data-chart'))).addClass('is-fixed');
                $('#uit-chart-last--'+ $(el).attr('data-chart')).removeClass('is-fixed');
                $('#uit-chart-last--'+ $(el).attr('data-chart')).addClass('uit-chart-marker-fixed');
                currentChart = $(el).attr('data-chart');
            } else {
                $('#uit-chart-number--'+ $(el).attr('data-chart')).removeClass('is-fixed');
                $('#uit-chart-last--'+ $(el).attr('data-chart')).addClass('is-fixed');
                $('#uit-chart-last--'+ $(el).attr('data-chart')).removeClass('uit-chart-marker-fixed');
            }
        }.bind(this));
    },

    unFixMap: function() {
        //check to see if last point is in view. when it's at top, unfix the map
        $('.uit-chart-marker-fixed').each(function(i, el) {
            if (windowTop > $(el).offset().top - this.percentageOfHeight(1)) {
                ($('#uit-chart-number--'+ $(el).attr('data-chart'))).removeClass('is-fixed');
                $('#uit-chart-last--'+ $(el).attr('data-chart')).addClass('is-fixed');
                $('#uit-steps--'+ $(el).attr('data-chart')).addClass('is-fixed');
            } else {
                $('#uit-chart-number--'+ $(el).attr('data-chart')).addClass('is-fixed');
                $('#uit-chart-last--'+ $(el).attr('data-chart')).removeClass('is-fixed');
                currentChart = $(el).attr('data-chart');
            }
        }.bind(this));
    },

    setStep: function() {
        var stepToShow = null;
        $('.uit-step').each(function(i, el) {
            if (windowTop > $(el).offset().top - this.percentageOfHeight(50)) {
                stepToShow = $(el).data('step');
            }
        }.bind(this));
        this.highlightStates(stepToShow);
    },

    showQuote: function() {
        var quoteToShow = null;
        $('.uit-section-divider').each(function(i, el) {
            if ((windowTop > $(el).offset().top - this.percentageOfHeight(40)) &&
            windowTop < ($(el).offset().top + $(el).height())) {
                //console.log('value1: ' + $(el).offset().top);
                quoteToShow = $(el).data('step');
            }
        }.bind(this));
        this.highlightQuotes(quoteToShow);

        //console.log('windowTop: ' + windowTop);
        //console.log('windowBottom: ' + windowBottom);
        //console.log(quoteToShow);
        //this.highlightStates(stepToShow);
    },

    highlightStates: function(stepToShow) {

        //console.log(currentStep);
        if ((currentStep != stepToShow) || stepToShow == null){
            switch (stepToShow) {
                case 1:
                //video.pause();
                source.setAttribute('src', '{{ path }}/assets/stone-mt.mp4');
                video.load();
                video.play();
                break;
                case 2:
                //video.pause();
                source.setAttribute('src', '{{ path }}/assets/placeholder.mp4');
                video.load();
                video.play();
                break;
                case 3:
                //video.pause();
                source.setAttribute('src', '{{ path }}/assets/trimmed_video.mp4');
                video.load();
                video.play();
                break;
            }
            currentStep = stepToShow;
        }
        /*
        $('#bgvid-source-link')
        .attr('src', '{{ path }}/assets/placeholder.mp4');
        */
    },

    highlightQuotes: function(quoteToShow) {
        if ((currentQuote != quoteToShow) || quoteToShow == null){
            $('#uit-section-divider-' + currentQuote + ' .uit-quote-subhead').css('opacity', "0");
            $('#uit-section-divider-' + quoteToShow + ' .uit-quote-subhead').css('opacity', "1");
            currentQuote = quoteToShow;
        }
    },

    percentageOfHeight: function(percentage) {
        return (windowHeight / 100) * percentage;
    },

};
