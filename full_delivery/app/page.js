import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";
import ContactForm from "./pages/ContactForm";
import RenvioEmail from "./pages/RenvioEmail";

export default function Home() {
  return (
    <div>
      <CategoryList />
      <BusinessList />
      {/* <ContactForm /> */}
      <RenvioEmail />
    </div>
  );
}
