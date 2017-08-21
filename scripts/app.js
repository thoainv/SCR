(function (w) {
    var App = new function () {
        var utilities = new function () {
            ///option:{a:"",b:"",c:null,d:[{name:"",value:""}],e:[],f:[{name:"",func:function(){},capt:false}],g:[],h:""}
            var $a = function (option) {
                if (option.a) {
                    var type = document.createElement(option.a);
                    if (option.b)
                        type.id = option.b;
                    if (option.c)
                        option.c.appendChild(type);
                    if (option.d && option.d.length && option.d.length > 0)
                        option.d.forEach(function (cl) {
                            if (cl.name && cl.value) {
                                if (type[cl.name] != null)
                                    type[cl.name] = ct.value;
                                else {
                                    var at = document.createAttribute(cl.name);
                                    at.value = cl.value;
                                    type.setAttributeNode(at);
                                }
                            }
                        });
                    if (option.e && option.e.length && option.e.length > 0)
                        option.e.forEach(function (cl) {
                            type.classList.add(cl);
                        });
                    if (option.f && option.f.length && option.f.length > 0)
                        option.f.forEach(function (cl) {
                            type.addEventListener(cl.name, cl.func, cl.capt === true);
                        });
                    if (option.g && option.g.length && option.g.length > 0)
                        option.g.forEach(function (cl) {
                            type.appendChild(cl);
                        });
                    if (option.h) {
                        type.innerHTML = option.h;
                    }
                    return type;
                }
            }
            var uniqueId = function () { return Math.floor(Date.now() / 1000); }
            var retrieveMultiple = function (query, success, error, asyn) {
                var req = new XMLHttpRequest();
                req.open("GET", window.top.Xrm.Page.context.getClientUrl() + "/api/data/v8.2/" + query, asyn === true);
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.setRequestHeader("Prefer", "odata.include-annotations=\"*\",odata.maxpagesize=15");
                req.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        req.onreadystatechange = null;
                        if (this.status === 200) {
                            if (success)
                                success(JSON.parse(this.response));
                        } else {
                            if (error)
                                error(this);
                        }
                    }
                };
                req.send();
            }
            var log = function (s) { console.log(s) }
            Object.defineProperties(this, {
                $a: { get: function () { return $a } },
                uniqueId: { get: function () { return uniqueId } },
                retrieveMultiple: { get: function () { return retrieveMultiple } },
                log: { get: function () { return log } }
            });
        };
        var me = this;
        var mainView = null;
        var pageContainer = { pages: [], ids: [] }
        var addPage = function (page) {
            if (pageContainer.ids.indexOf(page.id) < 0) {
                pageContainer.pages.push(page);
                pageContainer.ids.push(page.id);
                mainView.appendChild(page.getView());
            }
        }
        var removePage = function (id) {
            if (id) {
                var i = pageContainer.ids.indexOf(id);
                if (i > -1) {
                    mainView.removeChild(pageContainer.pages[i].getView());
                    pageContainer.ids[i] = null;
                    pageContainer.ids.splice(i, 1);
                    pageContainer.pages[i] = null;
                    pageContainer.pages.splice(i, 1);
                }
            };
        }
        var getCurrentPage = function () {
            return pageContainer.pages[pageContainer.ids.length - 1];
        }
        var initialize = function () {
            mainView = utilities.$a({ a: "div", b: "app_view", c: document.body });
            Object.defineProperties(w, {
                app: { get: function () { return me; } },
                utilities: { get: function () { return utilities; } }
            });
            Object.defineProperties(me, {
                Page: { get: function () { return page } },
                addPage: { get: function () { return addPage } },
                removePage: { get: function () { return removePage } },
                getCurrentPage: { get: function () { return getCurrentPage } }
            });
        }
        var page = function (id, render, onLoadFunc, onCloseFunc) {
            var o = this;
            var pageId = id;
            var onLoad = onLoadFunc;
            var onClose = onCloseFunc;
            var view;
            var initialize = function () {
                view = utilities.$a({ a: "div", b: id, e: ["view"] });
                Object.defineProperties(o, {
                    setOnLoad: { get: function () { return setOnLoad } },
                    setOnClose: { get: function () { return onClose } },
                    getPageId: { get: function () { return getPageId } },
                    getView: { get: function () { return getView } }
                });
                if (render)
                    render(o);
                if (onLoad)
                    onLoad(o);
            }
            var setOnLoad = function (func) {
                onload = func;
            }
            var setOnClose = function (func) {
                onClose = func;
            }
            var getPageId = function () {
                return pageId;
            }
            var getView = function () {
                return view;
            }
            initialize();
        }
        initialize();
    }
}(this));

