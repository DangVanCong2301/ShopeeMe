using Microsoft.AspNetCore.Mvc;

public class SellerController : Controller
{
    [HttpGet]
    [Route("/seller/account")]
    public IActionResult Account() {
        return View();
    }
}