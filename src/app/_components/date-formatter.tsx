import { format } from "date-fns"; // or use Intl

type Props = { dateString: string };

export default function DateFormatter({ dateString }: Props) {
  const d = new Date(dateString);
  // date-fns always formats the same, both server & client:
  return <time dateTime={dateString}>{format(d, "MMMM d, yyyy")}</time>;
}
