// Indhold til prototypen. Ret tekster og tal her uden at røre resten af koden.
// Alle tal i partiet er fiktive og kun til illustration.

window.SHENGAIA = {
  // Indsæt linket til Google Formen her (det fra "Send" -> "<>" -> src="..."). Tom = viser pladsholder.
  formUrl: "",

  roller: [
    {
      id: "leverandor",
      titel: "Leverandør af biomasse",
      hvem: "Palmeoliebønder og møller i Delta State",
      bidrager: "Skaller fra palmekerner, som i dag er et restprodukt.",
      faar: [
        "Betaling for biomassen",
        "Adgang til biokul og gødning til egne marker",
        "Andel i den lokale pulje"
      ]
    },
    {
      id: "aftager",
      titel: "Aftager og distributør",
      hvem: "Fx Feraj Ventures",
      bidrager: "Aftager og sælger gødningen og hjælper med at spore den ud til marken.",
      faar: [
        "Et lokalt produkt der forbedrer jorden",
        "En pris der holdes nede af indtægten fra kreditterne"
      ]
    },
    {
      id: "kober",
      titel: "Køber af CO₂-kreditter",
      hvem: "Danske virksomheder med klimamål i Scope 3",
      bidrager: "Køber kreditter for den CO₂, der bindes i jorden.",
      faar: [
        "Dokumenteret CO₂-fjernelse med fuld sporbarhed",
        "En social effekt for landmændene, der kan fortælles og dokumenteres"
      ]
    },
    {
      id: "medfinansierer",
      titel: "Medfinansierende virksomhed",
      hvem: "Små danske virksomheder",
      bidrager: "Fx 1.000 kr til et lille pyrolyseanlæg i et testprojekt.",
      faar: [
        "At være med fra starten og følge projektet tæt",
        "Modellen og den skattemæssige behandling er under afklaring"
      ]
    }
  ],

  parti: {
    id: "SG-2027-001",
    trin: [
      {
        titel: "Indsamling",
        tekst: "Skaller fra palmekerner indsamles hos et kooperativ af palmeoliebønder.",
        hvorfor: "Viser at biomassen er et restprodukt og ikke tages fra skov eller fødevarer.",
        data: [
          ["Parti-ID", "SG-2027-001"],
          ["Leverandør", "Kooperativ A, Delta State"],
          ["Biomasse", "Skaller fra palmekerner"],
          ["Vægt", "1.000 kg"],
          ["Fugtindhold", "12 %"],
          ["Dato", "2. februar 2027"]
        ]
      },
      {
        titel: "Pyrolyse",
        tekst: "Skallerne omdannes til biokul i ShenGaias kontinuerlige anlæg.",
        hvorfor: "Temperatur og tid afgør kvaliteten, og hvor stabilt kulstoffet er.",
        data: [
          ["Anlæg", "ShenGaia pilotanlæg"],
          ["Temperatur", "550 °C"],
          ["Opholdstid", "20 min"],
          ["Biomasse ind", "1.000 kg"],
          ["Biokul ud", "280 kg"],
          ["Energikilde", "Solceller og renset syngas"]
        ]
      },
      {
        titel: "Analyse",
        tekst: "En prøve fra partiet analyseres på laboratorium.",
        hvorfor: "Viser hvor meget kulstof der er bundet, og at biokullet er sikkert at bruge i landbruget.",
        data: [
          ["Kulstofindhold", "78 %"],
          ["H/C-forhold", "0,4"],
          ["pH", "9,5"],
          ["Laboratorium", "Under afklaring"]
        ]
      },
      {
        titel: "Gødning",
        tekst: "Biokullet blandes til gødning og leveres til distributøren.",
        hvorfor: "Partiet følges videre, så det kan spores helt ud til den, der bruger det.",
        data: [
          ["Biokul i blandingen", "280 kg"],
          ["Færdig gødning", "1.400 kg"],
          ["Aftager", "Feraj Ventures"],
          ["Leveret", "20. februar 2027"]
        ]
      },
      {
        titel: "Marken",
        tekst: "Gødningen bruges på marker hos palmeoliebønderne.",
        hvorfor: "Kreditten kræver, at biokullet ender i jorden og ikke bliver brændt.",
        data: [
          ["Bruger", "Bonde i Kooperativ A"],
          ["Areal", "2 ha"],
          ["Jordtype", "Sandet og sur"],
          ["pH før", "5,2"],
          ["Udbragt", "3. marts 2027"]
        ]
      },
      {
        titel: "CO₂-kredit",
        tekst: "Det bundne kulstof beregnes og udstedes som kredit.",
        hvorfor: "Køberen kan se præcis hvilket parti, hvilken mark og hvilken beregning kreditten bygger på.",
        data: [
          ["Bundet kulstof", "218 kg"],
          ["Svarer til", "800 kg CO₂"],
          ["Fradrag for usikkerhed", "25 %"],
          ["Kredit", "0,6 ton CO₂"],
          ["Standard og register", "Under afklaring"],
          ["Køber", "Dansk virksomhed"]
        ]
      }
    ]
  }
};
