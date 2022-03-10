$("input").keypress(function (e) {
  if (e.which == 13) {
    login();
    return false;
  }
});
$("#login-btn").on("click", function (e) {
  login();
});

function login() {
  var formObj = {};
  var inputs = $("#login-form").serializeArray();
  $.each(inputs, function (i, input) {
    formObj[input.name] = input.value;
  });

  var id = formObj.id;
  var pw = formObj.password;

  var loginParams = {
    isScLogin: "Y",
    scUserId: id,
    scUserPwd: securityEncrypt(pw),
    id: securityEncrypt(id),
    id_sub1: "",
    id_sub2: "",
    password: securityEncrypt(pw),
  };
  $.ajax({
    url: "https://gw.musinsa.com/gw/uat/uia/actionLogin.do",
    type: "post",
    async: false,
    data: loginParams,
    success: function (data) {
      if (
        !data.resultCode &&
        data.indexOf("더존 그룹웨어에 오신것을 환영합니다.") !== -1
      ) {
        alert("로그인 계정을 다시 확인해주세요.");
        return;
      }
      window.location.href = "https://gw.musinsa.com/gw/userMain.do#none";
    },
  });
}
