using Microsoft.AspNetCore.Mvc;

public class SellerController : Controller
{
    [HttpGet]
    [Route("/seller/login")]
    public IActionResult Login() {
        return View();
    }

    [HttpGet]
    [Route("/seller/register")]
    public IActionResult Register() {
        return View();
    }
}