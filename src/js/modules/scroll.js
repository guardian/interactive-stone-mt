var windowTop, windowHeight, windowBottom, steps = [], chartHeight;
var currentChart = 1;
var currentQuote = 0;

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
            if (windowTop > $(el).offset().top - this.percentageOfHeight(80)) {
                stepToShow = $(el).data('step');
            }
        }.bind(this));
        this.highlightStates(stepToShow);
    },

    showQuote: function() {
        var quoteToShow = null;
        $('.uit-section-divider').each(function(i, el) {
            if ((windowTop > $(el).offset().top - this.percentageOfHeight(60)) &&
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

    highlightStates: function(currentStep) {
        for (var step in steps) {
            $('.uit-chart').removeClass('is-' + steps[step])
        }
        $('.uit-chart').addClass('is-' + currentStep);
    },

    highlightQuotes: function(quoteToShow) {
        if (currentQuote != quoteToShow){
            console.log('yea');
            //$('#uit-section-divider' + currentQuote).css('opacity', "0");
            $('#uit-section-divider-' + quoteToShow).css('opacity', "1");
            currentQuote = quoteToShow;
            /*
            for (var step in steps) {
                $('.uit-chart').removeClass('is-' + steps[step])
            }
            $('.uit-chart').addClass('is-' + currentStep);
            */
        }
    },

    percentageOfHeight: function(percentage) {
        return (windowHeight / 100) * percentage;
    },

};
