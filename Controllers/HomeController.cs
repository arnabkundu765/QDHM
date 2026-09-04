using Microsoft.AspNetCore.Mvc;
using QDHM.Models;
using System.Diagnostics;

namespace QDHM.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Dashboard()
        {
            return View();
        }
        public IActionResult MainDashboard()
        {
            return View();
        }
    }
}
