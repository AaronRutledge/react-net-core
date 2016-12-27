using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";
            Dictionary<string, string> appScripts;
            string mainScriptPath = "";
            if (Models.AssetManifest.LoadJson.TryGetValue("myApp", out appScripts)) // Returns true.
            {
               appScripts.TryGetValue("main.js", out mainScriptPath);
            }
            ViewData["JsonOutput"]="~/components/myapp/" + mainScriptPath;
            string model = "/components/myApp/" + mainScriptPath;
            return View("About", model);
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
