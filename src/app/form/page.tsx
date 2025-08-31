import InformationForm from "@/app/components/form/InformationForm";
import EducationForm from "../components/form/EducationForm";
import JobForm from "../components/form/JobForm";
import ContactForm from "../components/form/ContactForm";

export default function FormInformation() {
  return (
    <div>
      <InformationForm />
      <EducationForm />
      <JobForm />
      <ContactForm />
    </div>
  );
}
