import { type SelectMember } from "@types"

export default function HomePage() {
  return <main>
    {/* <MembersList/> */}
  </main>
}

type MembersListProps = {
  members: SelectMember[]
}

export function MembersList({ members }: MembersListProps) {
  return (
    <div>
      {members.map((m) => (
        <div key={m.id}>{m.email}</div>
      ))}
    </div>
  )
}