window.Xrm = window.top.Xrm;
var view = document.getElementById("app_view");
var fitAppView = function () {
    if (window.top.innerHeight != view.clientHeight)
        view.style.height = window.top.innerHeight + "px";
}
document.onreadystatechange = function (e) {
    if (this.readyState == "complete") {
        fitAppView();
        window.top.document.head.appendChild($('<meta name="viewport" content="width=device-width,height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">')[0]);
        window.top.f = window.frameElement;
        window.top.x = $("<style type='text/css'>div.crmContentPanel{top:50px !important}</style>")[0];
        window.top.xxxx = true;
        var scr = document.createElement("script");
        scr.type = "text/javascript";
        scr.innerHTML = "function a() {if(xxxx!=true) return;if (f && x) {if (!x.parentElement && f.contentWindow.document.title == 'Dự Án') {f.parentElement.appendChild(x);} else if ( x.parentElement && f.contentWindow.document.title != 'Dự Án'){f.parentElement.removeChild(x); xxxx=false;};setTimeout(a, 1000);}} a();";
        window.top.document.body.appendChild(scr);
        if (e.target.readyState === "complete") {
            var t = null;
            window.addEventListener("resize", function (w) {
                if (t) clearTimeout(t);
                t = setTimeout(fitAppView, 100);
            });
        }

        //var myScroll = new IScroll('#project-list-content', { mouseWheel: true, tap: true });

        //project page
        app.addPage(new app.Page("page" + utilities.uniqueId(),
            function (o) {
                var titleElm;
                var grid;
                var content = utilities.$a({
                    a: "div",
                    b: o.getPageId() + "Content",
                    c: o.getView(),
                    e: ["content"],
                    g: [
                        utilities.$a({
                            a: "div", e: ["section"], g: [
                                titleElm = utilities.$a({ a: "h1", h: "Project" }),
                                grid = utilities.$a({ a: "div", e: ["grid"] })
                            ]
                        })
                    ]
                });

                var renderItem = function (index, id, name, image) {
                    var item = utilities.$a({
                        a: "div",
                        b: id,
                        d: [{ name: "tabindex", value: index }],
                        e: ["cell"],
                        g: [
                            utilities.$a({
                                a: "div", e: ["item"], g: [
                                    utilities.$a({
                                        a: "div", e: ["image"], g: [utilities.$a({ a: "div", e: ["opacity-layer"] })]
                                    }),
                                    utilities.$a({ a: "div", e: ["content"], h: name })
                                ]
                            })
                        ],
                        f: [
                            {
                                name: "touchenter mouseover", func: function (e) {
                                    e.currentTarget.classList.add("hover");
                                }
                            },
                            {
                                name: "touchleave mouseleave", func: function (e) {
                                    e.currentTarget.classList.remove("hover");
                                }
                            },
                            {
                                name: "click", func: function (ev) { o.takeEffect(ev) }
                            }
                        ]
                    });
                    return item;
                }
                Object.defineProperties(o, {
                    grid: { get: function () { return grid } },
                    renderItem: { get: function () { return renderItem } }
                });
                content.parentElement.classList.add("view-effect-1");
                var placeHolder;
                o.takeEffect = function (ev) {
                    if (content.parentElement.classList.contains("view-effect-1-take")) {
                        content.parentElement.classList.remove("view-effect-1-take");
                        ev.currentTarget.classList.remove("active-cell");
                        setTimeout(function () {
                            placeHolder.parentElement.removeChild(placeHolder);
                        }, 500);
                        
                    }

                    else {
                        content.parentElement.classList.add("view-effect-1-take");
                        ev.currentTarget.classList.add("active-cell");
                        placeHolder = utilities.$a({
                            a: "div",
                            b: o.getPageId() + "PlaceHolder",
                            c: o.getView(),
                            e: ["placeholder"],
                            g: [
                                utilities.$a({ a: "div", e: ["front"] }),
                                utilities.$a({ a: "div", e: ["back"] })
                            ]
                        });
                        var l = ev.target.getBoundingClientRect();
                        placeHolder.style.width = l.width +"px";
                        placeHolder.style.height = l.height+ "px";
                        placeHolder.style.top = l.top + "px";
                        placeHolder.style.left = l.left + "px";
                        debugger;
                    }

                }
            },
            function (o) {
                utilities.retrieveMultiple("new_duans?$select=new_name,statuscode",
                function (result) {
                    if (result && result.value && result.value.length > 0) {
                        o.grid.innerHTML = "";
                        var i = 0;
                        result.value.forEach(function (r) {
                            i++;
                            o.grid.appendChild(o.renderItem(i, r.new_duanid, r.new_name, ""));
                        });
                    }
                    else {

                    }
                },
                function (req) {
                    utilities.log(req.responseText);
                }, true);
            },
            function (o) {

            }));
    }
}