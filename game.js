const textElement = document.getElementById('text');
const image = document.getElementById('illustration');
const optionButtonsElement = document.getElementById('option-buttons');



let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  console.log('esemény: ' + textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showImage(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    image.style.backgroundImage="url(" + textNode.img + ")"; 
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  console.log('állapot: ' + JSON.stringify(state));
  showTextNode(nextTextNodeId);
  showImage(nextTextNodeId);
}

const textNodes = [
    {
      id: 1,
      img: 'kezdet.png',
      text: 'Kalandod egy faluban kezdődik. Egy falusi áll elötted. Mit teszel?',
      options: [
        {
          text: 'Odamegyek hozzá',
          nextText: 2
        },
        {
          text: 'Kimegyek a faluból',
          nextText: 3
        }
      ]
    },
    {
      id: 2,
      img: 'beszel.png',
      text: 'A falusi köszön neked: - Jó napot kívánok! Mit teszel?',
      options: [
          {
          text: 'Elfutok',
          //requiredState: (currentState) => currentState.blueGoo,
          //setState: { blueGoo: false, shield: true },
          nextText: 3
        },
        {
          text: 'Köszönöm neki.',
          //requiredState: (currentState) => currentState.blueGoo,
          //setState: { blueGoo: false, sword: true },
          nextText: 4
        }
      ]
    },
    {
      id: 3,
      img: 'ejjel.png',
      text: 'Elhagyod a falut, ám rád sötétedik. Mit teszel?',
      options: [
        {
          text: 'Visszafordulok a falu felé.',
          nextText: 1
        },
        {
          text: 'Tovább megyek.',
          nextText: 5
        }
      ]
    },
    {
      id: 4,
      img: 'terkep.png',
      text: 'Mivel köszöntél neki, kedves veled. Ad egy térképet. Most mihez kezdesz?',
      options: [
        {
          text: 'Nem fogadom el, és elidulok ki a faluból.',
          nextText: 3
        },
        {
          text: 'Elfogadom, és elindulok a piros X-hez.',
          nextText: 6
        }
      ]
    },
    {
      id: 5,
      img: 'masikfalu.png',
      text: 'Egy másik faluhoz érsz, de itt nincs senki.',
      options: [
        {
          text: 'Visszafordulok',
          nextText: 1
        }
      ]
    },
    {
      id: 6,
      img: 'banya.png',
      text: 'Egy bányához értél. Mitévő leszel?',
      options: [
        {
          text: 'Bemegyek',
          nextText: 7
        },
        {
          text: 'Tovább megyek',
          nextText: 25
        },
      ]
    },
    {
      id: 7,
      img: 'banyaban.png',
      text: 'A bánya beljese hatalmas. Mihez kezdesz?',
      options: [
        {
          text: 'Kincset keresek!',
          nextText: 8
        },
        {
          text: 'Kimegyek',
          nextText: 18
        }
      ]
    },
    {
      id: 8,
      img: 'kincs.jpg',
      text: 'A bánya mélyén, egy helységben ládákat találsz. Mit fogsz tenni?',
      options: [
          {
            text: 'Kinyitom az első ládát.',
            nextText: 9
          },
          {
           text: 'Kimegyek.',
           nextText: 18
          }
      ]
    },
    {
      id: 9,
      img: 'ureslada.png',
      text: 'Üres. Hogyan tovább?',
      options: [
        {
          text: 'Kinyitom a következőt.',
          nextText: 10
        },
        {
          text: 'Kimegyek a bányából.',
          nextText: 18
        }
      ]
    },
    {
      id: 10,
      img: 'ureslada.png',
      text: 'Ez is üres! Most mi legyen?',
      options: [
        {
          text: 'Folytatom a keresést!',
          nextText: 11
        },
        {
          text: 'Abbahagyom és kimyegyek!',
          nextText: 18
        }
      ]
    },
    {
      id: 11,
      img: 'lada.png',
      text: 'Végre az utolsó ládában találtál pár dolgot. Hogyan tovább?',
      options: [
          {
              text: 'Magamhoz veszem a kő fejszét.',
              setState: { kofejsze: true },
              nextText: 12
          },
          {
              text: 'Magamhoz veszem a kenyeret.',
              setState: { kenyer: true },
              nextText: 12
          }
      ]
    },
    {
      id: 12,
      img: 'lada.png',
      text: 'Hirtelen ijesztő hangot hallasz? Mihez kezdesz?',
      options: [
          {
              text: 'Kimenekülök a bányából.',
              nextText: 18
          },
          {
              text: 'Gyorsan magamhoz veszem a kő fejszét.',
              requiredState: (currentState) => currentState.kenyer,
              setState: { kofejsze: true },
              nextText: 13
          },
          {
              text: 'Várok.',
              nextText: 13
          }
      ]
    },
    {
      id: 13,
      img: 'zombie.jpg',
      text: 'Egy zombie közeledik feléd! Most mi lesz?',
      options: [
          {
              text: 'Kimenekülök a bányából.',
              nextText: 18
          },
          {
              text: 'Megküzdök vele.',
              requiredState: (currentState) => currentState.kofejsze,
              nextText: 14
          },
          {
              text: 'Hozzávágom a kenyeret.',
              requiredState: (currentState) => currentState.kenyer,
              setState: { kenyer: false },
              nextText: 15
          }
      ]
    },
    {
      id: 14,
      img: 'arany.jpg',
      text: 'Jól kupán vágod a fejszével. Legyőzted! Egy arany marad után. Mit teszel?',
      options: [
            {
                text: 'Felveszem az aranyat.',
                setState: { arany: true },
                nextText: 140
            },
            {
                text: 'Megeszem a kenyeret.',
                requiredState: (currentState) => currentState.kenyer,
                setState: { kenyer: false },
                nextText: 16
            },
            {
                text: 'A ládából kiveszem az almát.',
                setState: { alma: true },
                nextText: 14
            },
            {
                text: 'Megeszem az almát.',
                requiredState: (currentState) => currentState.alma,
                setState: { alma: false },
                nextText: 16
            }
        ]
    },
    {
      id: 140,
      img: 'eves.jpg',
      text: 'Jól megéhzetél a küzdelemtől. Mit teszel?',
      options: [
            {
                text: 'Megeszem a kenyeret.',
                requiredState: (currentState) => currentState.kenyer,
                setState: { kenyer: false },
                nextText: 16
            },
            {
                text: 'A ládából kiveszem az almát.',
                setState: { alma: true },
                nextText: 140
            },
            {
                text: 'Megeszem az almát.',
                requiredState: (currentState) => currentState.alma,
                setState: { alma: false },
                nextText: 16
            }
        ]
    },
    {
    id: 15,
    img: 'menekules.png',
    text: 'A zombi meglepődik tetteden. Mit teszel?',
    options: [
            {
                text: 'Elfutok.',
                nextText: 18
            },
            {
                text: 'A ládából kiveszem az fejszét gyorsan.',
                setState: { kofejsze: true },
                nextText: 13
            }
        ]
    },
    {
    id: 16,
    img: 'banyaban.png',
    text: 'Még a bányában vagy. Mit teszel?',
    options: [
            {
                text: 'Kimegyek.',
                nextText: 18
            },
            {
                text: 'Tovább keresek',
                nextText: 17
            }
        ]
    },
    {
    id: 17,
    img: 'banyaban.png',
    text: 'Nem találsz semmi érdekeset. Most mi lesz?',
    options: [
            {
                text: 'Kimegyek.',
                nextText: 18
            },
            {
                text: 'Tovább keresek',
                nextText: 16
            }
        ]
    },
    {
    id: 18,
    img: 'banya.png',
    text: 'A bánya előtt álsz ismét. Most mi legyen?',
    options: [
            {
                text: 'Visszamegyek a faluba.',
                nextText: 19
            },
            {
                text: 'Tovább megyek az úton.',
                nextText: 25
            }
        ]
    },
    {
    id: 19,
    img: 'kezdet.png',
    text: 'Visszaértél a faluhoz. Mihez kezdesz?',
    options: [
            {
                text: 'Falat építek a falu köré.',
                nextText: 20
            },
            {
                text: 'Megkeresem a kovácsot.',
                nextText: 21
            }
        ]
    },
    {
    id: 20,
    img: 'varosfal.png',
    text: 'Elkészült a hatalmas városfal. A lakosok hálásak, és egy kardot ajándékoznak neked. Mit teszel?',
    options: [
            {
                text: 'Elfogadom.',
                setState: { kard: true },
                nextText: 24
            },
            {
                text: 'Elfutok.',
                nextText: 19
            }
        ]
    },
    {
    id: 21,
    img: 'kovacs.jpg',
    text: 'A kovács áll előtted, és kérdi, hogy miért kedesed! Mit válaszolsz?',
    options: [
            {
                text: 'Kardot szeretnék készítetni.',
                nextText: 22
            },
            {
                text: '"Elfelejtettem!" Mondod te, és elbandukolsz.',
                nextText: 19
            }
        ]
    },
    {
    id: 22,
    img: 'kovacs.jpg',
    text: 'A kovács azt mondja: - Egy arany lesz!',
    options: [
            {
                text: 'Nekem nincs egy aranyom se...',
                nextText: 23
            },
            {
                text: 'Tessék itt az arany!',
                requiredState: (currentState) => currentState.arany,
                setState: { arany: false },
                setState: { kard: true },
                nextText: 24
            }
        ]
    },
    {
    id: 23,
    img: 'kezdet.png',
    text: 'Aranyat kell szerezned. Merre indulsz?',
    options: [
            {
                text: 'A királyhoz a várba, szerencsétpróbálni.',
                nextText: 25
            },
            {
                text: 'Vissza a bányához. Megnézem a ládákat mégegyszer.',
                nextText: 6
            },
            {
                text: 'A másik faluhoz, hátha találok ott aranyat.',
                nextText: 34
            }
        ]
    },
    {
    id: 24,
    img: 'kezdet.png',
    text: 'Most, hogy van kardod, merre indulsz?',
    options: [
            {
                text: 'A királyhoz a várba, szerencsét próbálni.',
                nextText: 25
            },
            {
                text: 'A másik faluhoz, hátha találok még ott valamit.',
                nextText: 34
            }
        ]
    },
    {
    id: 25,
    img: 'var.png',
    text: 'Megérkeztél a várhoz. Mit teszel?',
    options: [
            {
                text: 'Bemegyek.',
                nextText: 26
            },
            {
                text: 'Visszafordulok.',
                nextText: 19
            }
        ]
    },
    {
    id: 26,
    img: 'varbelul.png',
    text: 'A várban egy katona megállít, és azt mondja: "Látom van kardod!"',
    options: [
            {
                text: '"Igen van!" Válaszolom.',
                requiredState: (currentState) => currentState.kard,
                nextText: 27
            },
            {
                text: '"Igen van, de nem használom" Válaszolom, és visszamegyek a faluba.',
                nextText: 19
            }
        ]
    },
    {
    id: 27,
    img: 'varbelul.png',
    text: '"Akarsz-e a király seregében kapitány lenni?" - kérdi a katona.',
    options: [
            {
                text: '"Igen, ezért jöttem!" Válaszolom.',
                requiredState: (currentState) => currentState.kard,
                nextText: 28
            },
            {
                text: '"Nem, én nem harcolok." Válaszolom.',
                nextText: 32
            }
        ]
    },
    {
    id: 28,
    img: 'varbelul.png',
    text: '"Ez a beszéd! A király már vár!"',
    options: [
            {
                text: 'A király elébe megyek!',
                nextText: 29
            }
        ]
    },
    {
    id: 29,
    img: 'king.png',
    text: '"Leszel a a kapitányom, Péter?" - kérdi a király.',
    options: [
            {
                text: '"Leszek!" - válaszolom.',
                nextText: 30
            },
            {
                text: '"Inkább, favágónak állok!" - válaszolom.',
                nextText: 33
            }
        ]
    },
    {
    id: 30,
    img: 'csata.png',
    text: 'Elmész a csatába, ott mit teszel?',
    options: [
            {
                text: 'Megnyerem!',
                nextText: 31
            },
            {
                text: 'Elveszítem, és elmenekülök a faluba!',
                nextText: -1
            }
        ]
    },
    {
    id: 31,
    img: 'gyozelem.jpg',
    text: 'Megnyerted a csatát! Elnyerted a királylány kezét és a fele királyságot!',
    options: [
            {
                text: 'Újrakezdem!',
                nextText: -1
            }
        ]
        ,
    },
    {
    id: 32,
    img: 'varbelul.png',
    text: 'Hát akkor még favágó lehetsz!?',
    options: [
            {
                text: 'Az jó lesz favágó leszek!',
                nextText: 33
            },
            {
                text: 'Inkább visszamegyek a faluba!',
                nextText: 2
            }
        ]
    },
    {
    id: 33,
    img: 'favago.jpg',
    text: 'Peti így favágo lett, és szépen dolgozgatott. Mígnem egy napon elérte a háború az ő kunyhóját is!',
    options: [
            {
                text: 'Kapitány leszek!',
                nextText: 30
            },
            {
                text: 'Elmenekülök a faluba!',
                nextText: 2
            }
        ]
    },
    {
    id: 34,
    img: 'masikfalu.png',
    text: 'Kihaltnak tűnik a falu, de szerencsére van kardod!',
    options: [
            {
                text: 'Körülnézek!',
                nextText: 35
            },
            {
                text: 'Visszamegyek!',
                nextText: 24
            }
        ]
    },
    {
    id: 35,
    img: 'kruzi.jpg',
    text: 'Csak egy cicát találtál! Mit teszel?',
    options: [
            {
                text: 'Elnevezem kruzinak, és magammal viszem a faluba!',
                
                nextText: 24
            },
            {
                text: 'Ott hagyom, és visszamegyek!',
                nextText: 24
            }
        ]
    }
];

startGame();