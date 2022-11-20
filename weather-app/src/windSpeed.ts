import { TWindCondition, TWindDirection } from "./Types";
// as per Beaufort scale https://en.wikipedia.org/wiki/Beaufort_scale

export const windSpeed: TWindCondition =[
  {speedMin: 0,
    speedMax:0.5,
  description: 'Calm'
  },
  { speedMin:0.6,
    speedMax: 1.5,
    description: 'Ligth Air'
  },
  { speedMin: 1.6,
    speedMax: 3.3,
    description: 'Light breeze'
  },
  { speedMin:3.4,
    speedMax:5.5,
    description: 'Gentle breeze'
  },
  { speedMin:5.6,
    speedMax:7.9,
    description: 'Moderate breeze'
  },
  { speedMin:8,
    speedMax:10.7,
    description: 'Fresh breeze'
  },
  { speedMin:10.8,
    speedMax:13.8,
    description: 'Strong breeze'
  },
  { speedMin:13.9,
    speedMax:17.1,
    description: 'Near gale'
  },
  { speedMin:17.2,
    speedMax:20.7,
    description: 'Fresh gale'
  },
  { speedMin:20.8,
    speedMax:24.4,
    description: 'Severe gale'
  },
  { speedMin:24.5,
    speedMax:28.4,
    description: 'Storm'
  },
  { speedMin:28.5,
    speedMax:32.6,
    description: 'Violent storm'
  },  
  { speedMin:32.7,
    speedMax:100,
    description: 'Hurricane'
  },
]

export const windDirect: TWindDirection = [
{direction:'N/NE',
degree: [20,30]
},
{direction:'NE',
degree: [40,50]
},
{direction:'E/NE',
degree: [60,70]
},
{direction:'E',
degree: [80,100]
},
{direction:'E/SE',
degree: [110,120]
},
{direction:'SE',
degree: [130,140]
},
{direction:'S/SE',
degree: [150,160]
},
{direction:'S',
degree: [170,190]
},
{direction:'S/SW',
degree: [200,210]
},
{direction:'SW',
degree: [220,230]
},
{direction:'W/SW',
degree: [240,250]
},
{direction:'W',
degree: [260,280]
},
{direction:'W/NW',
degree: [290,300]
},
{direction:'NW',
degree: [310,320]
},
{direction:'N/NW',
degree: [330,340]
},
{direction:'N',
degree: [350,10]
}
]
