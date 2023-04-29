$(document).ready(function () {
    var r, pf, pc, thisurl, fs, tokenhtml;
    const params = new URLSearchParams(window.location.search);
    var valuenext = params.get('mainurl');
    login = "{{ request.user.is_authenticated }}";
    localStorage.setItem("login", login);
    login = localStorage.getItem('login');
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
            localStorage.setItem("next", valuenext);
            next = localStorage.getItem("next");

            console.log("valuenext not empty : " + next);
        }
        else {
            next = localStorage.getItem("next");
            window.location.href = BASE_URL + "booldog?mainurl=" + localStorage.getItem('next') + "&user=" + localStorage.getItem('user') + "&password=" + localStorage.getItem('password');
            //window.location.href = 'javascript:initBlogSGang(localStorage.getItem("user"),localStorage.getItem("password"),localStorage.getItem("next"))';
        }
        htmlIframeWidthHeight();
    }
});
function htmlIframeWidthHeight() {
    var height, width;
    var bsectionHeight = document.getElementsByTagName('body')[0];
    height = bsectionHeight.scrollHeight + 340;
    width = bsectionHeight.scrollWidth + 200;
    localStorage.setItem("iframewidth", width.toString());
    localStorage.setItem("iframeheight", height.toString());
    window.top.postMessage(
        {
            height: height,
            base: width,
        },
        "*"
    );
    return bsectionHeight;
}