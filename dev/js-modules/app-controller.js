angular.module('app')
    .controller('AppController', function () {

        let self = this;
        self.count = 0;

        self.init = function () {
            Handlebars.registerHelper("inc", function(value, options)
            {
                return parseInt(value) + 1;
            });

            Handlebars.registerHelper("count", function(value, options)
            {
                return self.count;
            });

            Handlebars.registerHelper('if_eq', function(a, b, opts) {
                if(a == b)
                    return opts.fn(this);
                else
                    return opts.inverse(this);
            });

            $('.cards-list').mouseover(function(e) {
                if (!e.target.classList.contains('cards-list')) return;
                $('.cards-list').css("background-color", "#e9e6d3");
            });
            $('.cards-list').mouseout(function() {
                $('.cards-list').css("background-color", "#f6f2de");
            });


            self.count = cards.length;
            window.location.hash = self.count;

            let data = {};
            data['cards'] = cards;
            let templateScript = $('#cards').html();
            let template = Handlebars.compile(templateScript);
            $('.cards-list').append(template(data));
        };

        self.clickListener = function (e) {
            let target = e.target;
            let card;

            while (!target.classList.contains('cards-list')){
                if ((target.classList.contains('card')) || (target.classList.contains('card--wide'))) {
                    card = target;
                    break;
                }
                target = target.parentNode;
            }
            if (!card) return;

            if (e.shiftKey) {
                let newCard = {};

                if (e.altKey){
                    newCard.type = 'wide';
                } else {
                    newCard.type = 'narrow';
                }
                self.count++;
                window.location.hash = self.count;
                cards.push(newCard);

                let templateScript = $('#new-card').html();
                let template = Handlebars.compile(templateScript);
                $('.cards-list').append(template(newCard));
            } else {
                self.count--;
                window.location.hash = self.count;
                cards.pop();
                document.querySelector('.cards-list')
                    .removeChild(document.querySelector('.cards-list').lastElementChild);
            }

        };

    });