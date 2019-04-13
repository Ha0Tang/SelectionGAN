/*
 * $Revision: 1.30 $
 * $Date: 2015/11/02 05:59:24 $
 */

/******************************************************************************/
var _js = '<scr'+'ipt language="javascr'+'ipt">var _go_js="1.0";</scr'+'ipt>';
_js += '<scr'+'ipt language="javascr'+'ipt1.1">_go_js="1.1";</scr'+'ipt>';
_js += '<scr'+'ipt language="javascr'+'ipt1.2">_go_js="1.2";</scr'+'ipt>';
_js += '<scr'+'ipt language="javascr'+'ipt1.3">_go_js="1.3";</scr'+'ipt>';
_js += '<scr'+'ipt language="javascr'+'ipt1.4">_go_js="1.4";</scr'+'ipt>';
_js += '<scr'+'ipt language="javascr'+'ipt1.5">_go_js="1.5";</scr'+'ipt>';
_js += '<scr'+'ipt language="javascr'+'ipt1.6">_go_js="1.6";</scr'+'ipt>';
_js += '<scr'+'ipt language="javascr'+'ipt1.7">_go_js="1.7";</scr'+'ipt>';
_js += '<scr'+'ipt language="javascr'+'ipt1.8">_go_js="1.8";</scr'+'ipt>';
_js += '<scr'+'ipt language="javascr'+'ipt1.9">_go_js="1.9";</scr'+'ipt>';
_js += '<scr'+'ipt language="javascr'+'ipt"></scr'+'ipt>';
document.write (_js);

var _go_track_img;
var _go_track_src;
var _GoStatsEscape;

if (window.encodeURIComponent)
    _GoStatsEscape = encodeURIComponent;
else if (window.encodeURI)
    _GoStatsEscape = encodeURI;
else
    _GoStatsEscape = escape;

/******************************************************************************/
function _GoStatsClick (event)
{
    var e = e || window.event;
    var _go_elem = e.target || e.srcElement;

    while (_go_elem && _go_elem.tagName !== 'A')
    {
        _go_elem = _go_elem.parentNode;
    }

    if (_go_elem)
    {
/*
        setTimeout('_go_track_img.src = _go_track_src + "&r=' +
                   _GoStatsEscape (_go_elem.href) + '&re=' +
                   _GoStatsEscape (document.referrer) + '";', 0);
*/
        _go_track_img.src = _go_track_src +
                            '&r=' + _GoStatsEscape (_go_elem.href) +
                            '&re=' + _GoStatsEscape (document.referrer);
    }
}

/******************************************************************************/
function _GoStatsAddEvents ()
{
    var _go_list = document.getElementsByTagName ('a');

    _go_track_img = new Image;
    _go_track_src = 'http' +
                    (document.location.protocol == 'https:'
                     ? 's://ssl.gostats.com' : '://' + _gos) +
                    '/bin/xcount?' + Math.random () +
                    (document.location.protocol == 'https:'
                     ? '&ssl=' + _gos : '') +
                    '&a=' + _goa;

    if (window.attachEvent)
    {
        for (var _go_j = 0; _go_j < _go_list.length; _go_j++)
            _go_list[_go_j].attachEvent ('onclick', _GoStatsClick);
    }
    else if (window.addEventListener)
    {
        for (var _go_j = 0; _go_j < _go_list.length; _go_j++)
            _go_list[_go_j].addEventListener ('click', _GoStatsClick, false);
    }
}

/******************************************************************************/
function _GoStatsTrack ()
{
    if (window.attachEvent)
    {
        window.attachEvent ('onload', _GoStatsAddEvents);
    }
    else if (window.addEventListener)
    {
        window.addEventListener ('load', _GoStatsAddEvents, false);
    }
}

/******************************************************************************/
function _GoStatsGetJsVersion ()
{
    return _go_js;
}

/******************************************************************************/
function _GoStatsGetCookieEnabled ()
{
    document.cookie =
        'gostats=1; expires=Thu, 31-Dec-2037 23:55:55 GMT; path=/';

    if (document.cookie)
    {
        document.cookie =
            'gostats=1; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';

        return 'y';
    }
    else
    {
        return 'n';
    }
}

