/**
 * Student leadership roster, grouped per the team's FRC Team Leadership Structure document.
 * To announce a leader: fill in `name`, add their headshot under public/static/leadership/,
 * and set `photo` (e.g. "/static/leadership/jane-doe.jpg"). Empty fields show placeholders.
 */

export interface LeadershipRole {
  title: string
  name: string
  photo: string
  optional?: boolean
}

export interface LeadershipGroup {
  name: string
  roles: LeadershipRole[]
}

export const LEADERSHIP_GROUPS: LeadershipGroup[] = [
  {
    name: "Team Leadership",
    roles: [
      { title: "Team Captain", name: "", photo: "" },
      { title: "Vice Captain", name: "", photo: "", optional: true },
    ],
  },
  {
    name: "Department Leads",
    roles: [
      { title: "Mechanical Lead", name: "", photo: "" },
      { title: "Electrical Lead", name: "", photo: "" },
      { title: "Software Lead", name: "", photo: "" },
      { title: "Business Lead", name: "", photo: "" },
      { title: "Outreach Lead", name: "", photo: "" },
      { title: "Inventory & Safety Lead", name: "", photo: "" },
    ],
  },
  {
    name: "Mechanical",
    roles: [
      { title: "Design Lead", name: "", photo: "" },
      { title: "Fabrication Lead", name: "", photo: "" },
      { title: "Assembly Lead", name: "", photo: "" },
    ],
  },
  {
    name: "Business & Operations",
    roles: [
      { title: "Finance & Sponsorship Lead", name: "", photo: "" },
      { title: "Impact / Engineering Binders Lead", name: "", photo: "" },
      { title: "Media & Marketing Lead", name: "", photo: "" },
    ],
  },
  {
    name: "Competition Operations",
    roles: [
      { title: "Competition Readiness Lead", name: "", photo: "" },
      { title: "Strategy / Scout Lead", name: "", photo: "" },
      { title: "Pit Lead", name: "", photo: "" },
    ],
  },
]
