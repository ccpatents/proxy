let _tempUrl = window.location.search.substring(1); //url에서 처음부터 '?'까지 삭제
let _tempArray = _tempUrl.split('&');
let _server = _tempArray[0].split('=')[1];
let _qs = _tempArray[1].split('qs=')[1];

function load() {
    gotoServer(_server, _qs);
}

function gotoServer(server, qs) {
    switch (server) {
        case 'google_b':
            window.location.href = ("https://www.google.com/search?q=" + qs);
            break;
        case 'google_s':
            window.location.href = ("https://scholar.google.co.kr/scholar?as_sdt=1,5&q=" + qs);
            break;
        case 'google':
            window.location.href = ("http://patents.google.com/?q=" + qs + "&oq=" + qs);
            break;
        case 'uspto':
            window.location.href = ("http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.htm&r=0&p=1&f=S&l=50&Query=" + qs + "&d=PTXT");
            break;
        case 'uspto(app)':
            window.location.href = ("http://appft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&u=%2Fnetahtml%2FPTO%2Fsearch-adv.html&r=0&p=1&f=S&l=50&Query=" + qs + "&d=PG01");
            break;
        case 'uspto(tm)':
            searchUSPTOtm(decodeURI(qs).replaceAll("\+", " "));
            break;
        case 'kipris_b(kr)':
            searchKipris_beginner(decodeURI(qs).replaceAll("%3d", "\=").replaceAll("%2b", "\+").replaceAll("%2f", "\/").replaceAll("%3f", "\?"), true, false);
            break;
        case 'kipris(kr)':
            searchKipris(decodeURI(qs).replaceAll("%3d", "\=").replaceAll("%2b", "\+").replaceAll("%2f", "\/").replaceAll("%3f", "\?"), true, false);
            break;
        case 'kipris(!kr)':
            searchKipris(decodeURI(qs).replaceAll("%3d", "\=").replaceAll("%2b", "\+").replaceAll("%2f", "\/").replaceAll("%3f", "\?"), false, false);
            break;
        case 'kipris(tm-kr)':
            searchKipris(decodeURI(qs).replaceAll("%3d", "\=").replaceAll("%2b", "\+").replaceAll("%2f", "\/").replaceAll("%3f", "\?"), true, true);
            break;
        case 'kipris(tm-!kr)':
            searchKipris(decodeURI(qs).replaceAll("%3d", "\=").replaceAll("%2b", "\+").replaceAll("%2f", "\/").replaceAll("%3f", "\?"), false, true);
            break;
        case 'escapenet-en':
        case 'escapenet-fr':
        case 'escapenet-de': {
            let loc = server.split('-')[1];
            window.location.href = ("https://worldwide.espacenet.com/searchResults?submitted=true&locale=en_EP&DB=" + loc + ".worldwide.espacenet.com&ST=singleline&query=" + qs + "&Submit=Search");
        }
        default:
    }
}

function searchUSPTOtm(queryString) {
    console.log(queryString);

    let form = document.createElement('form');

    let objs = document.createElement('input');
    objs.setAttribute('name', 'f');
    objs.setAttribute('value', 'toc');
    form.appendChild(objs);

    objs = document.createElement('input');
    objs.setAttribute('name', 'p_d');
    objs.setAttribute('value', 'trmk');
    form.appendChild(objs);

    objs = document.createElement('input');
    objs.setAttribute('name', 'p_lang');
    objs.setAttribute('value', 'english');
    form.appendChild(objs);

    objs = document.createElement('input');
    objs.setAttribute('name', 'p_search');
    objs.setAttribute('value', 'search');
    form.appendChild(objs);

    objs = document.createElement('input');
    objs.setAttribute('name', 'p_s_ALL');
    objs.setAttribute('value', queryString);
    form.appendChild(objs);

    objs = document.createElement('input');
    objs.setAttribute('name', 'a_search');
    objs.setAttribute('value', 'Submit Query');
    form.appendChild(objs);

    form.setAttribute('method', 'post');
    form.setAttribute('action', "http://tmsearch.uspto.gov/bin/gate.exe");

    document.body.appendChild(form);
    form.submit();

    document.body.removeChild(form);
}

