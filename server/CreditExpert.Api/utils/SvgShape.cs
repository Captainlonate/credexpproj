using System;
using System.Collections.Generic;

namespace CreditExpert.Api
{
    public class SvgShape
    {
      public string label { get; set; }
      public string[] paths { get; set; }

      public SvgShape()
      {
        this.label = String.Empty;
        this.paths = null;
      }
    }
}
