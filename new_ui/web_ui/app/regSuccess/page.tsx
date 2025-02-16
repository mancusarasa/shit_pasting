import { Link } from "@heroui/link";
import { title, subtitle } from "@/components/primitives";


export default function RegSuccessPage() {

  return (
    <div>
      <h1 className={title()}>Success!</h1>
      <h2 className={subtitle()}>
        You can now proceed to <Link href="/login">login</Link> to start using your account
      </h2>
    </div>
  );
}
