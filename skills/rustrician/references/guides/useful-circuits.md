# Useful Circuits

*** (Most will likely be out of date. Review Needed)**

[Auto Lights](https://www.rustrician.io/?circuit=dc6bf5e524299bf241b218e2565876d0)

[Auto Smelter](https://www.rustrician.io/?circuit=23c3fe0a5ba8c9bedb35af9a709a1344)

[Auto Refinery](https://www.rustrician.io/?circuit=0664f79c2fe179678eff13b3ce74a3fd)

[Blocker Chain](https://www.rustrician.io/?circuit=773b599014deb161fc173f295727be77)

[Close All Doors with a Red Button](https://www.rustrician.io/?circuit=0101564d3656de1f3bedb87ab2625788)

[Configure Siphon](https://www.rustrician.io/?circuit=3845504916b931067b5e89a7c6efce23)

[Dance Dance Revolution](https://www.rustrician.io/?circuit=e3b55e828700c9c44198bf34d4ccd284)

[Delay Timer](https://www.rustrician.io/?circuit=fa8ba5c2e3974185c6f01273eab653f1)

[Destruction Detection - 2025](https://www.rustrician.io/?circuit=b95bd288fa0d6af839f8bd531b2bded8)

[Component Destruction Detection](https://www.rustrician.io/?circuit=dbb794dc52d82a91250591510ca2d3f9)

[Industrial Merchant](https://www.rustrician.io/?circuit=e5aa034300bbbb59558b033a2af6059e)

[Logic Gates](https://www.rustrician.io/?circuit=64810508602bc0cd1baa954d1a1da539)

[Memory Cell Explained](https://www.rustrician.io/?circuit=b64e3a0f6f9d6d456ead9821abf9d7d7)

[Morning Light Delay](https://www.rustrician.io/?circuit=c2d4d06371b08c0e63bb8ccf9e975049)

[Nih Core](https://www.rustrician.io/?circuit=d131cf1233742ebd0acb8ebaaf3b9d1a)

[Nih Core - 4 Large Batteries](https://www.rustrician.io/?circuit=60fc05f187614f131aa5565be42a6687)

[Nih Core - Decentralized](https://www.rustrician.io/?circuit=1d0b869c046f6d05ee75ab0f841fc150)

[Nih Core - Solutions To Flicker](https://www.rustrician.io/?circuit=66021c4866d7093b77e9268bf8f9cb00)

[Parallel vs Series](https://www.rustrician.io/?circuit=0191b550a1c45104ce7129c15ba13d4f)

[PepsiCore](https://www.rustrician.io/?circuit=5b31017e9e3316c7246deb869d56c08b)

[Probability Master Class](https://www.rustrician.io/?circuit=ca9bdcbc87f0a13ca3a3ce0c8fe4146d)

[Every Box is a Drop Box](https://www.rustrician.io/?circuit=8958914d237cd6fce723a5ca2fc4cd8d)

**Pulse Control (Configure)**

Basic set - <https://www.rustrician.io/?circuit=c0487dd792adbd543e8d234a3979bc38>

https://github.com/WheteThunger/IODebug

ioentity.debugqueue

ioentity.backtracking `<value>`

ioentity.responsetime `<value>`

ioentity.framebudgetelectrichighpriorityms `<value>`

ioentity.framebudgetelectriclowpriorityms `<value>`

ioentity.framebudgetgenericms `<value>`

ioentity.framebudgetindustrialms `<value>`

- framebudgetelectrichighpriorityms — time budget for high-priority electric IO (important circuits)
- framebudgetelectriclowpriorityms — time budget for normal electric IO
- framebudgetgenericms / industrialms — other queues like generic or industrial logic
- Default values are typically very low (≤ 1 ms), meaning the server only spends ~1 ms per tick on these updates. Bumping them up (e.g., 10, 15) gives more CPU time to update circuits faster — this can reduce lag/delay in large builds.
