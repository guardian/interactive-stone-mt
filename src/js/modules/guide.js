module.exports =  {
    init: function() {
        this.bindings();
    },

    bindings: function() {
        $('.uit-quick-guide-button').click(function(e) {
            e.preventDefault();
            this.showMenu();
        }.bind(this));
    },

    showMenu: function() {
        $('.uit-quick-guide-button').html('  Hide  ');
        $('.uit-hidden-area').addClass('nav-is-expanded');
        $('.uit-quick-guide-button').unbind();
        $('.uit-quick-guide-button').click(function(e) {
            e.preventDefault();
            this.hideMenu();
        }.bind(this));
    },

    hideMenu: function() {
        $('.uit-quick-guide-button').html(' Show  ');
        $('.uit-hidden-area').removeClass('nav-is-expanded');
        $('.uit-quick-guide-button').unbind();
        $('.uit-quick-guide-button').click(function(e) {
            e.preventDefault();
            this.showMenu();
        }.bind(this));
    },

};
