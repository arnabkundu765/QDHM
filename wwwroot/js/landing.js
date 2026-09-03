const demoUsers = {
    "Support Operations Center": {
        username: "support",
        password: "support@123",
        redirect: "/Home/Dashboard"
    },

    "Healthcare Facility Portal": {
        username: "facility",
        password: "facility@123",
        redirect: "/Auth/HfrRegistration"
    },

    "Healthcare Professional Portal": {
        username: "doctor",
        password: "doc@123",
        redirect: "/Auth/HprRegistration"
    },

    "DSC / Integrator Portal": {
        username: "dev",
        password: "dev@123",
        redirect: "/Auth/DscRegistration"
    }

};
let ptl = '';
document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const rightSection =
        document.getElementById("rightSection");

    const portalCards =
        document.querySelectorAll(".portal-card");

    const backButton =
        document.getElementById("backToPortals");

    const loginTitle =
        document.getElementById("loginTitle");

    const loginIcon =
        document.getElementById("loginIcon");



    /* =====================================================
       OPEN LOGIN
    ====================================================== */

    portalCards.forEach(function (card) {


        card.addEventListener("click", function () {


            /* Get portal information */

            const title =
                card.dataset.title;
            ptl = card.dataset.title;
            const icon =
                card.dataset.icon;

            const color =
                card.dataset.color;



            /* =================================================
               UPDATE LOGIN TITLE
            ================================================== */

            loginTitle.textContent =
                title;

            loginTitle.style.color =
                color;



            /* =================================================
               UPDATE LOGIN ICON
            ================================================== */

            loginIcon.style.background =
                color;

            loginIcon.innerHTML =
                `<i class="fa-solid ${icon}"></i>`;



            /* =================================================
               RESTART ICON ANIMATION
            ================================================== */

            loginIcon.classList.remove("animate");

            void loginIcon.offsetWidth;

            loginIcon.classList.add("animate");



            /* =================================================
               SHOW LOGIN
            ================================================== */

            rightSection.classList.add(
                "login-active"
            );

        });

    });



    /* =====================================================
       BACK TO PORTAL SELECTION
    ====================================================== */

    backButton.addEventListener("click", function () {


        rightSection.classList.remove(
            "login-active"
        );


    });


});
function Login() {
    let username = document.getElementById("username").value.trim() || '';
    let password = document.getElementById("password").value || '';
    let portal = ptl;
    console.log(ptl, username, password);
    if (!username && !password) {
        iziToast.error({ title: 'Error', message: 'Username or Password can not be empty!', position:'topRight' });
        return;
    }
    if (demoUsers[ptl].username === username && demoUsers[ptl].password === password) {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        window.location.href = demoUsers[ptl].redirect;
    }
    else iziToast.error({ title: 'Error', message: 'Invalid Credential!', position: 'topRight' });
}