const login = () => {
  const formObj = {};
  const inputs = $("#login-form").serializeArray();
  $.each(inputs, (_, input) => {
    formObj[input.name] = input.value;
  });

  let isSuccess = false;
  const id = formObj.id;
  const pw = formObj.password;
  const loginParams = {
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
    success: (data) => {
      if (
        !data.resultCode &&
        data.indexOf("더존 그룹웨어에 오신것을 환영합니다.") !== -1
      ) {
        alert("로그인 계정을 다시 확인해주세요.");
        return;
      }
      isSuccess = true;
    },
  });
  if (isSuccess) {
    localStorage.setItem("gw_musinsa_ss", JSON.stringify(formObj));
    chrome.tabs.executeScript(null, {
      code: 'window.location.href = "https://gw.musinsa.com/gw/userMain.do#none"',
    });
  }
};
$("input").keypress((e) => {
  if (e.which == 13) {
    login();
    return false;
  }
});
$("#login-btn").on("click", (e) => {
  login();
});

$(document).ready(() => {
  const storage = localStorage.getItem("gw_musinsa_ss");
  if (storage) {
    const { id, password } = JSON.parse(storage);
    $("#login-form input[name=id]").val(id);
    $("#login-form input[name=password]").val(password);
  }
});
