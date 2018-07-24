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
        this.checkChart();
        //this.fixMap();
        //this.fixSecondMap();
        this.setStep();
    },

    updateValues: function() {
        windowTop = window.pageYOffset || document.documentElement.scrollTop;
        windowHeight = $(window).height();
        chartHeight = $('.uit-chart').height() + 48;
    },

    checkChart: function() {
        var chartToShow = null;
        var globe = this;
        $('.uit-chart').each(function(i, el) {
            if (windowTop > $(el).offset().top - this.percentageOfHeight(1)) {
                chartToShow = $(el).data('chart');
                //console.log($(el).data('chart'));
            }
        }.bind(this));
        //console.log(chartToShow);
        if (chartToShow === 'first') {
            globe.fixMap();
            //console.log('first chart');
        } else if (chartToShow === 'second') {
          globe.fixSecondMap();
        }
    },

    fixMap: function() {
        if (windowTop > $('#uit-chart__point-first').offset().top - this.percentageOfHeight(1)) {
            $('#uit-chart-first').removeClass('is-fixed');
            $('.uit-step__last').attr('style', 'margin-bottom: -80px');
        } else {
          $('#uit-chart-first').addClass('is-fixed');
          $('.uit-step__last').removeAttr('style');
          //console.log('yoyoyo');
        }
    },

    fixSecondMap: function() {
        $('#uit-chart-second').addClass('is-fixed');
        $('#uit-chart-second__copy').attr('style', 'margin-top: 400px');
        /*
        if (windowTop > $('#uit-chart__point-second').offset().top - this.percentageOfHeight(1)) {
            $('#uit-chart-second').removeClass('is-fixed');
            $('.uit-step__last--second').attr('style', 'margin-bottom: -80px');
            //console.log('heyheyhey');
        } else {
            $('#uit-chart-second').addClass('is-fixed');
            $('.uit-step__last--second').removeAttr('style');
          //console.log('nonononoooo');
        }
        */
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
