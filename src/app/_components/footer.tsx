import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="bg-neutral-50  border-neutral-200 dark:bg-neutral-800 dark:border-slate-700">
      <Container>
        <div className="py-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
          made with <span className="text-red-500">♥</span> by sid
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