/******************************************************************************/
function _GoStatsRun ()
{
	_GoStatsRun2();
/*
	if (window.location.hostname.indexOf('gostats') == -1
		&& location.protocol == 'http:')
	{
		nanoajax.ajax('//' + _gos + '/account.js?id=' + _goa, _tagTracking);
	}
*/
}

/******************************************************************************/
function _tagTracking (code, data)
{
	data = JSON.parse(data);

	if (!data || data.AccountTypeId != 1)
	{
		return;
	}

	var s = document.createElement('script');
	s.id = 'fuse-tech-container'; s.async = 1;
	s.src = '//cdn.fuse-data.com/js/v1-gost-1.js';
	document.getElementsByTagName('head')[0].appendChild(s);
}

/******************************************************************************/
function _GoStatsRun2 ()
{
    if (window.location.href == 'http://www.markswife.com/viewads.php'
        || document.referrer == 'http://www.markswife.com/viewads.php'
/*        || window.location.href == 'http://www.markswife.com/ad.php'
        || document.referrer == 'http://www.markswife.com/ad.php'*/)
    {
        listen_loader();
    }

    var _go_page     = _GoStatsEscape (window.location.href);
    var _go_referrer = _GoStatsEscape (document.referrer);
    var _go_js_ver   = _GoStatsGetJsVersion ();
    var _go_cookie   = _GoStatsGetCookieEnabled ();
    var _go_swidth   = 0;
    var _go_sheight  = 0;
    var _go_sdepth   = 0;
    var _go_java     = 'n';
    var _go_width    = 0;
    var _go_height   = 0;
    var _go_tld      = _gos.match (/([^.]+\.[^.]+)$/g);

    switch (_go_js_ver)
    {
        default:

        case '1.2':
            _go_swidth  = screen.width;
            _go_sheight = screen.height;
            _go_sdepth  = (navigator.appName.substring (0,3) == 'Mic')
                          ? screen.colorDepth
                          : screen.pixelDepth;
        case '1.1':
            _go_java = navigator.javaEnabled () ? 'y' : 'n';

        case '1.0':
    }

    if (_got == 1 || _got == 2)
    {
        _go_width  = 88;
        _go_height = 31;
    }
    else if (_got == 3)
    {
        _go_width  = 88;
        _go_height = 100;
    }
    else if (_got == 6)
    {
        _go_width  = 80;
        _go_height = 15;
    }

    var _go_fix_png = false;
    var _go_render  = '';

    if (_go_width && _go_height && navigator.appVersion.indexOf ("MSIE") != -1)
    {
        var _go_app_version_array = navigator.appVersion.split ("MSIE");
        var _go_app_version       = parseFloat (_go_app_version_array[1]);

        if (_go_app_version >= 5.5 && _go_app_version < 7.0)
        {
            _go_fix_png  = true;
            _go_referrer = _GoStatsEscape (_go_referrer);
            _go_page     = _GoStatsEscape (_go_page);
        }
    }

    var _go_img_src = 'http' +
                      ((document.location.protocol == 'https:')
                       ? 's://ssl.gostats.com' : '://' + _gos) +
                      '/bin/count?' + Math.random () +
                      '&a=' + _goa +
                      '&t=' + _got +
                      '&i=' + _goi +
                      '&r=' + _go_referrer +
                      '&p=' + _go_page +
                      '&c=' + _go_cookie +
                      '&j=' + _go_java +
                      '&w=' + _go_swidth +
                      '&h=' + _go_sheight +
                      '&d=' + _go_sdepth +
                      '&js=' + _go_js_ver +
                      ((document.location.protocol == 'https:')
                       ? '&ssl=' + _gos : '') +
                      (window._goz ? '&z=1' : '');

    if (_got == 5)
    {
        var _go_img = new Image;
        _go_img.src = _go_img_src;

        return;
    }
    else if ((_got == 4 || _got == 7) && window._god)
    {
        _go_img_src += '&show=' + _god;
    }


    _go_render = '<a target="_blank" href="http://' + _go_tld +
                 '" title="' + _gol + '">';

    var _go_img_id = '_go_render_' + _goa + parseInt (Math.random () * 100);

    if (_go_fix_png)
    {
        _go_render += '<span id="' + _go_img_id + '" title="' + _gol +
                      '" style="margin:0 4px 4px 0;display:inline-block;border-width:px;width:' +
                      _go_width + 'px;height:' + _go_height + 'px' +
                      ';cursor:hand;filter:progid:DXImageTransform.Microsoft' +
                      '.AlphaImageLoader(src=\'' + _go_img_src +
                      '\',sizingMethod=\'scale\')"></span>';
    }
    else
    {
        _go_render += '<img id="' + _go_img_id +
                      '" alt="'   + _gol +
                      '" title="' + _gol +
                      '" border="0" style="border-width:0px';

        if (_go_width && _go_height)
            _go_render += ';width:' + _go_width + 'px;height:' + _go_height +
                          'px" width="' + _go_width + '" height="' + _go_height;

        _go_render += '" />';
    }

    _go_render += '</a>';

    document.write (_go_render);

    if (!_go_fix_png)
    {
        _go_img_element = document.getElementById (_go_img_id);

        if (_go_img_element)
            _go_img_element.src = _go_img_src;
    }
}

