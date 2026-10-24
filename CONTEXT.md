# Portfolio

Justine V. Piamonte's personal developer portfolio: a single page that introduces the Owner to visitors and points them to the Owner's work and contact channels.

## Language

**Owner**:
The person the portfolio is about (Justine V. Piamonte). Every fact shown on the site is a claim about the Owner and must be true or marked as a Placeholder.
_Avoid_: user, author

**Visitor**:
Anyone viewing the published site.
_Avoid_: user

**Section**:
One of the top-level navigable regions of the page (Home, About, Skills, Projects, Education, Contact).
_Avoid_: page, route, tab

**Placeholder**:
A value the Owner has not supplied yet, shown in a way that is visibly marked as unfilled. A Placeholder link renders as a disabled control labeled "Link coming soon", never as a working-looking link.
_Avoid_: dummy, sample, TODO

**Project**:
A piece of software the Owner built, shown as a card with its real technologies and links.

**Featured Project**:
The one Project given visual prominence above the others. Currently TranCash, the Owner's mini-thesis e-wallet.

**Skill**:
A technology the Owner has used or is learning. A Skill carries no proficiency score, percentage or years of experience.
_Avoid_: competency, expertise

**Skill Category**:
The grouping a Skill belongs to: Frontend, Backend, Database or Tools.

## Relationships

- A **Project** lists zero or more **Skills** as its technologies; only technologies actually used appear
- When any **Projects** exist, exactly one is the **Featured Project**; there may be zero **Projects**
- Each **Skill** belongs to exactly one **Skill Category**
- Any Owner fact or link may be a **Placeholder**

## Flagged ambiguities

- The reference image shows "Experience" and "Certificates" Sections; resolved: the site has exactly the six Sections listed above. Certificates may be added later only with real ones.
