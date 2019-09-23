var winW=$(window).width();
var winH=$(window).height();

Showcase = {
    
    init: function() {
        this.sidebar = $('#layout-sidebar');
        this.menu = this.sidebar.children('.layout-menu');
        this.logo = $('.layout-logo, .layout-logo-mobile');
        this.menuButton = $('#menu-button');
        this.mobileMenuButton = $('#menu-button-mobile');

        this.bindEvents();

        this.initMenuState();
    },

    bindEvents: function() {
        var $this = this;
        
        this.categoryLinks = this.menu.children('a');
        this.categoryLinks.on('click', function(e) {
            var link = $(this);
            link.siblings('.active-menuitem').removeClass('active-menuitem').next('div').slideUp();
            $(this).toggleClass('active-menuitem').next('div').slideToggle();
            e.preventDefault();
        });

        this.menuButton.on('click', function() {
             $this.menu.addClass('active');
             $('body').addClass('layout-sidebar-active');
             $this.mobileMenuButton.addClass('active');
             $(this).addClass('active');
        });
        
        this.mobileMenuButton.on('click', function(e) {
             $this.removeActiveClass();
        });

        this.logo.on('click', function(e) {
            var el = $(e.target);
            if(el && !el.is('#menu-button-mobile') && !el.parent().is('#menu-button-mobile')) {
                window.location.href = '';
            }
        })
        
        var hashedLinks = this.menu.find('div > div > a');
        hashedLinks.on('click', function(e) {
            Showcase.changePageWithLink($(this).attr('href'));
            $this.removeActiveClass();
            e.preventDefault();
        });

        $("#themeSwitcher").on("click",function(){
            $("#GlobalThemeSwitcher").slideDown(500);
        })
        .on("mouseleave",function(){
            $("#GlobalThemeSwitcher").slideUp(1);
        });
        
        $("#themeSwitcherMobile").on("click",function(){
            $("#GlobalThemeSwitcherMobile").slideDown(500);
        })
        .on("mouseleave",function(){
            $("#GlobalThemeSwitcherMobile").slideUp(1);
        });
        
        $("#GlobalThemeSwitcher > a").on("click", function(e) {
            var theme = $(this).data("theme"),
            themeLink = $('link[href$="theme.css"]'),
            newThemeURL =  'resources/' + 'themes/' + theme + '/theme.css';

            themeLink.attr('href', newThemeURL);
            e.preventDefault();
        });
        
        $("#GlobalThemeSwitcherMobile > a").on("click", function(e) {
            var theme = $(this).data("theme"),
            themeLink = $('link[href$="theme.css"]'),
            newThemeURL =  'resources/' + 'themes/' + theme + '/theme.css';

            themeLink.attr('href', newThemeURL);
            e.preventDefault();
        });

        $(window).on('hashchange', function (e) {
            if(!Showcase.hashChangeByLink) {
                var hash = window.location.hash;
                if(hash) {
                    Showcase.openPageWithHash(hash);
                }
            }
            else {
                Showcase.hashChangeByLink = false;
            }
        });

        $(window).on("resize", function() {
            $this.onWinResize();
        });
    },

    removeActiveClass() {
        this.menu.removeClass('active');
        this.mobileMenuButton.removeClass('active');
        this.menuButton.removeClass('active');
        $('body').removeClass('layout-sidebar-active');
    },

    changePageWithLink: function(page) {
        if(page !== this.currentPage) {
            this.currentPage = page;
            
            if(page.indexOf('http') === 0) {
                window.location.href = page;
            }
            else {
                Showcase.hashChangeByLink = true;
                Showcase.openPage(page);
                window.location.hash = page;
            }
        }
    },
    
    initMenuState: function() {
        var hash = window.location.hash;
        if(hash) {
            this.openPageWithHash(hash);
        }
    },

    onWinResize: function() {
        this.menu.height($(window).height());
    },

    openSubMenu: function(header) {
        var $this = this,
        headerJQ = $(header);

        if(this.activeMenu) {
            if(this.activeMenu === header) {
                headerJQ.removeClass('MenuSideMainLinkDark').next().slideUp(500,"easeInOutQuint", function() {
                    
                });
                this.activeMenu = null;
            }
            else {
                $(this.activeMenu).removeClass('MenuSideMainLinkDark').next().slideUp(500,"easeInOutQuint", function() {
                    headerJQ.addClass("MenuSideMainLinkDark").next().slideDown(500,"easeInOutQuint", function() {
                        
                    });
                });

                this.activeMenu = header;
            }
        }
        else {
            headerJQ.addClass("MenuSideMainLinkDark").next().slideDown(500,"easeInOutQuint", function() {
                    
                });
            this.activeMenu = header;
        }
    },

    openPageWithHash: function(hash) {
        if(hash && hash.length > 1) {
            var plainHash = hash.substring(1);
            this.openPage(plainHash);

            this.menu.find('> a.active-menuitem').removeClass('active-menuitem').next().hide();
            var menuitem = this.menu.find('a[href="'+ plainHash + '"]');
            if(menuitem.length) {
                var submenu = menuitem.parent().parent(),
                submenuTitle = submenu.prev();

                submenu.show();
                submenuTitle.addClass('active-menuitem');
                this.activeMenu = submenuTitle;
            }
        }
    },

    openPage: function(route) {
        $(document).trigger('onRouteChange');

        var widgetdemo = $('#widgetdemo');
        widgetdemo.children().css('visibility', 'hidden');
        widgetdemo.fadeOut(50);

        $.get('showcase/demo/' + route + '.html', function(content) {
            $('#widgetdemo').html(content);
            $('#widgetdemo').fadeIn(300);
        });
    },
    
    demo: {
        
        themes: new Array('afterdark', 'afternoon', 'afterwork', 'aristo', 'black-tie', 'blitzer', 'bluesky', 'bootstrap', 'casablanca', 'cruze',
                            'cupertino', 'dark-hive', 'dot-luv', 'eggplant', 'excite-bike', 'flick', 'glass-x', 'home', 'hot-sneaks', 'humanity', 'le-frog', 'midnight',
                            'mint-choc', 'overcast', 'pepper-grinder', 'redmond', 'rocket', 'sam', 'smoothness', 'south-street', 'start', 'sunny', 'swanky-purse', 'trontastic',
                            'ui-darkness', 'ui-lightness', 'varder'),
                            
        cars: [
            {'brand': 'Volkswagen', 'year': 2012, 'color': 'White', 'vin': 'dsad231ff'},
            {'brand': 'Audi', 'year': 2011, 'color': 'Black', 'vin': 'gwregre345'},
            {'brand': 'Renault', 'year': 2005, 'color': 'Gray', 'vin': 'h354htr'},
            {'brand': 'BMW', 'year': 2003, 'color': 'Blue', 'vin': 'j6w54qgh'},
            {'brand': 'Mercedes', 'year': 1995, 'color': 'White', 'vin': 'hrtwy34'},
            {'brand': 'Jaguar', 'year': 2005, 'color': 'Black', 'vin': 'jejtyj'},
            {'brand': 'BMW', 'year': 2012, 'color': 'Yellow', 'vin': 'g43gr'},
            {'brand': 'Fiat', 'year': 2013, 'color': 'White', 'vin': 'greg34'},
            {'brand': 'Ford', 'year': 2000, 'color': 'Black', 'vin': 'h54hw5'}
        ],
        
        loadAllCars: function(callback) {
            $.ajax({
                type: "GET",
                url: 'showcase/resources/data/cars-large.json',
                dataType: "json",
                context: this,
                success: function (response) {
                    callback.call(this, response);
                }
            });
        },
        
        loadLazyCars: function (callback, ui) {
            var uri = 'rest/cars/lazylist/' + ui.first;

            $.ajax({
                type: "GET",
                url: uri,
                dataType: "json",
                context: this,
                success: function (response) {
                    callback.call(this, response);
                }
            });
        },
        
        terminalHandler: function(request, response) {
            if($.trim(request).length) {
               if(request == 'date') {
                   response.call(this, new Date());
               }
               else if (request.indexOf('greet') === 0) {
                   (request.split(' ')[1] == undefined) ? (response.call(this, 'Hello')) : (response.call(this, 'Hello ' + request.split(' ')[1]));
               }
               else {
                   response.call(this, "Unknown command: " + request);
               }
            }
        },
        
        localTreeNodes: [
            {
                label: 'Documents',
                data: 'Documents Folder',
                children: [{
                        label: 'Work',
                        data: 'Work Folder',
                        children: [{label: 'Expenses.doc', iconType: 'doc', data: 'Expenses Document'}, {label: 'Resume.doc', iconType: 'doc', data: 'Resume Document'}]
                    },
                    {
                        label: 'Home',
                        data: 'Home Folder',
                        children: [{label: 'Invoices.txt', iconType: 'doc', data: 'Invoices for this month'}]
                    }]
            },
            {
                label: 'Pictures',
                data: 'Pictures Folder',
                children: [
                    {label: 'barcelona.jpg', iconType: 'picture', data: 'Barcelona Photo'},
                    {label: 'logo.jpg', iconType: 'picture', data: 'PrimeFaces Logo'},
                    {label: 'primeui.png', iconType: 'picture', data: 'PrimeUI Logo'}]
            },
            {
                label: 'Movies',
                data: 'Movies Folder',
                children: [{
                        label: 'Al Pacino',
                        data: 'Pacino Movies',
                        children: [{label: 'Scarface', iconType: 'video', data: 'Scarface Movie'}, {label: 'Serpico', iconType: 'video', data: 'Serpico Movie'}]
                    },
                    {
                        label: 'Robert De Niro',
                        data: 'De Niro Movies',
                        children: [{label: 'Goodfellas', iconType: 'video', data: 'Goodfellas Movie'}, {label: 'Untouchables', iconType: 'video', data: 'Untouchables Movie'}]
                    }]
            }
        ],
        
        remoteTreeNodes: function(ui, response) {
            $.ajax({
                type: "GET",
                url: 'showcase/resources/data/nodes.json',
                dataType: "json",
                context: this,
                success: function(data) {
                    response.call(this, data);
                }
            });
        },
        
        treetableData: [
            {
                data: {name: 'Documents', size: '75kb', type: 'Folder'},
                children: [
                    {
                        data: {name: 'Work', size: '55kb', type: 'Folder'},
                        children: [
                            {
                                data: {name: 'Expenses.doc', size: '30kb', type: 'Document'}
                            },
                            {
                                data: {name: 'Resume.doc', size: '25kb', type: 'Resume'}
                            }
                        ]
                    },
                    {
                        data: {name: 'Home', size: '20kb', type: 'Folder'},
                        children: [
                            {
                                data: {name: 'Invoices', size: '20kb', type: 'Text'}
                            }
                        ]
                    }
                ]
            },
            {
                data: {name: 'Pictures', size: '150kb', type: 'Folder'},
                children: [
                    {
                        data: {name: 'barcelona.jpg', size: '90kb', type: 'Picture'}
                    },
                    {
                        data: {name: 'primeui.png', size: '30kb', type: 'Picture'}
                    },
                    {
                        data: {name: 'optimus.jpg', size: '30kb', type: 'Picture'}
                    }
                ]
            }
        ]
        
    }
};

$(function() {
    Showcase.init();

    $.ajaxSetup({
        cache: true
    });
});