function searchKipris(queryString, kr, tm) {
    let form = document.createElement('form');

    let objs = document.createElement('input');
    objs.setAttribute('name', 'expression');
    objs.setAttribute('value', queryString);
    form.appendChild(objs);

    objs = document.createElement('input');
    objs.setAttribute('name', 'queryText');
    objs.setAttribute('value', queryString.split('\"').join("&quot;"));
    form.appendChild(objs);

    if (!kr && !tm) {
        objs = document.createElement('input');
        objs.setAttribute('name', 'collectionValues');
        objs.setAttribute('value', ['US_T.col', 'EP_T.col', 'WO_T.col', 'PAJ_T.col', 'CN_T.col', ]);
        form.appendChild(objs);
    }

    form.setAttribute('method', 'post');
    if (!tm) {
        if (!kr) {
            form.setAttribute('action', "http://abpat.kipris.or.kr/abpat/resulta.do");
        } else {
            form.setAttribute('action', "http://kpat.kipris.or.kr/kpat/resulta.do");
        }
    } else {
        if (!kr) {
            form.setAttribute('method', 'get');
            form.setAttribute('action', "http://abtm.kipris.or.kr/abtm/search/resultList.jsp");
        } else {
            form.setAttribute('action', "http://kdtj.kipris.or.kr/kdtj/searchLogina.do?method=loginTM&checkPot=Y");

        }
    }

    document.body.appendChild(form);
    form.submit();

    if (!kr && !tm) {
        form.setAttribute('action', "http://abpat.kipris.or.kr/abpat/searchLogina.do?next=MainSearch");
        form.submit();
    }

    document.body.removeChild(form);
}

function searchKipris_beginner(queryString, kr, tm) {
    let form = document.createElement('form');

    let objs = document.createElement('input');
    objs.setAttribute('name', 'expression');
    objs.setAttribute('value', queryString);
    form.appendChild(objs);

    objs = document.createElement('input');
    objs.setAttribute('name', 'queryText');
    objs.setAttribute('value', queryString.split('\"').join("&quot;"));
    form.appendChild(objs);

    if (!kr && !tm) {
        objs = document.createElement('input');
        objs.setAttribute('name', 'collectionValues');
        objs.setAttribute('value', ['US_T.col', 'EP_T.col', 'WO_T.col', 'PAJ_T.col', 'CN_T.col', ]);
        form.appendChild(objs);
    }

    form.setAttribute('method', 'post');
    if (!tm) {
        if (!kr) {
            form.setAttribute('action', "http://abpat.kipris.or.kr/abpat/resulta.do");
        } else {
            objs = document.createElement('input');
            objs.setAttribute('name', 'searchKeyword');
            objs.setAttribute('value', queryString);
            form.appendChild(objs);

            objs = document.createElement('input');
            objs.setAttribute('name', 'searchClass');
            objs.setAttribute('value', 'firstSearch');
            form.appendChild(objs);

            objs = document.createElement('input');
            objs.setAttribute('name', 'searchRight');
            objs.setAttribute('value', 'patent');
            form.appendChild(objs);

            form.setAttribute('action', "http://beginner.kipris.or.kr/beginner/search/headerSearch.do");
        }
    } else {
        if (!kr) {
            form.setAttribute('method', 'get');
            form.setAttribute('action', "http://abtm.kipris.or.kr/abtm/search/resultList.jsp");
        } else {
            form.setAttribute('action', "http://kdtj.kipris.or.kr/kdtj/searchLogina.do?method=loginTM&checkPot=Y");

        }
    }

    document.body.appendChild(form);
    form.submit();

    if (!kr && !tm) {
        form.setAttribute('action', "http://abpat.kipris.or.kr/abpat/searchLogina.do?next=MainSearch");
        form.submit();
    }

    document.body.removeChild(form);
}

//replaceAll prototype 선언
String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}