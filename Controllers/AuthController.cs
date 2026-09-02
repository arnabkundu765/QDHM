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
        
    }
}
