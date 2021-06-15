using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CreditExpert.Dtos;

namespace CreditExpert.Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ColorsController : ControllerBase
  {
    private static readonly Color[] AllColors = new[]
    {
      new Color("Black", "#000000"),
      new Color("Blue", "#0000ff"),
      new Color("Green", "#00ff00"),
      new Color("Orange", "#ff9100"),
      new Color("Pink", "#ff00f2"),
      new Color("Purple", "#8400ff"),
      new Color("Red", "#ff0000"),
      new Color("Sky Blue", "#00e5ff"),
      new Color("Yellow", "#ffff00"),
    };

    public ColorsController()
    {
      
    }

    [HttpGet]
    public IEnumerable<Color> Get()
    {
      return AllColors;
    }
  }
}
