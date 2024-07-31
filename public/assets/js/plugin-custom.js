"use strict";
document.addEventListener("DOMContentLoaded", function () {

    $(function ($) {
        // Odometer
        $(".odometer").each(function () {
            $(this).isInViewport(function (status) {
                if (status === "entered") {
                    var section = $(this).closest(".counters");
                    section.find(".odometer").each(function () {
                        $(this).html($(this).attr("data-odometer-final"));
                    });
                }
            });
        });
        /* niceSelect */
        // $("select").niceSelect();
        //test for iterating over child elements
        var langArray = [];
        $('.vodiapicker option').each(function () {
            var img = $(this).attr("data-thumbnail");
            var text = this.innerText;
            var value = $(this).val();
            var item = '<li><img src="' + img + '" alt="" value="' + value + '"/><span>' + text + '</span></li>';
            langArray.push(item);
        })
        $('.a').html(langArray);

        //Set the button value to the first el of the array
        $('.btn-select').html(langArray[0]);
        $('.btn-select').attr('value', 'en');

        //change button stuff on click
        $('.a li').click(function () {
            var img = $(this).find('img').attr("src");
            var value = $(this).find('img').attr('value');
            var text = this.innerText;
            var item = '<li><img src="' + img + '" alt="" /><span>' + text + '</span></li>';
            $('.btn-select').html(item);
            $('.btn-select').attr('value', value);
            $(".b").toggle();
            //console.log(value);
        });

        $(".btn-select").click(function () {
            $(".b").toggle();
        });

        // Apex Slider
        let expertOptionCarousel = document.querySelector('.apex_section_sliders');
        let expertOptionBtn = document.querySelector('.apex_section_sliders_btn');
        if (expertOptionCarousel) {
            const swiper = new Swiper(expertOptionCarousel, {
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                spaceBetween: 24,
                slidesPerView: 2,
                paginationClickable: true,
                navigation: {
                    nextEl: expertOptionBtn.querySelector('.ara-next'),
                    prevEl: expertOptionBtn.querySelector('.ara-prev'),
                },
                breakpoints: {
                    1799: {
                        slidesPerView: 6,
                    },
                    1700: {
                        slidesPerView: 5,
                    },
                    1400: {
                        slidesPerView: 5,
                    },
                    768: {
                        slidesPerView: 6,
                    },
                    575: {
                        slidesPerView: 4,
                    },
                    480: {
                        slidesPerView: 3,
                    },
                    375: {
                        slidesPerView: 2,
                    },
                }
            });
        }

        /* price-range */
        if (document.querySelector('#price-range') !== null) {
            $("#price-range").slider({
                step: 1,
                range: true,
                min: 0,
                max: 1000,
                values: [50, 800],
                slide: function (event, ui) { $("#priceRange").val(ui.values[0] + " - " + ui.values[1]); }
            });
            $("#priceRange").val($("#price-range").slider("values", 0) + " - " + $("#price-range").slider("values", 1));
        }

        /* Wow js */
        // new WOW().init();

        /*(function ($) {
            $.fn.mySelectDropdown = function (options) {
                return this.each(function () {
                    var $this = $(this);

                    $this.each(function () {
                        var dropdown = $("<div />").addClass("f-dropdown selectDropdown");

                        if ($(this).is(':disabled'))
                            dropdown.addClass('disabled');

                        $(this).wrap(dropdown);

                        var label = $("<span />").append($("<span />")
                            .text($(this).attr("placeholder"))).insertAfter($(this));
                        var list = $("<ul />");

                        $(this)
                            .find("option")
                            .each(function () {
                                var image = $(this).data('image');
                                if (image) {
                                    list.append($("<li />").append(
                                        $("<a />").attr('data-val', $(this).val())
                                            .html(
                                                $("<span />").append($(this).text())
                                            ).prepend('<img src="' + image + '">')
                                    ));
                                } else if ($(this).val() != '') {
                                    list.append($("<li />").append(
                                        $("<a />").attr('data-val', $(this).val())
                                            .html(
                                                $("<span />").append($(this).text())
                                            )
                                    ));
                                }
                            });

                        list.insertAfter($(this));

                        if ($(this).find("option:selected").length > 0 && $(this).find("option:selected").val() != '') {
                            list.find('li a[data-val="' + $(this).find("option:selected").val() + '"]').parent().addClass("active");
                            $(this).parent().addClass("filled");
                            label.html(list.find("li.active a").html());
                        }
                    });

                    if (!$(this).is(':disabled')) {
                        $(this).parent().on("click", "ul li a", function (e) {
                            e.preventDefault();
                            var dropdown = $(this).parent().parent().parent();
                            var active = $(this).parent().hasClass("active");
                            var label = active
                                ? $('<span />').text(dropdown.find("select").attr("placeholder"))
                                : $(this).html();

                            dropdown.find("option").prop("selected", false);
                            dropdown.find("ul li").removeClass("active");

                            dropdown.toggleClass("filled", !active);
                            dropdown.children("span").html(label);

                            if (!active) {
                                dropdown
                                    .find('option[value="' + $(this).attr('data-val') + '"]')
                                    .prop("selected", true);
                                $(this).parent().addClass("active");
                            }

                            dropdown.removeClass("open");
                        });

                        $this.parent().on("click", "> span", function (e) {
                            var self = $(this).parent();
                            self.toggleClass("open");
                        });

                        $(document).on("click touchstart", function (e) {
                            var dropdown = $this.parent();
                            if (dropdown !== e.target && !dropdown.has(e.target).length) {
                                dropdown.removeClass("open");
                            }
                        });
                    }
                });
            };
        })(jQuery);
        $('select.f-dropdown').mySelectDropdown();*/

    });
});
