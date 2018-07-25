var windowTop, windowHeight, steps = [], chartHeight;

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
    },

    updateValues: function() {
        windowTop = window.pageYOffset || document.documentElement.scrollTop;
        windowHeight = $(window).height();
        chartHeight = $('.uit-chart').height() + 48;
    },

    fixMap: function() {
        //check to see if top of marker div is in view; if it is, fix the map
        $('.uit-chart-marker').each(function(i, el) {
            if (windowTop > $(el).offset().top - this.percentageOfHeight(1)) {
                ($('#uit-chart-number--'+ $(el).attr('data-chart'))).addClass('is-fixed');
                $('#uit-chart-last--'+ $(el).attr('data-chart')).removeClass('is-fixed');
                $('#uit-chart-last--'+ $(el).attr('data-chart')).addClass('uit-chart-marker-fixed');
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
            } else {
              $('#uit-chart-number--'+ $(el).attr('data-chart')).addClass('is-fixed');
              $('#uit-chart-last--'+ $(el).attr('data-chart')).removeClass('is-fixed');
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
        if (stepToShow === 'proposal') {
            $('#uit-chart-img').attr('opacity', '../assets/stone_mountain_3.jpg 1300w');
            $('#uit-chart-img-2').attr('srcset', '../assets/stone_mountain_3.jpg 1300w');
        } else {
          $('#uit-chart-img').attr('srcset', '../assets/stone_mountain_1.jpg 1300w');
        }
        this.highlightStates(stepToShow);
    },

    highlightStates: function(currentStep) {
        for (var step in steps) {
            $('.uit-chart').removeClass('is-' + steps[step])
        }
        $('.uit-chart').addClass('is-' + currentStep);
    },

    percentageOfHeight: function(percentage) {
        return (windowHeight / 100) * percentage;
    },

};