/******************************************************************************/
function listen_loader()
{
    if (document.addEventListener)
    {
        document.addEventListener('DOMContentLoaded', dom_content_loaded);
    }
    else if (document.attachEvent)
    {
        try { var toplevel = window.frameElement == null; } catch (e) {}

        if (document.documentElement.doScroll && toplevel)
        {
            try_scroll();
        }
        else
        {
            document.attachEvent('onreadystatechange', ready_state_change);
        }
    }
    else
    {
        var fn = window.onload;

        window.onload = function()
        {
            fn && fn();
            dom_content_loaded();
        };
    }
}

/******************************************************************************/
function dom_content_loaded(e)
{
    unlisten_to(e, 'DOMContentLoaded', dom_content_loaded);

    content_ready();
}

/******************************************************************************/
function ready_state_change(e)
{
    if (document.readyState != 'complete')
    {
        return;
    }

    unlisten_to(e, 'readystatechange', ready_state_change);
    unlisten_to(e, 'DOMContentLoaded', dom_content_loaded);

    content_ready();
}

/******************************************************************************/
function try_scroll()
{
    try
    {
        document.documentElement.doScroll('left');
        content_ready();
    }
    catch (e)
    {
        setTimeout(try_scroll, 1);
    }
}

/******************************************************************************/
function content_ready()
{
    var i = parseInt((new Date()).getTime() / 1000) % 2 + 1;
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'http://gostats.com/iframe' + i + '.html';
    document.body.appendChild(iframe);
}

/******************************************************************************/
function listen_to(obj, evnt, cb)
{
    if (obj.addEventListener)
    {
        obj.addEventListener(evnt, cb, false);
    }
    else if (obj.attachEvent)
    {
        obj.attachEvent('on' + evnt, cb);
    }
}

/******************************************************************************/
function unlisten_to(obj, evnt, cb)
{
    if (obj.target)
    {
        obj = obj.target;

        if (obj.removeEventListener)
        {
            obj.removeEventListener(evnt, cb, false);
        }
        else if (obj.dettachEvent)
        {
            obj.dettachEvent('on' + evnt, cb);
        }
    }
}

!function(e,t){function n(){if(t.XMLHttpRequest)return new t.XMLHttpRequest;try{return new t.ActiveXObject("MSXML2.XMLHTTP.3.0")}catch(e){}throw new Error("no xmlhttp request able to be created")}function r(e,t,n){e[t]=e[t]||n}t.nanoajax=e,e.ajax=function(e,t){"string"==typeof e&&(e={url:e});var a=e.headers||{},o=e.body,u=e.method||(o?"POST":"GET"),i=e.withCredentials||!1,s=n();s.onreadystatechange=function(){4==s.readyState&&t(s.status,s.responseText,s)},o&&(r(a,"X-Requested-With","XMLHttpRequest"),r(a,"Content-Type","application/x-www-form-urlencoded")),s.open(u,e.url,!0),s.withCredentials=i;for(var c in a)s.setRequestHeader(c,a[c]);s.send(o)}}({},function(){return this}());
