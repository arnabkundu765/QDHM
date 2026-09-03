using Microsoft.AspNetCore.Mvc;

namespace QDHM.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }
        public IActionResult Registration()
        {
            return View();
        }
        public IActionResult HFRRegistration(bool show = true)
        {
            ViewBag.Show = show;
            return View();
        }
        public IActionResult HPRRegistration(bool show = true)
        {
            ViewBag.Show = show;
            return View();
        }
        public IActionResult DSCRegistration(bool show = true)
        {
            ViewBag.Show = show;
            return View();
        }
    }
}
