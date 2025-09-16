import InformationForm from "@/app/components/form/InformationForm";

import ContactForm from "../components/form/ContactForm";
import EducationForm from "../components/form/EducationForm";
import JobForm from "../components/form/JobForm";

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
