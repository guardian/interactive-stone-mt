var windowTop, windowHeight, windowBottom, steps = [], chartHeight;
var currentChart = 1;
var currentQuote = 0;
var currentStep = 1;
var video = document.getElementById('bgvid1');
var source = document.createElement('SOURCE');
var video2 = document.getElementById('bgvid2');
var source2 = document.createElement('SOURCE');
var div_height, div_width;

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
            div_height = $('#uit-section-divider-3').height();
            div_width = $('#uit-section-divider-3').width();
            $('#uit-section-divider-3').html('<iframe id="interview_vid_3" src="https://www.youtube.com/embed/DfbKFaexpNY?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
            $('#interview_vid_3').css('height', div_height);
            $('#interview_vid_3').css('width', div_width);
        }.bind(this));

        $('#video_svg_colletti').click(function(e) {
            e.preventDefault();
            div_height = $('#uit-section-divider-2').height();
            div_width = $('#uit-section-divider-2').width();
            $('#uit-section-divider-2').html('<iframe id="interview_vid_2" src="https://www.youtube.com/embed/DfbKFaexpNY?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
            $('#interview_vid_2').css('height', div_height);
            $('#interview_vid_2').css('width', div_width);
        }.bind(this));

        $('#video_svg_desmond').click(function(e) {
            e.preventDefault();
            div_height = $('#uit-section-divider-1').height();
            div_width = $('#uit-section-divider-1').width();
            $('#uit-section-divider-1').html('<iframe id="interview_vid_1" src="https://www.youtube.com/embed/DfbKFaexpNY?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
            $('#interview_vid_1').css('height', div_height);
            $('#interview_vid_1').css('width', div_width);
        }.bind(this));

        source.setAttribute('src', '{{ path }}/assets/stone-mt.mp4');
        video.append(source);
        video.play();
        source2.setAttribute('src', '{{ path }}/assets/placeholder.mp4');
        video2.append(source2);
        video2.pause();
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
        $('.uit-chart').css('margin-bottom', $(window).height());
    },

    fixMap: function() {
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
        $('.uit-chart-marker-fixed').each(function(i, el) {
            if (windowTop > $(el).offset().top - this.percentageOfHeight(1)) {
                ($('#uit-chart-number--'+ $(el).attr('data-chart'))).removeClass('is-fixed');
                $('#uit-chart-last--'+ $(el).attr('data-chart')).addClass('is-fixed');
                $('#uit-steps--'+ $(el).attr('data-chart')).addClass('is-fixed');
            } else {
                $('#uit-chart-number--'+ $(el).attr('data-chart')).addClass('is-fixed');
                $('#uit-chart-last--'+ $(el).attr('data-chart')).removeClass('is-fixed');
                currentChart = $(el).attr('data-chart');
                $('.bgvid').css('position', "absolute");
            }
        }.bind(this));
    },

    setStep: function() {
        var stepToShow = null;
        $('.uit-step').each(function(i, el) {
            if (windowTop > $(el).offset().top - this.percentageOfHeight(70)) {
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
                quoteToShow = $(el).data('step');
            }
        }.bind(this));
        this.highlightQuotes(quoteToShow);
    },

    highlightStates: function(stepToShow) {
        if ((currentStep != stepToShow) || stepToShow == null){
            switch (stepToShow) {
                case 1:
                $('#bgvid2').css('opacity', "0");
                $('#bgvid1').css('opacity', "1");
                video2.pause();
                video.play();
                break;
                case 2:
                $('#bgvid2').css('opacity', "1");
                $('#bgvid1').css('opacity', "0");
                video.pause();
                video2.play();
                break;
            }
            currentStep = stepToShow;
        }
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
