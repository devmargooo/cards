angular.module('app')
    .controller('AppController', function () {

        let self = this;

        self.init = function () {
            Handlebars.registerHelper('if_eq', function(a, b, opts) {
                if(a == b) // Or === depending on your needs
                    return opts.fn(this);
                else
                    return opts.inverse(this);
            });

            let data = {};
            data['cards'] = cards;
            let templateScript = $('#cards').html();
            let template = Handlebars.compile(templateScript);
            $('.cards-list').append(template(data));
        };

    });