using System;
using System.Collections.Generic;

namespace CreditExpert.Api
{
    public class Color
    {
      public string value { get; set; }
      public string label { get; set; }

      public Color()
      {
        this.value = String.Empty;
        this.label = String.Empty;
      }
      public Color(string label, string value)
      {
        this.value = value;
        this.label = label;
      }
    }
}
