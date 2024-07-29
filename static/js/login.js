$(document).ready(function () {
    var r, pf, pc, thisurl, fs, tokenhtml;
    const params = new URLSearchParams(window.location.search);
    var valuenext = params.get('mainurl');
    login = "{{ request.user.is_authenticated }}";
    sessionStorage.setItem("login", login);
    login = sessionStorage.getItem('login');
    $('[data-toggle="tooltip"]').tooltip();
    try {
        tokenhtml = document.getElementsByName('csrfmiddlewaretoken');
        tokenhtml = tokenhtml[0].value;
        sessionStorage.setItem('csrfmiddlewaretoken', tokenhtml);
        r = document.getElementById("a_reg");
        pf = document.getElementById("a_passwordforget");
        pc = document.getElementById("a_changepassword");
        thisurl = params.get('mainurl');
        r.href = "/user/register/blog?mainurl=" + params.get('mainurl');
        pc.href = sessionStorage.getItem('BASE_URL') + "user/login/change_password?mainurl=" + thisurl;
        pf.href = sessionStorage.getItem('BASE_URL') + "user/login/password_reset?mainurl=" + thisurl;
        fs = document.getElementById("formlogin");
    }
    catch (TypeError) {
        r = pf = pc = tokenhtml = "null";
    }
    finally {
        if (valuenext) {
            try {
                document.getElementById('next').setAttribute("value", next);
            }
            catch (TypeError) {
                console.log("element with id next absent !");
            }
            sessionStorage.setItem("next", valuenext);
            next = sessionStorage.getItem("next");

            console.log("valuenext not empty : " + next);
        }
        else {
            next = sessionStorage.getItem("next");
            window.location.href = BASE_URL + "booldog?mainurl=" + sessionStorage.getItem('next') + "&user=" + sessionStorage.getItem('user') + "&password=" + sessionStorage.getItem('password');
            //window.location.href = 'javascript:initBlogSGang(sessionStorage.getItem("user"),sessionStorage.getItem("password"),sessionStorage.getItem("next"))';
        }
        htmlIframeWidthHeight();
    }
});
function htmlIframeWidthHeight() {
    var height, width;
    var bsectionHeight = document.getElementsByTagName('body')[0];
    height = bsectionHeight.scrollHeight + 340;
    width = bsectionHeight.scrollWidth + 200;
    sessionStorage.setItem("iframewidth", width.toString());
    sessionStorage.setItem("iframeheight", height.toString());
    window.top.postMessage(
        {
            height: height,
            base: width,
        },
        "*"
    );
    return bsectionHeight;
}